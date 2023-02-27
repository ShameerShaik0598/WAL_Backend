const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

exports.Skills = sequelize.define(
  "skills",
  {
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    skill_name: {
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
