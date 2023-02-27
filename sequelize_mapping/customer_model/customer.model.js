// //import sequelize
// const sequelize = require("../db/db.config");
// const { DataTypes } = require("sequelize");
// const bcryptjs = require("bcryptjs");

// //create customer model
// //named export
// exports.customer = sequelize.define(
//   "customer",
//   {
//     customer_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//     },
//     customer_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       get() {
//         let custName = this.getDataValue("customer_name");
//         return "Mr. " + custName;
//       },
//       set(custName) {
//         this.setDataValue("customer_name", custName.toLowerCase());
//       },
//       validate: {
//         //custom validation
//         custom(custName) {
//           if (custName.length < 2) {
//             throw new Error("name is too short");
//           }
//         },
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       set(password) {
//         //hash password
//         let hash = bcryptjs.hashSync(password, 5);
//         //set data value
//         this.setDataValue("password", hash);
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isEmail: {
//           msg: "Invalid Email Format",
//         },
//       },
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       get() {
//         let age = this.getDataValue("age");
//         return age + " years";
//       },
//       validate: {
//         min: {
//           msg: "Age should above 20",
//           args: 20,
//         },
//         max: {
//           msg: "Age should be lessthan 30",
//           args: 30,
//         },
//       },
//     },
//   },
//   {
//     timestamps: false,
//     updatedAt: false,
//     createdAt: false,
//     //tableName:'abcd',
//     freezeTableName: true,
//   }
// );
// //IIFE
// (async () => await this.customer.sync())();
