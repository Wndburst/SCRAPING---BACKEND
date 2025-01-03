const express = require('express');
const { scrapeAndStore } = require('../controllers/scrapingController');

const router = express.Router();

/**
 * @swagger
 * /api/scrape:
 *   post:
 *     summary: Realiza scraping de una tienda y guarda los datos en la base de datos
 *     tags:
 *      - Scrap
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL del producto a scrapear
 *               tienda:
 *                 type: string
 *                 description: Nombre de la tienda (e.g., "Mimbral", "Construmart")
 *     responses:
 *       200:
 *         description: Datos del producto almacenados exitosamente
 *       400:
 *         description: Datos insuficientes o error en el scraping
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', scrapeAndStore);

module.exports = router;
