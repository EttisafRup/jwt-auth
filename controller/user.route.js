const express = require("express");
const route = express.Router();
// => MongoDB
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // ? Importing bcrypt into our Code
const mySchema = require("../models/mongo.schema");
const User = new mongoose.model("jwtauth", mySchema);
// => JSON Web Token (JWT)
const jwt = require("jsonwebtoken");
const loginJWTAuthentication = require("../middlewares/login.jwt");

route.get("/", (req, res) => {
  res.send("Welcome To Home Route");
});

route.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await createUser.save();
    res.json({
      message: "User has been created Successfully",
    });
  } catch (err) {
    res.json({
      Fail: "User was failed to create",
      error: err,
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    const logUser = await User.find({
      name: req.body.name,
      email: req.body.email,
    });
    console.log(logUser);
    const isValiedPassword = await bcrypt.compare(
      req.body.password,
      logUser[0].password
    );
    if (isValiedPassword) {
      const token = jwt.sign(
        {
          name: logUser[0].name,
          id: logUser[0]._id,
        },
        process.env.JWT_TOKEN,
        {
          expiresIn: "1hr",
        }
      );
      res.json({
        message: "Successfully logged in",
        info: logUser,
        token: token,
      });
    } else if (!isValiedPassword) {
      res.json({
        message: "NO USER EXISTS!",
      });
    } else {
      res.json({
        message: "Something Went Wrong",
      });
    }
  } catch (err) {
    res.json({
      message: "You have entered wrong or invalid password",
      err: err.message,
    });
  }
});

route.get("/secret", loginJWTAuthentication, (req, res) => {
  const name = req.name;
  const id = req.id;
  res.json({
    Congo: `Welcome, ${name}! Glad to see you here! Your default id was ID:${id}`,
  });
});

module.exports = route;
