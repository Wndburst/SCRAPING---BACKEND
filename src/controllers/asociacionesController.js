const AsociacionesModel = require('../models/asociaciones');

const createAssociation = (req, res) => {
    const { id_producto_mimbral, id_producto_externo } = req.body;

    // Validar entrada
    if (!id_producto_mimbral || !id_producto_externo) {
        return res.status(400).json({ error: 'id_producto_mimbral e id_producto_externo son requeridos' });
    }

    // Crear la asociación
    AsociacionesModel.create(id_producto_mimbral, id_producto_externo, (err, result) => {
        if (err) {
            console.error('Error al crear la asociación:', err);
            return res.status(500).json({ error: 'Error al crear la asociación', details: err.message });
        }

        res.status(201).json({
            message: 'Asociación creada con éxito',
            id: result.insertId,
        });
    });
};
const getAll = (req, res) => {
    const filters = {
        marca: req.query.marca || null,
        categoria: req.query.categoria || null
    };
    console.log("Filtros recibidos:", filters);

    AsociacionesModel.getAll(filters, (err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener productos' });
        } else {
            res.status(200).json(productos);
        }
    });
};


const deleteOne = (req, res) => {
    const { id } = req.params;
    AsociacionesModel.deleteById(id, (err, producto) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la asociación' });
        } else if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(200).json("La asociación con id: "+ id +" ha sido eliminado correctamente");
        }
    });
};

const getAsociacionById = (req, res) => {
    const { id } = req.params;
    AsociacionesModel.getById(id, (err, producto) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener la asociación' });
        } else if (!producto) {
            res.status(404).json({ error: 'asociación no encontrado' });
        } else {
            res.status(200).json(producto);
        }
    });
};


module.exports = { createAssociation, getAll, deleteOne, getAsociacionById};
