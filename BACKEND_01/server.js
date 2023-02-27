//import express module
const exp = require("express");

//call function
const app = exp();

//import connection
const connection = require("./database/db.config");
connection.connect((err) => {
  if (err) {
    console.log("error occured:", err);
  } else {
    console.log("connection success");
  }
});


//assign port
let port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server on port ${port}...`));

//import routes
const userApp = require("./routes/user.route");

const projectApi = require("./routes/project.routes");

app.use("/users", userApp);

app.use("/projects", projectApi);

app.use("*", (req, res, next) => {
  res.send({ mesage: "invalid path" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send({ message: "error occured at", error: err.message });
});
