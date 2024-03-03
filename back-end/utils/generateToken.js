const jwt = require("jsonwebtoken");

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("userToken", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = {
  generateToken,
};
