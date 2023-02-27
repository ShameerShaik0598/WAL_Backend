const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

exports.Customers = sequelize.define(
  "customer",
  {
    cust_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    cust_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
  }
);
