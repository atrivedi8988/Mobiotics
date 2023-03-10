const express = require("express");
const { isAuthenticate, isAuthorize } = require("../Middlewares/auth");
const {
  registerUser,
  loggedInUser,
  getProfileAuthenticateUser,
  getAllUserByAdmin,
  makeAdmin,
  forgotPassword,
  resetPassword,
  updateProfile,
  deleteProfile,
  deleteUserByAdmin,
  userPagination,
} = require("../Controller/user.controller");

const router = express.Router();

// create new account
router.post("/create", registerUser);

// login account
router.post("/login", loggedInUser);

// Get Profile Authenticate User
router.get("/profile", isAuthenticate, getProfileAuthenticateUser);

// Update Profile and Delete Profile
router.route("/update/:id").put(isAuthenticate, updateProfile)
router.route("/delete/:id").delete(isAuthenticate, deleteProfile)

// Delete user By ---Admin 
router.delete("/admin/delete/:id",isAuthenticate,isAuthorize,deleteUserByAdmin)

// Get All User --- Admin authorize
router.get("/admin/allusers", isAuthenticate, isAuthorize, getAllUserByAdmin);

// change user to admin and make a admin
router.patch("/admin/assignadmin/:id", isAuthenticate, isAuthorize, makeAdmin);

// forgot password
router.post("/forgot", forgotPassword);

// Reset Password
router.patch("/reset/:id/:token", resetPassword);

// // Pagination Api all Users
// router.get("/admin/allusers", isAuthenticate, isAuthorize, userPagination);

module.exports = router;
