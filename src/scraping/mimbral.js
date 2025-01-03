module.exports = async (page, url) => {
    // Esperar hasta que el elemento de la marca esté disponible
    await page.waitForSelector('[class*="productBrandName"]', { timeout: 10000 }); // Esperar hasta 10 segundos
    
    // Extraer los datos requeridos
    return await page.evaluate((url) => {
        const imageElement = document.querySelector('img.vtex-store-components-3-x-productImageTag--main');
        const imageurl = imageElement?.src || null;
        const sku = document.querySelector('.vtex-product-identifier-0-x-product-identifier__value')?.innerText?.trim() || null;
        const nombre = document.querySelector('.vtex-store-components-3-x-productBrand--quickview')?.innerText?.trim() || null;
        const precio = document.querySelector('.vtex-product-price-1-x-sellingPriceValue--summary-pdp')?.innerText?.replace(/\D/g, '') || null;
        const marca = document.querySelector('[class*="productBrandName"]')?.innerText?.trim() || null; // Selector de la marca
        const categoria = document.querySelector('.vtex-breadcrumb-1-x-link--1')?.innerText?.trim() || null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            categoria,
            imageurl,
            tienda: 'MIMBRAL',
            marketplace: 'VTEX',
            url
        };
    }, url); // Pasar 'url' al contexto del navegador
};
