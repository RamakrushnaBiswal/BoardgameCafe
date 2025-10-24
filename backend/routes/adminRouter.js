const express = require("express");
const { createAdmin, loginAdmin } = require("../controller/admin.controller");
const authenticateAdmin = require("../middlewares/authAdmin");
const passport = require("../config/passport.config");
const router = express.Router();
require("dotenv").config();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authenticateAdmin,
  (req, res) => {
    res.json({
      message: "Welcome to the Admin API!",
      version: "1.0.0",
      endpoints: {
        login: "/login",
        register: "/register",
      },
      documentation: "https://api-docs-url.com",
    });
  },
);
router.post("/register", createAdmin);
router.post("/login", loginAdmin);

module.exports = router;
