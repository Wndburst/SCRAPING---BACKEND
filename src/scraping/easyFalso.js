module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        const data = {};

        try {
            // Buscar la URL de la imagen principal
            const imageElement = document.querySelector('.vtex-store-components-3-x-productImageTag--main');
            data.imageurl = imageElement?.src || 'Sin URL';

            // Buscar el nombre del producto
            const nombreElement = document.querySelector('.nombre');
            data.nombre = nombreElement?.innerText?.trim() || 'Producto sin nombre';

            // Buscar el precio del producto
            const precioElement = document.querySelector('.precio');
            data.precio = precioElement?.innerText?.replace(/[^\d]/g, '') || 'Precio no disponible';

            // Buscar el SKU del producto
            const skuElement = document.querySelector('.sku');
            data.sku = skuElement?.innerText?.replace('SKU: ', '').trim() || 'SKU no disponible';

            // Buscar la marca del producto
            const marcaElement = document.querySelector('.marca');
            data.marca = marcaElement?.innerText?.replace('Marca: ', '').trim() || 'Sin marca';

            // Agregar metadatos adicionales
            data.tienda = 'EASY';
            data.url = url;
        } catch (error) {
            console.error('Error al obtener los datos del producto:', error.message);
        }

        // Retornar los datos recolectados
        return data;
    }, url);
};
