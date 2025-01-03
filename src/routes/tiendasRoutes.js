const express = require('express');
const {getAllTiendas} = require('../controllers/tiendasController')

const router = express.Router();

/**
 * @swagger
 * /api/tiendas:
 *   get:
 *     summary: Obtiene todas las tiendas
 *     tags:
 *       - Otros
 *     responses:
 *       200:
 *         description: Lista de tiendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   tienda:
 *                     type: string
 */


router.get('/', getAllTiendas)


module.exports = router;
