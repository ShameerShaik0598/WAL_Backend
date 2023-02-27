// Create “User”  model with properties firstName,lastName,email,password,age & gender
// save all string data in  lowercase
// validate email
// age shd be between 20 and 25
// length of firstName shd be greater than 4 chars
// While reading users data , add “Mr ” to males and “Ms.” to females

//import sequelize
const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");
const bcryptjs = require("bcryptjs");

//create users model
//named export
exports.users = sequelize.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        let firstname = this.getDataValue("firstName");
        return "Mr. " + firstname;
      },
      set(firstname) {
        this.setDataValue("firstName", firstname.toLowerCase());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(lastname) {
        this.setDataValue("lastName", lastname.toLowerCase());
      },
    },
    Email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      set(email) {
        this.setDataValue("Email", email.toLowerCase());
      },
      validate: {
        isEmail: {
          msg: "Invalid Email Format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(password) {
        //hash password
        let hash = bcryptjs.hashSync(password, 5);
        //set data value
        this.setDataValue("password", hash);
      },
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        let age = this.getDataValue("age");
        return age + " years";
      },
      validate: {
        min: {
          msg: "Age should above 20",
          args: 20,
        },
        max: {
          msg: "Age should be lessthan 30",
          args: 30,
        },
      },
    },
    gender: {
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
//IIFEN
(async () => await this.users.sync())();