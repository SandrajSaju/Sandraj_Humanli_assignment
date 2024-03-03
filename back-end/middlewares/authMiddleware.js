const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.userToken;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Token",
    });
  }
};

module.exports = {
  verifyToken,
};
