const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can't exceeded 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/dwecsqtkp/image/upload/v1678124995/default-avatar-profile-vector-user-260nw-1705357234_ueg2il.webp",
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpiry: Number,
});

module.exports = mongoose.model("user", UserSchema);
