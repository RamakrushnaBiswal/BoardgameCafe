/* eslint-disable prettier/prettier */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const Customer = require("../models/customer.model"); // Adjust the path as needed
const config = require("./secret");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || config.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || config.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_CALLBACK_URL // Use production callback URL
          : process.env.CALLBACK_URL, // Use development (localhost) callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract the email from Google profile
        const email = profile.emails[0].value;

        // Search for the user in the database by email
        let user = await Customer.findOne({ email });
        if (!user) {
          // If user doesn't exist, create a new user
          user = new Customer({
            name: profile.displayName || "Unamed User",
            email: email, // Email from Google profile
          });
          await user.save();
        }
        // Return the user if exists or after creation
        return done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(null, false, { message: "Authentication failed" });
      }
    }
  )
);

module.exports = passport;
