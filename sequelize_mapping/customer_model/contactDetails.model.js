const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

exports.ContactDetails = sequelize.define(
  "contactDetails",
  {
    phn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    landline: {
      type: DataTypes.INTEGER,
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
