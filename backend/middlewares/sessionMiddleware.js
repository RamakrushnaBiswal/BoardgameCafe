const sessionMiddleware = (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    next(); // Continue if session is valid and has user ID
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid session. Please log in again.",
    });
  }
};

module.exports = sessionMiddleware;
