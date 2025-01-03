const MarcasController = require('../models/marcasModel');

const getFromAsociaciones = (req, res) => {
    MarcasController.getFromAsociaciones((err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener Marcas' });
        } else {
            res.status(200).json(productos);
        }
    });
};

const getAllMarcas = (req, res) => {
    MarcasController.getAll((err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener Marcas' });
        } else {
            res.status(200).json(productos);
        }
    });
};



module.exports = { getAllMarcas, getFromAsociaciones};
