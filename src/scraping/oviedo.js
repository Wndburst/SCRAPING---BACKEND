module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Seleccionar la marca del producto
        const marca = document.querySelector('.infoProducto h5')?.innerText?.trim() || null;

        // Seleccionar el precio del producto (precio oferta)
        const precio = document.querySelector('.precioOfertaFicha')?.innerText
            ?.replace(/[^\d]/g, '') || null;

        // Seleccionar el nombre del producto
        const nombre = document.querySelector('#nombreFicha')?.innerText?.trim() || null;

        // Seleccionar el SKU del producto y eliminar el prefijo "sku:"
        const sku = document.querySelector('.codigo')?.innerText
            ?.replace(/^sku:\s*/i, '').trim() || null;

        // Seleccionar la disponibilidad del producto (stock)
        const stock = document.querySelector('#stockFicha .conStock')?.innerText?.trim() || null;

        // Seleccionar el mensaje del precio (e.g., "Exclusivo internet")
        const mensajePrecio = document.querySelector('.msjePrecio')?.innerText?.trim() || null;

        // Seleccionar el precio en tienda
        const precioTienda = document.querySelector('.nomTiendaSeleccionada')?.innerText?.replace('Precio tienda: ', '').trim() || null;

        // Seleccionar la descripción del producto
        const descripcion = document.querySelector('.tituloDescripcion + .cont100 p')?.innerText?.trim() || null;

        // Seleccionar la imagen del producto
        const imageurl = document.querySelector('.fancybox.imgGaleriaGrande img')?.src || null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'OVIEDO',
            marketplace: 'VTEX',
            url,
        };
    }, url);
};
