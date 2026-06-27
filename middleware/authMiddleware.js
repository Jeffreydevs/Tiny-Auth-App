const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 const token = req.headers.authorization;
 if (!token) {
 return res.send("Access denied");
 }
 try{
  const decoded = jwt.verify(token,"secretkey"); 
  console.log(token);
  next();
 } catch (error) {
    return res.send("Invalid token");
 }
};

module.exports = authMiddleware;