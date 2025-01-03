module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Seleccionar la imagen principal
        const imageElement = document.querySelector('#product-image img');
        const imageurl = imageElement?.src || null;

        // Seleccionar otros datos del producto
        const nombre = document.querySelector('.select-title')?.innerText?.trim() || null;
        const precio = document.querySelector('#gtm_price')?.innerText?.replace(/[^\d]/g, '') || null;
        const sku = document.querySelector('.select-code')?.innerText?.trim() || null;
        const marca = document.querySelector('p.row span.mx-1')?.innerText?.trim() || null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'PRODALAM',
            marketplace: 'VTEX',
            url
        };
    }, url);
};
