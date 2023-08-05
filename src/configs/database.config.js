const mysql = require('mysql2');

const info = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

console.log(`>>> info: `, info)

const connection = mysql.createConnection(info)

module.exports = connection;