const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
 const authHeader = req.headers.authorization;
 const token = authHeader.split(" ")[1]
 if (!token) {
 return res.send("Access denied");
 }
 try{
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded; 
  next();
 } catch (error) {
    return res.send("Invalid token");
 }
};

module.exports = authMiddleware;