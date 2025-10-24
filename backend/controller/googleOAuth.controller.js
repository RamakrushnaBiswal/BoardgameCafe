const secret = require("../config/secret");
const jwt = require("jsonwebtoken");
const jwtSecret = secret.JWT_SECRET;

const handleGoogleOAuth = async (req, res) => {
  const token = jwt.sign(
    {
      sub: req.user._id,
      email: req.user.email,
      iat: Math.floor(Date.now() / 1000),
      aud: "play-cafe",
    },
    jwtSecret,
    {
      expiresIn: "1d",
      algorithm: "HS256",
    },
  );

  res.cookie("authToken", token, {
    maxAge: 3600000,
    secure: true,
  });
  res.redirect(process.env.FRONTEND_URL || "http://localhost:3000");
};

module.exports = {
  handleGoogleOAuth,
};
