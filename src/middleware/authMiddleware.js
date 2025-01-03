const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verifica si el encabezado de autorización está presente
    if (!authHeader) {
        return res.status(403).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    // Extrae el token del encabezado (formato "Bearer <token>")
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'Token no válido o no proporcionado.' });
    }

    // Verifica el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; // Almacena la información decodificada en el objeto `req`
        next(); // Permite el acceso a la siguiente capa de middleware o controlador
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};

module.exports = verifyToken;
