const User = require("../Model/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { thrownErrorMessage } = require("../Middlewares/responseMessage");
const crypto = require("crypto");
const { strongPassword } = require("../Middlewares/extrafunctionalityProblem");
const generateToken = require("../config/generateToken");
const { sendEmail } = require("../Middlewares/sendEmail");

// Register New User

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, pic } = req.body;
    if (strongPassword(password) === true) {
      if (password === confirmPassword) {
        const user = await User.create({
          name,
          email,
          password,
          confirmPassword,
          pic,
        });
        const token = generateToken(user._id);
        res.status(201).json({
          success: true,
          message: "User signup successfully",
          token,
        });
      } else {
        return thrownErrorMessage(
          res,
          400,
          "Password and Confirm Password does not match"
        );
      }
    } else {
      return thrownErrorMessage(res, 400, strongPassword(password));
    }
  } catch (error) {
    return thrownErrorMessage(res, 500, error.message);
  }
};

// Login a User

exports.loggedInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
      });
    } else {
      return thrownErrorMessage(res, 404, "Wrong credentials");
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
    // return thrownErrorMessage(res,500,error)
  }
};

// Get Profile Authenticate User

exports.getProfileAuthenticateUser = async (req, res) => {
  // console.log(req.user)
  res.status(200).send(req.user);
};

// Update Profile By User

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    if (!user) {
      return thrownErrorMessage(res, 404, "User not found");
    }
    user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      success: true,
      message: "Account Updated Succesfully",
    });
  } catch (error) {
    return thrownErrorMessage(res, 500, error.message);
  }
};

// Delete Profile By User

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return thrownErrorMessage(res, 404, "User not found");
    }
    await user.remove();
    res.status(200).json({
      success: true,
      message: "Account Deleted Succesfully",
    });
  } catch (error) {
    return thrownErrorMessage(res, 500, error.message);
  }
};

// Delete Profile User By ----Admin

exports.deleteUserByAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return thrownErrorMessage(res, 404, "User not found");
    }
    await user.remove();
    res.status(200).json({
      success: true,
      message: "Account Deleted Succesfully",
    });
  } catch (error) {
    return thrownErrorMessage(res, 500, error.message);
  }
};

// Get All User --- Admin authorize

exports.getAllUserByAdmin = async (req, res) => {
  const { page, limit } = req.query;
  if (!page && !limit) {
    const user = await User.find();
    return res.status(200).json({
      success: true,
      user,
    });
  }
  // console.log(page,limit)
  const skip = limit * page - limit;
  const user = await User.find().skip(skip).limit(limit);
  const totalPage = await (await User.find()).length;
  res.status(200).json({
    success: true,
    user,
    totalPage,
  });
};

// Make Admin Any user

exports.makeAdmin = async (req, res) => {
  const { id } = req.params;
  let user = await User.findById(id);
  if (!user) {
    return thrownErrorMessage(res, 404, "User not found");
  }
  user = await User.findByIdAndUpdate(id, { role: req.body.role });
  // user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    message: "successfully assigned",
    user,
  });
};

// Forgot Password

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = crypto.randomBytes(20).toString("hex");
      // // token = crypto.createHash("sha256").update(token).digest("hex");

      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      user.resetPasswordTokenExpiry = (Date.now() + 15 * 60 * 1000).toString();

      await user.save();

      const link = `https://mobiotics.vercel.app/reset/${user._id}/${user.resetPasswordToken}`;

      // console.log(token)
      // console.log(link)
      // console.log(user)
      try {
        await sendEmail({ email, link });

        res.status(200).json({
          success: true,
          message: `Email sent to ${user.email} successfully`,
        });
      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return thrownErrorMessage(res, 500, "Server Error");
      }
    } else {
      return thrownErrorMessage(res, 404, "User not found from this email");
    }
  } catch (error) {
    return thrownErrorMessage(res, 500, "myServer Error");
  }
};

// Reset Password

exports.resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return thrownErrorMessage(
        res,
        400,
        "Reset Password token is invalid or has been expired"
      );
    }

    if (password == user.password) {
      return thrownErrorMessage(res, 400, "New and old password same");
    }

    if (password !== confirmPassword) {
      return thrownErrorMessage(res, 400, "Password does not match");
    }
    console.log(strongPassword(password));
    if (strongPassword(password) === true) {
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password chaged successfully",
      });
    } else {
      return thrownErrorMessage(res, 400, strongPassword(password));
    }
  } catch (error) {
    return thrownErrorMessage(res, 500, error.message);
  }
};

// exports.userPagination = async(req,res)=>{
//   const {page,limit} = req.query
//   if(!page&&!limit){
//     const user = await User.find()
//     return res.status(200).json({
//       success: true,
//       user
//     })
//   }
//   // console.log(page,limit)
//   const skip = (limit*page) - limit
//   const user = await User.find().skip(skip).limit(limit)
//   const totalPage = await (await User.find()).length
//   res.status(200).json({
//     success: true,
//     user,
//     totalPage
//   })
// }
