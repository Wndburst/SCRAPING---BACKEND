module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Inicializar valores predeterminados
        let sku = null;
        let nombre = null;
        let precio = null;
        let marca = null;
        let imageurl = null; // Inicializamos el campo para la imageurl
        let vendedor = null; // Inicializamos el campo para el vendedor

        try {
            // Extraer el SKU desde el script JSON-LD
            const scriptElement = document.querySelector('script[data-seo-id="schema-org-product"]');
            if (scriptElement) {
                const jsonData = JSON.parse(scriptElement.textContent);
                if (jsonData.sku) {
                    sku = jsonData.sku;
                }
            }

            // Extraer el nombre del producto
            const nameElement = document.querySelector('h1');
            if (nameElement) {
                nombre = nameElement.textContent.trim();
            }

            // Extraer el precio del producto
            const priceElement = document.querySelector('[itemprop="price"]');
            if (priceElement) {
                precio = priceElement.textContent.trim().replace(/[\$\.]/g, '');
            }

            // Extraer la marca del producto
            const brandElement = document.querySelector('[data-seo-id="brand-name"]');
            if (brandElement) {
                marca = brandElement.textContent.trim();
            }

            // Extraer la URL de la imageurl
            const imageElement = document.querySelector('[data-seo-id="hero-carousel-image"] img');
            if (imageElement) {
                imageurl = imageElement.getAttribute('src');
            }

            // Extraer el vendedor del producto
            const sellerElementAlt1 = document.querySelector('[data-testid="product-seller-info"] .black-90.b'); // Caso 1: Vendedor alternativo
            const sellerElementAlt2 = document.querySelector('[data-testid="product-seller-info"]'); // Caso 2: Vendido por Lider
            if (sellerElementAlt1) {
                vendedor = sellerElementAlt1.textContent.trim();
            } else if (sellerElementAlt2) {
                vendedor = sellerElementAlt2.textContent.replace('Vendido y enviado por', '').trim();
            }
        } catch (error) {
            console.error('Error al extraer datos de la página:', error.message);
        }

        return { sku, nombre, precio, marca, imageurl, tienda: 'LIDER', marketplace: 'WALLMART', vendedor, url };
    }, url);
};
