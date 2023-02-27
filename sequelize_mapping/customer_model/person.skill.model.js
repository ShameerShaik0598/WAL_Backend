// const sequelize = require("../db/db.config");
// const { DataTypes } = require("sequelize");
// const { Person } = require("./person.model");

// exports.Skill = sequelize.define(
//   "skill",
//   {
//     skillId: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     skill: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     personId: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: Person,
//         key: "pesonId",
//       },
//     },
//   },
//   {
//     timestamps: false,
//     updatedAt: false,
//     createdAt: false,
//     freezeTableName: true,
//   }
// );

// (async () => await this.Skill.sync())();
