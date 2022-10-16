require("dotenv").config();

console.clear();
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
//
const mongoose = require("mongoose");

// => Importing Routers
const userRouter = require("./controller/user.route");
app.use(userRouter);

//=> Error Handlers
const allErrorHandler = require("./middlewares/error.handler");
app.use(allErrorHandler);
// => Connecting Mongoose
mongoose
  .connect("mongodb+srv://etti:etti@cluster0.bhd7p.mongodb.net/jwtauth")
  .then(() => console.log("MongoDB has been Conntected"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log(`Server is running at http://localhost:4000`);
});
