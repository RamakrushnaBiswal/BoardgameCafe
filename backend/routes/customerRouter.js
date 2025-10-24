const express = require("express");
const {
  loginCustomer,
  createCustomer,
  resetPassword,
  logout,
  verifyOtp,
  getCustomerDetail,
} = require("../controller/customer.controller");
const authenticateCustomer = require("../middlewares/authCustomer");
const passport = require("../config/passport.config");
const router = express.Router();
require("dotenv").config();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "Welcome to the User API!",
      version: "1.0.0",
      endpoints: {
        login: "/login",
        register: "/register",
      },
      documentation: "https://api-docs-url.com",
    });
  },
);

router.post("/register", createCustomer);
router.post("/logout", logout);
router.post("/verify", verifyOtp);
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] }),
);

router.post("/login", loginCustomer);
router.post("/reset-password", resetPassword);
router.get("/profile", authenticateCustomer, getCustomerDetail);

module.exports = router;
