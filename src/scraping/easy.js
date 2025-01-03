module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Seleccionar elementos del DOM
        const skuElement = document.querySelector('span.sc-7f2078d-3');
        const sku = skuElement ? skuElement.innerText.replace('SKU ', '').trim() : null;

        const nombreElement = document.querySelector('h1[data-id="product-name"]');
        const nombre = nombreElement ? nombreElement.innerText.trim() : null;

        const precioElement = document.querySelector('div.sc-1092fe19-37');
        const precio = precioElement ? precioElement.innerText.replace(/\D/g, '') : null;

        const marcaElement = document.querySelector('a[data-id="product-brand"]');
        const marca = marcaElement ? marcaElement.innerText.trim() : null;

        // Ajustar el selector de la imagen
        const imageElement = document.querySelector('div.sc-67f2402b-0 img');
        const imageurl = imageElement ? imageElement.src : null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'EASY',
            marketplace: 'VTEX',
            url
        };
    }, url);
};
