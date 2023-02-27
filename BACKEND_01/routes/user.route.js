const exp = require("express");
const userApp = exp.Router();
userApp.use(exp.json());
const verifyToken = require("../middleware/verifyToken");
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  getProtectedRoutes,
  modifyUser,
  deleteUser,
} = require("../controllers/user.controller");
const projectApi = require("./project.routes");

userApp.get("/users", getAllUsers);

userApp.get("/user/:empid", getUserById);

userApp.post("/create-user", createUser);

userApp.post("/login-user", loginUser);

userApp.put("/modify-user", modifyUser);

userApp.delete("/delete-user/:username", deleteUser);

userApp.get("/protected-routes", verifyToken, getProtectedRoutes);

module.exports = userApp;
