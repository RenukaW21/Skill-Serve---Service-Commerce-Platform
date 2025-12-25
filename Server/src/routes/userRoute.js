const express = require("express");
const router = express.Router();

const{ signUpUser, loginUser, otpLogin, googleLogin, getUserProfile, getAllUsers, updateUserProfile, deleteUser, blockUnblockUser, changePassword} = require("../controllers/userController");
const authentication = require("../middlewares/authMiddleware");
const authorization = require("../middlewares/authorization")
//For User
router.post("/signup", signUpUser);
router.post("/login",  loginUser);
router.get("/user/:id",authentication , getUserProfile);

//Get all user Profile for Admin
router.get("/allUsers", authentication , authorization("admin"), getAllUsers);
//Delete self
router.delete("/deleteUser", authentication, deleteUser);

//Admin delete
router.delete("/user/:userId", authentication, authorization, deleteUser);


//Block unblock user(Admin)
router.put("/user/block/:userId", authentication, authorization("admin"), blockUnblockUser);

//Password Chj=ange
router.put("/change-password", authentication, changePassword);

module.exports = router;