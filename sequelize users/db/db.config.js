//DB
//import sequelize
const { Sequelize, Model } = require("sequelize");

//create instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql", // no need to import mysql2...sequelize tool automatically uses mysql
  }
);

module.exports = sequelize;
