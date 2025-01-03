const ProductosTiendasExternas = require('../models/productosTiendasExternas');

const getAllProductos = (req, res) => {
    ProductosTiendasExternas.getAll((err, productos) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener productos' });
        } else {
            res.status(200).json(productos);
        }
    });
};
const deleteOne = (req, res) => {
    const { id } = req.params;
    ProductosTiendasExternas.deleteById(id, (err, producto) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        } else if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
        } else {
            res.status(200).json("El producto con id: "+ id +" ha sido eliminado correctamente");
        }
    });
};


module.exports = { getAllProductos, deleteOne };
