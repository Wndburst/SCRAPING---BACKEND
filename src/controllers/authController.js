const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

// Controlador para registrar usuarios
const registerUser = (req, res) => {
    const { rut, nombre, correo, password } = req.body;

    // Validar datos
    if (!rut || !nombre || !correo || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Hashear la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insertar el usuario en la base de datos
    const query = `
        INSERT INTO Usuarios (rut, nombre, correo, password)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [rut, nombre, correo, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            return res.status(500).json({ error: 'Error al registrar el usuario' });
        }

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
};

const loginUser = (req, res) => {
    const { rut, password } = req.body;

    // Validar datos
    if (!rut || !password) {
        return res.status(400).json({ error: 'RUT y contraseña son obligatorios' });
    }

    // Consultar el usuario en la base de datos
    const query = `SELECT * FROM Usuarios WHERE rut = ?`;

    db.query(query, [rut], (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];

        // Verificar la contraseña
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Crear el token JWT
        const token = jwt.sign({ rut: user.rut, nombre: user.nombre }, process.env.JWT_SECRET, {
            expiresIn: '10h'
        });

        res.json({ message: 'Inicio de sesión exitoso', token });
    });
};

module.exports = { registerUser, loginUser  };
