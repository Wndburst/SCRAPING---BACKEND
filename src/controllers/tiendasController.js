const TiendasController = require('../models/TiendaModel');

const getAllTiendas = (req, res) => {
    TiendasController.getAll((err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener Tiendas' });
        } else {
            res.status(200).json(productos);
        }
    });
};

module.exports = { getAllTiendas};
