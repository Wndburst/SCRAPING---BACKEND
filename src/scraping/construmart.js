module.exports = async (page, url) => {

    // Esperar a que el elemento de la marca esté disponible
    await page.waitForSelector('.vtex-store-components-3-x-productBrandContainer > .vtex-store-components-3-x-productBrandName', { timeout: 10000 });

    // Extraer los datos requeridos
    return await page.evaluate((url) => {
        // Seleccionar elementos del DOM
        const imageElement = document.querySelector('img.vtex-store-components-3-x-productImageTag--main');
        const imageurl = imageElement?.src || null;
        const sku = document.querySelector('.vtex-product-identifier-0-x-product-identifier__value')?.innerText?.trim() || null;
        const nombre = document.querySelector('.vtex-store-components-3-x-productBrand')?.innerText?.trim() || null;
        const precio = document.querySelector('.vtex-product-price-1-x-sellingPriceValue--pdp')?.innerText?.replace(/\D/g, '') || null;
        const marca = document.querySelector('.vtex-store-components-3-x-productBrandContainer > .vtex-store-components-3-x-productBrandName')?.innerText?.trim() || null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'CONSTRUMART',
            marketplace: 'VTEX',
            url
        };
    }, url);
};
