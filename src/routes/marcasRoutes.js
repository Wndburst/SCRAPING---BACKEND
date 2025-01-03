const express = require('express');
const {getAllMarcas, getFromAsociaciones} = require('../controllers/marcasController')
const router = express.Router();

/**
 * @swagger
 * /api/marcas:
 *   get:
 *     summary: Obtiene todas las Marcas
 *     tags:
 *       - Otros
 *     responses:
 *       200:
 *         description: Lista de Marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   marca:
 *                     type: string
 */

/**
 * @swagger
 * /api/marcas/asociaciones:
 *   get:
 *     summary: Obtiene las marcas de asociaciones
 *     tags:
 *       - Otros
 *     responses:
 *       200:
 *         description: Lista de Marcas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   marca:
 *                     type: string
 */

router.get('/', getAllMarcas)
router.get('/asociaciones', getFromAsociaciones)


module.exports = router;
