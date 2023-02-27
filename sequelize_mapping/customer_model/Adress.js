const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

exports.Address = sequelize.define(
  "address",
  {
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
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
