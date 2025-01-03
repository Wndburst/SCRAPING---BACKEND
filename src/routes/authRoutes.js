const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();



/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rut:
 *                 type: string
 *                 description: RUT del usuario (clave primaria).
 *                 example: "207598410"
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *                 example: "Juan Pérez"
 *               correo:
 *                 type: string
 *                 description: Correo electrónico único del usuario.
 *                 example: "juan.perez@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "20759841"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado con éxito"
 *       400:
 *         description: Error en los datos enviados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un Access Token.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rut:
 *                 type: string
 *                 description: RUT del usuario.
 *                 example: "207598410"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "20759841"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso. Devuelve el Access Token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
// Ruta para registrar usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
