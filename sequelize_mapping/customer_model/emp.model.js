const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

exports.Emps = sequelize.define(
  "emp",
  {
    emp_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    emp_name: {
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

// (async () => await this.Emps.sync())();
