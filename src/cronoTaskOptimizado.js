const { Cluster } = require('puppeteer-cluster');
const mysql = require('mysql2/promise');
const moment = require('moment-timezone'); 
const axios = require('axios');
const fs = require('fs');
const cron = require('node-cron');
require('dotenv').config();

// Configuración de la base de datos
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'admin123',
    database: process.env.DB_DATABASE || 'scrap',
    port: process.env.DB_PORT || 3306,
};

// Función para obtener todos los productos de la base de datos
async function fetchProducts() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT url, tienda FROM productosmimbral');
        return rows;
    } catch (error) {
        console.error('Error al obtener productos de la base de datos:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Función para registrar errores en un archivo log
function logError(message) {
    const timestamp = moment().tz('America/Santiago').format('YYYY-MM-DD HH:mm:ss'); // Formato de fecha y hora en Chile
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync('../scraping_errors.log', logMessage, 'utf8');
}

// Función para limpiar el archivo de log
function clearLogFile() {
    const logFilePath = '../scraping_errors.log'; // Ruta al archivo de log
    try {
        fs.writeFileSync(logFilePath, '', 'utf8'); // Escribe un archivo vacío para limpiarlo
        console.log('Archivo de log limpiado.');
    } catch (error) {
        console.error('Error al limpiar el archivo de log:', error.message);
    }
}

// Función principal
async function executeScraping() {
    clearLogFile(); // Limpia el archivo de log al inicio

    console.time('Tiempo total'); // Inicia el temporizador

    const products = await fetchProducts();
    if (!products.length) {
        console.log('No hay productos para actualizar.');
        console.timeEnd('Tiempo total'); // Finaliza el temporizador si no hay productos
        return;
    }

    console.log(`Se encontraron ${products.length} productos para actualizar.`);

    // Crear el cluster
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE, // Cada tarea utiliza una página diferente
        maxConcurrency: 8, // Número de tareas simultáneas (ajusta según los recursos)
        timeout: 600000,
        puppeteerOptions: {
            headless: true,
            args: ['--disable-blink-features=AutomationControlled'],
        },
    });

    // Manejar errores en las tareas
    cluster.on('taskerror', (err, data) => {
        const errorMessage = `Error en la tarea para ${data.url} (${data.tienda}): ${err.message}`;
        console.error(errorMessage);
        logError(errorMessage); // Registrar el error en el archivo log
    });

    // Definir la tarea que ejecutará el cluster
    await cluster.task(async ({ data }) => {
        const { url, tienda } = data;

        try {
            // Realizar una solicitud POST a tu API
            const response = await axios.post('http://localhost:3000/api/scrape', {
                url,
                tienda,
            });

            console.log(`Scraping exitoso para ${url}:`, response.data);
        } catch (error) {
            const errorMessage = `Error al hacer scraping para ${url} (${tienda}): ${error.message}`;
            console.error(errorMessage);
            logError(errorMessage); // Registrar el error en el archivo log
        }
    });

    // Agregar todas las URLs al cluster
    for (const product of products) {
        cluster.queue(product);
    }

    // Esperar a que todas las tareas finalicen
    await cluster.idle();
    await cluster.close();

    console.timeEnd('Tiempo total'); // Finaliza el temporizador
    console.log('Actualización masiva completada.');
}

// Configurar cron para ejecutar a las 08:51
cron.schedule('06 10 * * *', async () => {
    console.log('Iniciando la tarea programada...');
    await executeScraping();
    console.log('Tarea programada finalizada.');
});
