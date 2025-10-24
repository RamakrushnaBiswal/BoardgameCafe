/* eslint-disable prettier/prettier */
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const Customer = require("../models/customer.model"); // Adjust the path as needed
const config = require("./secret"); // Import your secrets (client ID, client secret)
const logger = require("./logger");

// Determine OAuth settings from env or secret config
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || config.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.NODE_ENV === "production" ? process.env.PROD_CALLBACK_URL : process.env.CALLBACK_URL || config.CALLBACK_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !CALLBACK_URL) {
  // If any required OAuth env is missing, warn in development but fail fast in
  // non-development environments to avoid silent runtime auth failures.
  const missing = [];
  if (!GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID");
  if (!GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET");
  if (!CALLBACK_URL) missing.push("CALLBACK_URL");

  if (process.env.NODE_ENV === "development") {
    // Non-fatal: allow local development without OAuth configured
    logger.warn(
      `Google OAuth not configured. Missing: ${missing.join(", ")}. Skipping GoogleStrategy setup (NODE_ENV=development).`
    );
  } else {
    // Fail fast in staging/production: log an error and exit so the issue is
    // detected immediately instead of causing silent runtime failures.
    logger.error(
      `Google OAuth configuration missing required environment variables: ${missing.join(", ")}. Aborting startup.`
    );
    // Prefer throwing an error so higher-level process managers can capture
    // the stack; also exit to ensure the process doesn't continue in a bad state.
    throw new Error(
      `Missing OAuth env vars: ${missing.join(", ")}`
    );
  }
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
              name: profile.displayName || "Unnamed User",
              email: email, // Email from Google profile
            });
            await user.save();
          }
          // Return the user if exists or after creation
          return done(null, user);
        } catch (error) {
          logger.error("Error during Google authentication:", error);
          return done(null, false, { message: "Authentication failed" });
        }
      }
    )
  );
}

module.exports = passport;
