const db = require('../config/db');

const ProductosMimbral = {
    upsert: (producto, callback) => {
        const query = `
            INSERT INTO productosmimbral (tienda, sku, nombre, precio, marca,categoria, url, imageurl, updated_at, marketplace)
            VALUES (UPPER(?), UPPER(?), UPPER(?), ?, UPPER(?),UPPER(?), ?, ?, CURRENT_TIMESTAMP(),UPPER(?))
            ON DUPLICATE KEY UPDATE
            precio = VALUES(precio),
            categoria = VALUES(categoria),
            updated_at = CURRENT_TIMESTAMP()
        `
        
        const {tienda, sku, nombre, precio, marca, url, imageurl, categoria, marketplace} = producto;
        db.query(query, [tienda, sku, nombre, precio, marca,categoria, url, imageurl, marketplace], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM productosmimbral';
        
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM productosmimbral WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },
    deleteById: (id, callback) => {
        const query = 'DELETE FROM productosmimbral WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};

module.exports = ProductosMimbral;
