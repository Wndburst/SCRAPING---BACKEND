const express = require('express');
const {getAllCategorias, getFromAsociaciones} = require('../controllers/categoriasController')
const router = express.Router();

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtiene las categorias de las asociaciones
 *     tags:
 *       - Otros
 *     responses:
 *       200:
 *         description: Lista de Categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Categoria:
 *                     type: string
 */

/**
 * @swagger
 * /api/categorias/asociaciones:
 *   get:
 *     summary: Obtiene todas las categorias de asociaciones
 *     tags:
 *       - Otros
 *     responses:
 *       200:
 *         description: Lista de Categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   Categoria:
 *                     type: string
 */


router.get('/', getAllCategorias)
router.get('/asociaciones', getFromAsociaciones)


module.exports = router;
