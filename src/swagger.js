const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'APIs Scraping Mimbral',
            version: '1.0.0',
            description: 'Documentación de todas las rutas de la API de la aplicación de scraping Mimbral',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Servidor Local',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Incluye todos los archivos de rutas
};


// Crear especificaciones de Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
