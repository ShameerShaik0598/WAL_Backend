const exp = require("express");
const app = exp();
app.use(exp.json());
const mysql = require("mysql2");
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");

// //import connection
// require("dotenv").config();
//import connection
//import mysql2

//import dotenv module
require("dotenv").config(); //process.env

//create a connection
const connection = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

connection.connect((err) => {
  if (err) {
    console.log("error occured:", err);
  } else {
    console.log("connection success");
  }
});

//assign port
let port = process.env.PORT; // 5000;
app.listen(3500, () => console.log(`Server on port...`));

//import
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
//create session store
const sessionStore = new MySQLStore({}, connection.promise());

//configure express session
app.use(
  session({
    secret: "some secret",
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
    cookie: {
      maxAge: 100000,
    },
  })
);

//get all users
app.get(
  "/users",
  expressAsyncHandler(async (req, res, next) => {
    let [rows, fields] = await db.query("select * from newusers");
    res.status(200).send({ message: "users", payload: rows });
  })
);

//create user
app.post(
  "/createuser",
  expressAsyncHandler(async (req, res, next) => {
    //get user from request
    let { username, password } = req.body;
    //find duplicate user
    let [rows] = await db.query(
      "select * from newusers where username=?",
      username
    );
    console.log(rows);
    if (rows.length != 0) {
      res.send({ message: "user already exists" });
    } else {
      //hash password
      let hashedPassword = await bcryptjs.hash(password, 4);
      password = hashedPassword;
      await db.query("insert into newusers set username=?,password=?", [
        username,
        password,
      ]);
      res.send({ message: "new user created" });
    }
  })
);

//checkuser for login
app.post(
  "/checkuser",
  expressAsyncHandler(async (req, res) => {
    //get user from request
    let { username, password } = req.body;
    //find duplicate user
    let [usercheck] = await db.query(
      "select * from newusers where username=?",
      username
    );

    if (usercheck.length == 0) {
      res.send({ message: "invalid users" });
    } else {
      //hash password
      let passwordChecking = await bcryptjs.compare(
        password,
        usercheck[0].password
      );
      if (passwordChecking) {
        delete usercheck[0].password;
        req.session.username = username;
        res.send({ message: "login successful", user: usercheck[0] });
      } else {
        res.send({ message: "incorrect password" });
      }
    }
  })
);

//logout user
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send({ message: "loggedout" });
  });
});

//modify user
app.put(
  "/modify",
  expressAsyncHandler(async (req, res, next) => {
    let { username, password } = req.body;
    if (req.session.username == username) {
      let [rows] = await db.query(
        "select * from newusers where username=?",
        username
      );
      if (rows[0] == undefined) {
        res.status(404).send({ mesage: "user dosen't exists" });
      } else {
        hashedPassword = await bcryptjs.hash(password,3);
        db.query("update newusers set username=?,password=?", [
          username,
          hashedPassword,
        ]);
        res.send({ message: "user details modified" });
      }
    } else {
      res.send({ message: "relogin" });
    }
  })
);

// Implement User API with Create user, Login user,Logout and modify user using session based authentication
//db
const db = connection.promise();
