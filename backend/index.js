const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const newsletterRoute = require("./routes/newsletterRoute");
const errorMiddleware = require("./middlewares/errrorMiddleware"); // Corrected typo
const passport = require("passport");
const { handleGoogleOAuth } = require("./controller/googleOAuth.controller");
const app = express();
const port = process.env.PORT || 3000;
const session = require("express-session");
const MongoStore = require("connect-mongo");

const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://play-cafe.vercel.app"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", newsletterRoute);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: __dirname + "/tmp/",
  }),
);

// Normalize Mongo env var: prefer MONGO_URI, fallback to MONGO_URL
const MONGO_CONNECTION = process.env.MONGO_URI || process.env.MONGO_URL;

if (!MONGO_CONNECTION) {
  logger.error(
    "Missing MongoDB connection string. Set MONGO_URI or MONGO_URL in your .env file.",
  );
  // Exit early so developer notices the missing config instead of a cryptic connect-mongo error
  process.exit(1);
}

// MongoDB connection
mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB"); // Log successful connection
  })
  .catch((error) => {
    logger.error("Database connection failed:", error.message); // Use logger for connection error
    process.exit(1);
  });

// call to cloud setup
cloudinaryConnect();

// Enable CORS preflight for the create reservation route only
// Uncomment if needed
// app.options("/api/reservation/create", cors(corsOptions));

// Initialize passport middleware
app.use(passport.initialize());

app.use(
  session({
    // session secret: prefer SECRET_KEY, then JWT_SECRET.
    // In production fail fast if missing; in non-production warn and use a dev fallback.
    secret: (() => {
      let sessionSecret = process.env.SECRET_KEY || process.env.JWT_SECRET;
      if (!sessionSecret) {
        if (process.env.NODE_ENV === "production") {
          logger.error(
            "Missing session secret in production (SECRET_KEY or JWT_SECRET). Aborting startup.",
          );
          // Fail fast in production to avoid running with insecure defaults
          process.exit(1);
        }

        logger.warn(
          "No session secret provided in env (SECRET_KEY or JWT_SECRET). Using insecure fallback for development.",
        );
        sessionSecret = "dev-secret-change-me";
      }
      return sessionSecret;
    })(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: MONGO_CONNECTION,
    }),
  }),
);

// API routes
app.use("/api", require("./routes/index"));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  handleGoogleOAuth,
);

// Global CORS preflight options
app.options("*", cors(corsOptions));

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(port, () => logger.info(`Server is running on port ${port}!`)); // Log server start

module.exports = app;
