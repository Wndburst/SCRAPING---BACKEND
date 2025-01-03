const puppeteer = require('puppeteer');

async function scrapeJsonLd(url) {
    try {
        console.log(`Iniciando scraping para la URL: ${url}`);

        // Inicializar navegador y página
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        );

        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extraer todos los JSON-LD desde el contenido de la página
        const jsonLdScripts = await page.evaluate(() => {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            return Array.from(scripts).map(script => script.textContent);
        });

        if (jsonLdScripts.length === 0) {
            throw new Error('No se encontró ningún JSON-LD en la página');
        }

        console.log(`Se encontraron ${jsonLdScripts.length} bloques JSON-LD.`);

        // Imprimir cada bloque de JSON-LD
        jsonLdScripts.forEach((jsonLd, index) => {
            try {
                const parsedJson = JSON.parse(jsonLd);
                console.log(`Bloque JSON-LD ${index + 1}:`, JSON.stringify(parsedJson, null, 2));
            } catch (error) {
                console.error(`Error al parsear el bloque JSON-LD ${index + 1}:`, error.message);
            }
        });

        await browser.close();
    } catch (error) {
        console.error('Error durante el scraping:', error.message);
    }
}

// URL a scrapear
const url = 'https://urbancomercial.cl/aspiradora-agua-y-polvo-karcher-wd3-v-17-modelo-nuevo/';

// Ejecutar la función
scrapeJsonLd(url);
