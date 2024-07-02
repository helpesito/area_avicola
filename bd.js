const mysql = require('mysql2')//gestion de BD

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'area_avicola'
})

module.exports = pool.promise();