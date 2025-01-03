const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

const ProductosTiendasExternas = require('../models/productosTiendasExternas');
const ProductosMimbral = require('../models/ProductosMimbral');
const path = require('path');

const scrapeAndStore = async (req, res) => {
    const { url, tienda } = req.body;

    if (!url || !tienda) {
        return res.status(400).json({ error: 'URL y tienda son requeridas' });
    }

    let browser;

    try {
        // Determinar el script de scraping según la tienda
        const scriptPath = path.resolve(__dirname, `../scraping/${tienda.toLowerCase()}.js`);
        const scrapeFunction = require(scriptPath);

        // Seleccionar el modelo de base de datos según la tienda
        const modeloDB = tienda.toLowerCase() === 'mimbral' ? ProductosMimbral : ProductosTiendasExternas;

        // Iniciar Playwright con stealth y configuraciones optimizadas
        browser = await chromium.launch({
            headless: true, // Ejecutar en modo headless
            executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe', // Brave
            args: [
                '--disable-blink-features=AutomationControlled',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu', // Deshabilitar GPU para mejorar rendimiento en servidores
                '--disable-background-networking',
                '--disable-default-apps',
                '--disable-extensions',
                '--disable-sync',
                '--disable-translate',
            ],
        });

        // Crear un contexto optimizado
        const context = await browser.newContext({
            userAgent: getRandomUserAgent(), // User-Agent aleatorio
            viewport: { width: 1366, height: 768 },
            locale: 'es-ES',
            javaScriptEnabled: true,
            bypassCSP: true, // Ignorar restricciones de políticas de contenido
        });

        // Añadir configuraciones adicionales para evitar detección
        await context.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            window.chrome = { runtime: {} }; // Añadir propiedad ficticia
            Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4] }); // Simular plugins
            Object.defineProperty(navigator, 'languages', { get: () => ['es-ES', 'en-US'] }); // Idiomas
        });

        const page = await context.newPage();

        // Reducir la carga de recursos no necesarios (imágenes, fuentes, etc.)
        await page.route('**/*', (route) => {
            const request = route.request();
            if (['font'].includes(request.resourceType())) {
                route.abort(); // Bloquear recursos innecesarios
            } else {
                route.continue(); // Continuar con otros recursos
            }
        });

        // Navegar a la URL con configuraciones rápidas
        const waitUntilOption = (
            ['allipen', 'chilemat', 'lider', 'mercadolibre', 'mimbral', 'oviedo', 'sodimac', 'construplaza', 'construmart'].includes(tienda.toLowerCase())
        ) ? 'domcontentloaded' : 'networkidle';

        console.log(`Navegando a: ${url} (waitUntil: ${waitUntilOption})`);
        await page.goto(url, { waitUntil: waitUntilOption, timeout: 120000 }); // Reducir timeout para carga rápida

        // Ejecutar el script de scraping
        console.log('Ejecutando el script de scraping...');
        const producto = await scrapeFunction(page, url);

        // Validar datos antes de guardar
        const faltantes = [];
        if (!producto) faltantes.push('producto');
        if (!producto?.nombre) faltantes.push('nombre');
        if (!producto?.precio) faltantes.push('precio');
        if (!producto?.sku) faltantes.push('sku');
        if (!producto?.marca) faltantes.push('marca');
        if (!producto?.imageurl) faltantes.push('imageurl');

        if (faltantes.length > 0) {
            return res.status(400).json({
                error: 'Datos insuficientes para guardar el producto',
                faltantes,
            });
        }

        // Guardar en la base de datos
        console.log(`Producto guardado en la base de datos: ${JSON.stringify(producto.url)}`);
        modeloDB.upsert(producto, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el producto', details: err });
            }
            res.status(200).json({ message: 'Producto almacenado exitosamente', producto });
        });
    } catch (error) {
        console.error('Error durante el scraping:', error.message);
        res.status(500).json({ error: 'Error al realizar scraping', details: error.message });
    } finally {
        if (browser) {
            await browser.close(); // Asegurar el cierre del navegador
        }
    }
};

// Función para generar un User-Agent aleatorio
const getRandomUserAgent = () => {
    const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0',
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

module.exports = { scrapeAndStore };
