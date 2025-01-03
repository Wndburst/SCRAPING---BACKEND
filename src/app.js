const express = require('express');
const productosRoutes = require('./routes/productosRoutes');
const scrapingRoutes = require('./routes/scrapingRoutes');
const tiendaExterna = require('./routes/productosExternoRoutes')
const asociacionesRoutes = require('./routes/asociacionesRoutes');
const scrapingAndAssociate = require('./routes/asociarProductoRoutes');
const marcasRoutes = require('./routes/marcasRoutes');
const categoriasRoutes = require('./routes/categoriaRoutes');
const tiendasRoutes = require('./routes/tiendasRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/authMiddleware');
const { swaggerUi, swaggerDocs } = require('./swagger');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
module.exports = app; // Exportar la instancia de Express



// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Api de productos mimbral
app.use('/api/mimbral', productosRoutes);

// Scrap a url
app.use('/api/scrape', scrapingRoutes);

// API de productos externos
app.use('/api/externos', tiendaExterna);


// API Asociaciones
app.use('/api/asociaciones', asociacionesRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// crear y asociar
app.use('/api/scrapandassociate', scrapingAndAssociate);

// otros
app.use('/api/marcas', marcasRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/tiendas', tiendasRoutes);
