const db = require('../config/db');

const ProductosTiendasExternas = {
    upsert: (producto, callback) => {
        const query = `
            INSERT INTO ProductosTiendasExternas (marketplace,tienda, sku, nombre, precio, marca, url, imageurl, updated_at, vendedor)
            VALUES (UPPER(?),UPPER(?), UPPER(?), UPPER(?), ?, UPPER(?), ?, ?, CURRENT_TIMESTAMP(), UPPER(?))
            ON DUPLICATE KEY UPDATE
            marketplace=VALUES(marketplace),
            precio = VALUES(precio),
            updated_at = CURRENT_TIMESTAMP(),
            vendedor = VALUES(vendedor)
        `;
        
        const {marketplace,tienda, sku, nombre, precio, marca, url, imageurl, vendedor} = producto;
        db.query(query, [marketplace,tienda, sku, nombre, precio, marca, url, imageurl, vendedor], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM ProductosTiendasExternas';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    deleteById: (id, callback) => {
        const query = 'DELETE FROM ProductosTiendasExternas WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
};

module.exports = ProductosTiendasExternas;
