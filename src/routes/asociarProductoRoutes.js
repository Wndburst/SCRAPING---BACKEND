const express = require('express');
const { scrapingAndAssociate } = require('../controllers/scrapingAndAssociate');

const router = express.Router();

/**
 * @swagger
 * /api/scrapandassociate:
 *   post:
 *     summary: Realiza scraping de una tienda, guarda los datos y crea una asociación con un producto de Mimbral
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
 *               id_producto_mimbral:
 *                 type: integer
 *                 description: ID del producto de Mimbral a asociar
 *     responses:
 *       200:
 *         description: Producto scrapeado, almacenado y asociado exitosamente
 *       400:
 *         description: Datos insuficientes o error en el scraping
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', scrapingAndAssociate);

module.exports = router;
