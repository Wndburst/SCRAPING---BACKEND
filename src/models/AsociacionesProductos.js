const db = require('../config/db');

const AsociacionesProductos = {
    create: (asociacion, callback) => {
        const query = `
            INSERT INTO AsociacionesProductos (id_producto_mimbral, id_producto_externo)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE id_producto_externo = VALUES(id_producto_externo)
        `;

        db.query(query, [asociacion.id_producto_mimbral, asociacion.id_producto_externo], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
};

module.exports = AsociacionesProductos;
