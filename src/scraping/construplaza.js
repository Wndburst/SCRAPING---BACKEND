module.exports = async (page, url) => {

    // Esperar a que todos los elementos necesarios estén disponibles
    await page.waitForSelector('.fotorama__stage__frame.fotorama__active img', { timeout: 10000 }); // Imagen
   
    // Extraer los datos requeridos
    return await page.evaluate((url) => {
        // Seleccionar la URL de la imagen
        const imageElement = document.querySelector('.fotorama__stage__frame.fotorama__active img');
        const imageurl = imageElement?.src || null;

        // Seleccionar otros datos del producto
        const nombre = document.querySelector('h1.page-title span.base')?.innerText?.trim() || null;
        const marca = document.querySelector('.mark span')?.innerText?.trim() || null;
        const sku = document.querySelector('.sku span')?.innerText?.replace('SKU: ', '').trim() || null;
        const precio = document.querySelector('.price-wrapper .price')?.innerText?.replace(/[^\d]/g, '') || null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'CONSTRUPLAZA',
            marketplace: 'VTEX',
            url
        };
    }, url);
};
