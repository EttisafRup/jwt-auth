const jwt = require("jsonwebtoken");
const loginJWTAuthentication = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  console.log(token);
  const exactToken = jwt.verify(token, process.env.JWT_TOKEN);
  const { name, id } = exactToken;
  req.name = name;
  req.id = id;
  next();
};
module.exports = loginJWTAuthentication;
