module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Seleccionar el SKU del producto
        const sku = document.querySelector('span.vtex-product-identifier-0-x-product-identifier__value')?.innerText.trim() || null;

        // Seleccionar el nombre del producto
        const nombre = document.querySelector('span.vtex-store-components-3-x-productBrand')?.innerText.trim() ||null;

        // Seleccionar el precio del producto
        const precio = document.querySelector('p.chilemat-price-0-x-sellingPrice')?.innerText.replace(/[^\d]/g, '') || null;

        // Seleccionar la marca del producto
        const marca = document.querySelector('span.chilemat-bateriagratis-0-x-brand')?.innerText.trim() || null;

        // Seleccionar la URL de la imagen
        const imageurl = document.querySelector('img.vtex-store-components-3-x-productImageTag--main')?.src || null;

        // Seleccionar el vendedor del producto
        const vendedor = document.querySelector('span.chilemat-bateriagratis-0-x-vendidoPDP b')?.innerText.trim() || null;
        // Retornar los datos extraídos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            vendedor,
            tienda: 'CHILEMAT',
            marketplace: 'VTEX',
            url,
        };
    }, url);
};
