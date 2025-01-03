const db = require('../config/db');

const TiendasController = {

    getAll: (callback) => {
        const query = 'select DISTINCT (tienda) from productostiendasexternas';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = TiendasController;
