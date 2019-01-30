import mysql from "mysql";
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  debug: false
});

function executeQuery(sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, null);
    } else {
      if (connection) {
        connection.query(sql, function (error, results, fields) {
          connection.release();
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      }
    }
  });
}

function query(sql, callback) {
  executeQuery(sql, function (err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  });
}

module.exports = { query };