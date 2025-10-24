/* eslint-disable prettier/prettier */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const Customer = require("../models/customer.model"); // Adjust the path as needed
const config = require("./secret"); // Import your secrets (client ID, client secret)

// Determine OAuth settings from env or secret config
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || config.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.NODE_ENV === "production" ? process.env.PROD_CALLBACK_URL : process.env.CALLBACK_URL || config.CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !CALLBACK_URL) {
  // If any required OAuth env is missing, skip initializing the GoogleStrategy.
  // This allows running the server without OAuth configured (useful for local dev).
  console.warn(
    "Google OAuth not configured. Missing one of: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or CALLBACK_URL. Skipping GoogleStrategy setup."
  );
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
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
}

module.exports = passport;
