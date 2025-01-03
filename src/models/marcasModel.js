const db = require('../config/db');

const Marcas = {

    getFromAsociaciones: (callback) => {
        const query = `SELECT DISTINCT m.marca
                    FROM AsociacionesProductos a
                    JOIN ProductosMimbral m ON a.id_producto_mimbral = m.id
                    WHERE m.marca IS NOT NULL;
                    `;
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    getAll: (callback) => {
        const query = `select distinct marca from productosmimbral`;
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = Marcas;