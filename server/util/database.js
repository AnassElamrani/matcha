const mysql = require("mysql2");

const pool = mysql.createPool({
  host: '192.168.99.100',
  user: 'root',
  database: 'Matcha',
  password: 'tiger',
  // Hsfhsf@2
})

module.exports = pool.promise();