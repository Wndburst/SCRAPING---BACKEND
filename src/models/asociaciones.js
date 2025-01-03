const db = require('../config/db');

const AsociacionesModel = {
    create: (idProductoMimbral, idProductoExterno, callback) => {
        const query = `
            INSERT INTO AsociacionesProductos (id_producto_mimbral, id_producto_externo)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE
            id_producto_mimbral = VALUES(id_producto_mimbral),
            id_producto_externo = VALUES(id_producto_externo)
        `;
        db.getConnection((err, connection) => {
            if (err) {
                console.error('Error obteniendo conexión:', err);
                return callback(err, null);
            }
            connection.query(query, [idProductoMimbral, idProductoExterno], (error, result) => {
                connection.release(); // Liberar conexión
                if (error) {
                    console.error('Error ejecutando query:', error);
                    return callback(error, null);
                }
                callback(null, result);
            });
        });
    },
    getAll: (filters = {}, callback) => {
        // Base de la consulta
        let query = `
            SELECT
                (SELECT a.id FROM AsociacionesProductos a WHERE a.id_producto_mimbral = m.id LIMIT 1) AS ID_ASOCIACION,
                m.id AS ID_PRODUCTO,
                m.imageurl AS IMAGEN_MIMBRAL,
                m.url AS URL_MIMBRAL,
                m.tienda AS TIENDA_MIMBRAL,
                m.nombre AS PRODUCTO_MIMBRAL,
                m.marca AS MARCA_MIMBRAL,
                m.categoria AS CATEGORIA_MIMBRAL,
                m.sku AS SKU_MIMBRAL,
                m.precio AS PRECIO_MIMBRAL,
                m.updated_at AS UPDATED_AT_MIMBRAL,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', e.id,
                        'marketplace', e.marketplace,
                        'tienda', e.tienda,
                        'vendedor', e.vendedor,
                        'sku', e.sku,
                        'precio', e.precio,
                        'nombre', e.nombre,
                        'marca', e.marca,
                        'url', e.url,
                        'updated_at', e.updated_at
                    )
                ) AS ASOCIACIONES_JSON
            FROM AsociacionesProductos a
            JOIN ProductosMimbral m ON a.id_producto_mimbral = m.id
            JOIN ProductosTiendasExternas e ON a.id_producto_externo = e.id
        `;

        // Variables para filtros y parámetros
        const conditions = [];
        const params = [];

        // Agregar filtros dinámicos
        if (filters.marca) {
            conditions.push('m.marca = ?');
            params.push(filters.marca);
        }
        if (filters.categoria) {
            conditions.push('m.categoria = ?');
            params.push(filters.categoria);
        }

        // Condiciones en la consulta
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Agrupación final
        query += ' GROUP BY m.id';

        // Ejecutar consulta
        db.query(query, params, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    deleteById: (id, callback) => {
        const query = 'delete from AsociacionesProductos where id_producto_externo = ?'
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },
    getById: (id, callback) => {
        const query = `
            SELECT
                (SELECT a.id FROM AsociacionesProductos a WHERE a.id_producto_mimbral = m.id LIMIT 1) AS ID_ASOCIACION,
                m.id AS ID_PRODUCTO,
                m.imageurl AS IMAGEN_MIMBRAL,
                m.url AS URL_MIMBRAL,
                m.tienda AS TIENDA_MIMBRAL,
                m.nombre AS PRODUCTO_MIMBRAL,
                m.marca AS MARCA_MIMBRAL,
                m.categoria AS CATEGORIA_MIMBRAL,
                m.sku AS SKU_MIMBRAL,
                m.precio AS PRECIO_MIMBRAL,
                m.updated_at AS UPDATED_AT_MIMBRAL,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', e.id,
                        'tienda', e.tienda,
                        'vendedor', e.vendedor,
                        'sku', e.sku,
                        'precio', e.precio,
                        'nombre', e.nombre,
                        'marca', e.marca,
                        'url', e.url,
                        'updated_at', e.updated_at
                    )
                ) AS ASOCIACIONES_JSON
            FROM AsociacionesProductos a
            JOIN ProductosMimbral m ON a.id_producto_mimbral = m.id
            JOIN ProductosTiendasExternas e ON a.id_producto_externo = e.id
            GROUP BY m.id
            HAVING ID_ASOCIACION = ?
        `;
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    },
};

module.exports = AsociacionesModel;
