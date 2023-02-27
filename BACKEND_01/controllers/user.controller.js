const connection = require("../database/db.config");
//use promise method to use aync and await
const db = connection.promise();
const bcryptjs = require("bcryptjs");
const verifyToken = require("../middleware/verifyToken");
const jwt = require("jsonwebtoken");
//import express-async-handler
const expressAsyncHandler = require("express-async-handler");

//get all the users

const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  let [rows, fields] = await db.query("select * from users");
  res.status(200).send({ message: "users", payload: rows });
});

//get emp by id
const getUserById = expressAsyncHandler(async (req, res) => {
  //get empid from url
  let empid = req.params.empid;
  console.log(empid);
  //get emp details in id
  let [rows, fields] = await db.query(
    "select * from wal_table where emp_id=?",
    empid
  );

  if (rows == undefined) {
    res.send({ message: "emp not found" });
  } else {
    res.send({ message: "emp details are:", payload: rows });
  }
});

//create new emp details
const createUser = expressAsyncHandler(async (req, res) => {
  //get user from request
  let { username, password, email } = req.body;
  //find duplicate user
  let [rows] = await db.query(
    "select * from users  where username=?",
    username
  );
  console.log(rows);
  if (rows.length != 0) {
    res.send({ message: "user already exists" });
  } else {
    //hash password
    let hashedPassword = await bcryptjs.hash(password, 4);

    password = hashedPassword;
    await db.query("insert into users set username=?,password=?,email=?", [
      username,
      password,
      email,
    ]);
    res.send({ message: "new user created" });
  }
});

//login user
const loginUser = expressAsyncHandler(async (req, res) => {
  //get user credntials from onj
  console.log(req.body);
  let { username, password, email } = req.body;
  let [userChecking] = await db.query(
    "select * from users where username=?",
    username
  );
  if (userChecking.length === 0) {
    res.send({ message: "invalid user" });
  } else {
    let passwordChecking = await bcryptjs.compare(
      password,
      userChecking[0].password
    );
    if (passwordChecking) {
      delete userChecking[0].password;
      let signedToken = jwt.sign(
        { username: userChecking[0].username },
        process.env.SECRET_KEY,

        { expiresIn: "1h" }
      );

      res.send({
        message: "login successful",
        token: signedToken,
        user: userChecking[0],
      });
    } else {
      res.status(403).send({ message: "incorrect password" });
    }
  }
});

//modify user
const modifyUser = expressAsyncHandler(async (req, res) => {
  //get modified user from url
  let { emp_id, emp_name, emp_city, emp_designation, emp_age } = req.body;
  //chech for user existence
  let [rows] = await db.query("select * from wal_table where emp_id=?", emp_id);
  if (rows[0] == undefined) {
    res.status(404).send({ message: "user dosen't exist" });
  } else {
    "update wal_table set emp_id=?,emp_name=?,emp_city=?,emp_designation=?,emp_age=? where emp_id=?",
      [emp_id, emp_name, emp_city, emp_designation, emp_age, emp_id],
      res.send({ message: "user modifies" });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  let username = req.params.username;
  console.log(username);
    let [rows] = await db.query("select * from users where username=?", username);
    if (rows[0] == undefined) {
      res.send({ message: "user ledu bro" });
    } else {
      "delete * from users where username=?", username;
      res.send({ message: "deleted succesfully" });
    }
});

const getProtectedRoutes = expressAsyncHandler(async (req, res) => {
  let header = req.headers;
  res.send({ message: "header is: ", headerIs: header });
});

module.exports = {
  getAllUsers,
  createUser,
  modifyUser,
  loginUser,
  deleteUser,
  getProtectedRoutes,
  getUserById,
};
