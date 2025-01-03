module.exports = async (page, url) => {
    return await page.evaluate(async (url) => {
        // Seleccionar el SKU del producto
        const sku = document.querySelector('span.sku')?.innerText.replace('sku: ', '').trim() || null;

        // Seleccionar el nombre del producto
        const nombre = document.querySelector('h1.product-title')?.innerText.trim() || null;

        // Seleccionar el precio de internet del producto
        const precio = document.querySelector('p.price.product-page-price.price-on-sale ins .woocommerce-Price-amount bdi')?.innerText.replace(/[^\d]/g, '') || null;

        // Simular el click en el botón para mostrar "Información adicional"
        const infoTabButton = document.querySelector('a[href="#tab-additional_information"]');
        if (infoTabButton) {
            infoTabButton.click();
        }

        // Esperar un breve momento para que la información se cargue
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Seleccionar la marca desde la tabla de atributos
        let marca = null;
        const marcaRow = document.querySelector('tr.woocommerce-product-attributes-item--attribute_pa_marca td a[rel="tag"]');
        if (marcaRow) {
            marca = marcaRow.innerText.trim(); // Extraer el texto de la marca
        }

        // Seleccionar la URL de la imagen principal
        const imageurl = document.querySelector('div.woocommerce-product-gallery__image img')?.getAttribute('data-large_image') || null;
        // Retornar los datos extraídos
        return {    
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'ALLIPEN',
            marketplace: 'VTEX',
            url,
        };
    }, url);
};