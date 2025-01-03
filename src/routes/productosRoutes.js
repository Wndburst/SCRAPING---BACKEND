const express = require('express');
const { getAllProductos, getProductoById, deleteOne } = require('../controllers/productosMimbralController');

const router = express.Router();

/**
 * @swagger
 * /api/mimbral/productos:
 *   get:
 *     summary: Obtiene todos los productos de Mimbral
 *     tags:
 *       - Productos Mimbral
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   tienda:
 *                     type: string
 *                   sku:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   precio:
 *                     type: number
 *                   marca:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   url:
 *                     type: string
 *                   imageurl:
 *                     type: string
 */

/**
 * @swagger
 * /api/mimbral/productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags:
 *       - Productos Mimbral
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Datos del producto
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/mimbral/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - Productos Mimbral
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */


router.get('/productos', getAllProductos);
router.get('/productos/:id', getProductoById);
router.delete('/productos/:id', deleteOne); 

module.exports = router;
