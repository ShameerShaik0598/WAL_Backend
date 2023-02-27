const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");
const { acc_holder } = require("./acc_holder.model");

exports.Accounts = sequelize.define(
  "accounts",
  {
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    acc_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    updatedAt: false,
    createdAt: false,
    freezeTableName: true,
  }
);
