module.exports = async (page, url) => {
    return await page.evaluate((url) => {
        // Seleccionar elementos del DOM
        const imageElement = document.querySelector('.osf__sc-d9hb4p-0.osf__sc-1ag4vjc-0');
        const backgroundImage = imageElement?.style.backgroundImage || null;
        const imageurl = backgroundImage.match(/url\("([^"]+)"\)/)?.[1] || null;
        const marca = document.querySelector('small span.osf__sc-4l0o6r-0')?.innerText?.trim() || null;
        const nombre = document.querySelector('h2.osf__sc-7hvb28-2 span.osf__sc-4l0o6r-0:not(small span)')?.innerText?.trim() || null;
        const sku = document.querySelector('span.osf__sc-7hvb28-3')?.innerText?.replace('SKU: ', '').trim() || null;
        const precio = document.querySelector('p.osf__sc-1kvhwj2-2')?.innerText?.replace(/[^\d]/g, '') || null;
        // Retornar los datos
        return {
            sku,
            nombre,
            precio,
            marca,
            imageurl,
            tienda: 'IMPERIAL',
            marketplace: 'VTEX',
            url
        };
    }, url);
};
