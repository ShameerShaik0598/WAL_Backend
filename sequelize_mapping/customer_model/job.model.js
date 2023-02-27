const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");
const { Emps } = require("./emp.model");

exports.Jobs = sequelize.define(
  "job",
  {
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    job_desc: {
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

// (async () => await this.Jobs.sync())();
