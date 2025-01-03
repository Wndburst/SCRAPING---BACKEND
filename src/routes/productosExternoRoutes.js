const express = require('express');
const { getAllProductos, deleteOne} = require('../controllers/productosExternosController');

const router = express.Router();

/**
 * @swagger
 * /api/externos/productos:
 *   get:
 *     summary: Obtiene todos los productos de tiendas externas
 *     tags:
 *       - Tiendas externas
 *     responses:
 *       200:
 *         description: Lista de productos de tiendas externas
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
 *                   url:
 *                     type: string
 *                   imageurl:
 *                     type: string
 */
/**
 * @swagger
 * /api/externos/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - Tiendas externas
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
router.delete('/productos/:id', deleteOne);
module.exports = router;
