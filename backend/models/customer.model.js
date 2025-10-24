const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          // simple, robust email validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    verificationCode: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "customer",
    },
    bio: String,
    profilePicture: String,

    bookedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation", // Link to Reservation schema
      },
    ],
  },
  { timestamps: true },
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
