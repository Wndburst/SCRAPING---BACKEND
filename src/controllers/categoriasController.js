const CategoriasController = require('../models/categoriasModel');

const getAllCategorias = (req, res) => {
    CategoriasController.getAll((err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener Categorias' });
        } else {
            res.status(200).json(productos);
        }
    });
};

const getFromAsociaciones = (req, res) => {
    CategoriasController.getFromAsociaciones((err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener Categorias' });
        } else {
            res.status(200).json(productos);
        }
    });
};

module.exports = { getAllCategorias, getFromAsociaciones};
