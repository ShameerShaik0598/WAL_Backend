//import mysql2
const mysql = require("mysql2");

//import dotenv module
require("dotenv").config(); //process.env

//create a connection
const connection = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//export connection
module.exports = connection;

// //import mysql
// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "Shameer",
//   password: "Shameer@j+7",
//   database: "wal_db",
// });

// module.exports = connection;
