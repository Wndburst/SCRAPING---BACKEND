module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Inicializar valores predeterminados
        let sku = null;
        let nombre = null;
        let precio = null;
        let marca = null;
        let imageurl = null; // Nueva variable para la imageurl
        let vendedor = null; // Nueva variable para el vendedor

        try {
            // Buscar el JSON-LD en la página
            const jsonLdMatch = document.body.innerHTML.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
            if (jsonLdMatch) {
                const jsonLd = JSON.parse(jsonLdMatch[1]);

                // Extraer datos desde el JSON-LD
                sku = jsonLd.sku || sku;
                nombre = jsonLd.name || nombre;
                precio = jsonLd.offers?.lowPrice || jsonLd.offers?.price || precio;
                marca = jsonLd.brand || marca;
            }

            // Extraer la URL de la imageurl desde el HTML
            const imageElement = document.querySelector('.ui-pdp-gallery__figure img');
            if (imageElement) {
                // Puedes elegir entre `src` o `data-zoom`
                imageurl = imageElement.getAttribute('data-zoom') || imageElement.getAttribute('src');
            }

            // Extraer el vendedor desde el HTML
            const sellerElement = document.querySelector('.ui-pdp-seller__header__info-container__title span:not(.ui-pdp-seller__label-sold)');
            if (sellerElement) {
                vendedor = sellerElement.textContent.trim();
            }
        } catch (error) {
            console.error('Error al extraer datos:', error.message);
        }

        return { sku, nombre, precio, marca, imageurl, vendedor, tienda: 'MERCADOLIBRE',marketplace: 'MERCADOLIBRE', url };
    }, url); // Pasar 'url' al contexto del navegador
};
