const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  //token verification logic
  //get bearer token fromm headers
  let bearerToken = req.headers.authorization;
  // chech for token existence
  if (bearerToken == undefined) {
    res.status(401).send({ message: "unauthorized access" });
  } else {
    let token = bearerToken.split(" ")[1];

    try {
      let decode = jwt.verify(token, process.env.SECRET_KEY);      
      next();
      res.send({message: token})
    } catch (err) {
      res.send({ mesage: "please relogin to continue" });
    }
  }
};

module.exports = verifyToken;
