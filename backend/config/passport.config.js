// passportConfig.js
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const config = require("./secret");
const Customer = require("../models/customer.model");
const Admin = require("../models/admin.model");
require("./oauth.config");

// Secret key to sign the JWT token
const jwtSecret = process.env.JWT_SECRET || config.JWT_SECRET;

if (!jwtSecret) {
  // Skip registering JwtStrategy when secret missing to allow server startup in dev.
  console.warn(
    "JWT secret not provided (JWT_SECRET). Skipping JwtStrategy registration.",
  );
} else {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: ["HS256"],
  };

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // jwt_payload contains the decoded token
      // You can use the payload data (such as user id) to check if the user exists

      const userId = jwt_payload.sub;
      const role = jwt_payload.role;
      const roleModelMap = {
        customer: Customer,
        admin: Admin,
      };
      const Model = roleModelMap[role];
      if (Model) {
        Model.findById(userId)
          .then((user) => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch((error) => {
            return done(error, false);
          });
      } else {
        // Handle unknown roles
        return done(null, false);
      }
    }),
  );
}

module.exports = passport;
