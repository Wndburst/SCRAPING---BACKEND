const express = require('express');
const { createAssociation, getAll, deleteOne, getAsociacionById} = require('../controllers/asociacionesController');

const router = express.Router();

/**
 * @swagger
 * /api/asociaciones/:
 *   get:
 *     summary: Obtiene todas las asociaciones entre productos
 *     tags:
 *       - Asociaciones
 *     responses:
 *       200:
 *         description: Lista de asociaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_producto_mimbral:
 *                     type: integer
 *                   id_producto_externo:
 *                     type: integer
 */
/**
 * @swagger
 * /api/asociaciones/asociar:
 *   post:
 *     summary: Crea una asociación entre un producto de Mimbral y uno externo
 *     tags:
 *       - Asociaciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_producto_mimbral:
 *                 type: integer
 *                 description: ID del producto de Mimbral
 *               id_producto_externo:
 *                 type: integer
 *                 description: ID del producto externo
 *     responses:
 *       201:
 *         description: Asociación creada exitosamente
 *       400:
 *         description: Datos insuficientes
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/asociaciones/{id}:
 *   get:
 *     summary: Obtiene una asociación por su ID
 *     tags:
 *       - Asociaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asociación
 *     responses:
 *       200:
 *         description: Datos de la asociación
 *       404:
 *         description: Asociación no encontrada
 */
/**
 * @swagger
 * /api/asociaciones/{id}:
 *   delete:
 *     summary: Elimina una asociación por ID
 *     tags:
 *       - Asociaciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del asociación a eliminar
 *     responses:
 *       200:
 *         description: Asociaciones eliminada exitosamente
 *       404:
 *         description: Asociaciones no encontrada
 */

router.get('/', getAll);
router.post('/asociar', createAssociation);
router.delete('/:id', deleteOne);
router.get('/:id', getAsociacionById);

module.exports = router;
