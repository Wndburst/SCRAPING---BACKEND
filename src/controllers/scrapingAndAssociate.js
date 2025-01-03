const { chromium } = require('playwright');
const ProductosTiendasExternas = require('../models/productosTiendasExternas');
const ProductosMimbral = require('../models/ProductosMimbral');
const AsociacionesProductos = require('../models/asociacionesProductos');
const path = require('path');

const scrapingAndAssociate = async (req, res) => {
    const { url, tienda, id_producto_mimbral } = req.body;

    if (!url || !tienda || !id_producto_mimbral) {
        return res.status(400).json({ error: 'URL, tienda e id del producto de Mimbral son requeridos' });
    }

    let browser;

    try {
        // Determinar el script de scraping según la tienda
        const scriptPath = path.resolve(__dirname, `../scraping/${tienda.toLowerCase()}.js`);
        const scrapeFunction = require(scriptPath);

        // Iniciar Playwright
        browser = await chromium.launch({
            headless: true,
            args: ['--disable-blink-features=AutomationControlled'],
        });

        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            viewport: { width: 1366, height: 768 },
            locale: 'es-ES',
        });

        const page = await context.newPage();

        // Navegar a la URL
        await page.goto(url, { waitUntil: 'networkidle', timeout: 180000 });

        // Ejecutar el script de scraping
        const producto = await scrapeFunction(page, url);

        // Validar datos antes de guardar
        if (!producto || !producto.nombre || !producto.precio) {
            return res.status(400).json({ error: 'Datos insuficientes para guardar el producto' });
        }

        // Guardar en la base de datos de productos externos
        ProductosTiendasExternas.upsert(producto, async (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el producto externo', details: err });
            }

            const id_producto_externo = result.insertId; // Obtener el ID del producto externo

            // Asociar con el producto de Mimbral
            const asociacion = {
                id_producto_mimbral,
                id_producto_externo,
            };

            AsociacionesProductos.create(asociacion, (err, asociacionResult) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear la asociación', details: err });
                }

                res.status(200).json({
                    message: 'Producto scrapeado, almacenado y asociado exitosamente',
                    producto,
                    asociacion: asociacionResult,
                });
            });
        });
    } catch (error) {
        console.error('Error durante el scraping:', error.message);
        res.status(500).json({ error: 'Error al realizar scraping', details: error.message });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = { scrapingAndAssociate };
