module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Seleccionar la imagen principal de la galería
        const imageElement = document.querySelector(
            '.jsx-2128732992.jsx-55879769.imageGallery img'
        );
        const imageurl = imageElement?.src || null;

        // Seleccionar el nombre del producto
        const nombre = document.querySelector('h1[data-name]')?.innerText?.trim() || null;

        // Seleccionar el precio del producto
        const precio = document.querySelector('span.copy12.primary.senary.jsx-2835692965.bold')?.innerText
            ?.replace(/[^\d]/g, '') || null

        // Seleccionar el SKU del producto y limpiar el prefijo
        const skuRaw = document.querySelector('span.jsx-3410277752')?.innerText || null;
        const sku = skuRaw.replace(/(Cód\. del producto:|Código del producto:)\s*/, '').trim();

        // Seleccionar la marca del producto
        const marca = document.querySelector('a#pdp-product-brand-link')?.innerText?.trim() || null;

        // Seleccionar el vendedor
        const vendedorElement = document.querySelector('a#testId-SellerInfo-sellerName span');
        const vendedor = vendedorElement?.innerText?.trim() || null;
        let marketplace = null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            vendedor,
            tienda: 'SODIMAC',
            marketplace: 'VTEX',
            url,
        };
    }, url);
};
