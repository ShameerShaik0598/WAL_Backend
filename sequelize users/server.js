// import express
const exp = require("express");
const app = exp();

require("dotenv").config();
const sequelize = require("./db/db.config");

const expressAsyncHandler = require("express-async-handler");
const { users } = require("./users model/user.model");
const { Op, where } = require("sequelize"); // to use operators

//assigning port number
const PORT = process.env.PORT || 8000;
app.listen(8000, () => console.log(`Server on port ${PORT}...`));

//Test DB connection
sequelize
  .authenticate() //authenticate mthod used to test connection
  .then(() => console.log("DB connection sucessful"))

  .catch((err) => console.log("err in DB connection", err));

app.use(exp.json());

app.post(
  "/create-user",
  expressAsyncHandler(async (req, res) => {
    //await user.sync();
    await users.create(req.body);
    res.send({ message: "New user Created" });

    res.send({ message: "New User Created" });
  })
);

app.get(
  "/get-users",
  expressAsyncHandler(async (req, res) => {
    let allUsers = await users.findAll();
    res.send({ message: "users are ", payload: allUsers });
  })
);

app.get(
  "/user/:Email",
  expressAsyncHandler(async (req, res) => {
    let user_pk = await users.findByPk(req.params.Email);
    res.send({ message: "user is", payload: user_pk });
  })
);

//get non key
app.get(
  "/user/firstName/:firstName",
  expressAsyncHandler(async (req, res) => {
    let userByFirstName = await users.findOne({
      where: { firstName: req.params.firstName },
    });
    res.send({ message: "user is", payload: userByFirstName });
  })
);

//update
app.put(
  "/update-user",
  expressAsyncHandler(async (req, res) => {
    let updateCount = await users.update(req.body, {
      where: { Email: req.body.Email },
    });
    if (updateCount == 0) {
      res.send({
        message: "Either No user found to Update (or) Nothing to Update",
      });
    } else {
      res.send({ message: "user updated" });
    }
  })
);

//delete user
app.delete(
  "/delete-user/:Email",
  expressAsyncHandler(async (req, res) => {
    let deleteCount = await users.destroy({
      where: {Email: req.params.Email },
    });
    if (deleteCount == 0) {
      res.send({ message: "no user found" });
    } else {
      res.send({ message: "user deleted" });
    }
  })
);

// err handling middleware
app.use((err, req, res, next) => {
  res.send({ errMsg: err.message });
});
