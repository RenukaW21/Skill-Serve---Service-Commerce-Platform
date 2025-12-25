const userModel = require("../models/userModels");
const { isValid, isValidName, isValidEmail, isValidContact, isValidPassword } = require("../utils/validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
let salt = 10

//Signup user(manual)

const signUpUser = async (req, res) => {
    try {

        let data = req.body

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request ! No Data Provided" })
        }
        let { name, email, phone, password, role, authProvider } = data;


        //auth provider
        if (!isValid(authProvider)) {
            return res.status(400).json({ msg: "Auth Provider is Required" });
        }

        if (!["google", "phone", "manual"].includes(authProvider)) {
            return res.status(400).json({ msg: "Invalid Auth Provider" });
        }
        if (authProvider === "manual") {
            //Name Validation
            if (!isValid(name)) {
                return res.status(400).json({ msg: "Name is required" });
            }
            if (!isValidName(name)) {
                return res.status(400).json({ msg: "Invalid Name" });
            }

            //Email Validation
            if (!isValid(email)) {
                return res.status(400).json({ msg: "Email is required" })
            }
            if (!isValidEmail(email)) {
                return res.status(400).json({ msg: "Invalid Email" })
            }
            let duplicateEmail = await userModel.findOne({ email });
            if (duplicateEmail) {
                return res.status(400).json({ msg: "Email already Exits" });
            }
            //Phone validation

            if (!isValid(phone)) {
                return res.status(400).json({ msg: "Phone Number is required" });
            }
            if (!isValidContact(phone)) {
                return res.status(400).json({ msg: "Invalid Phone Number" });
            }

            let duplicatePhone = await userModel.findOne({ phone });
            if (duplicatePhone) {
                return res.status(400).json({ msg: "Phone Number already Exits" });
            }

            //Password Validation
            if (!isValid(password)) {
                return res.status(400).json({ msg: "password is required" });
            }
            if (!isValidPassword(password)) {
                return res.status(400).json({ msg: "Invalid password" })
            }
            let hashedPassword = await bcrypt.hash(password, salt)
            data.password = hashedPassword

            let createUser = await userModel.create(data);
            return res.status(201).json({ msg: "User signed up successfully", data: createUser });


        }
        //Name Validation
        if (!isValid(name)) {
            return res.status(400).json({ msg: "Name is required" });
        }
        if (!isValidName(name)) {
            return res.status(400).json({ msg: "Invalid Name" });
        }

        //Email Validation
        if (!isValid(email)) {
            return res.status(400).json({ msg: "Email is required" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid Email" })
        }
        let duplicateEmail = await userModel.findOne({ email });
        if (duplicateEmail) {
            return res.status(400).json({ msg: "Email already Exits" });
        }

        //Phone validation

        if (!isValid(phone)) {
            return res.status(400).json({ msg: "Phone Number is required" });
        }
        if (!isValidContact(phone)) {
            return res.status(400).json({ msg: "Invalid Phone Number" });
        }

        let duplicatePhone = await userModel.findOne({ phone });
        if (duplicatePhone) {
            return res.status(400).json({ msg: "Phone Number already Exits" });
        }

        //Password Validation
        if (!isValid(password)) {
            return res.status(400).json({ msg: "password is required" });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ msg: "Invalid password" })
        }
        let hashedPassword = await bcrypt.hash(password, salt)
        data.password = hashedPassword


        data.role = "user";
        let createUser = await userModel.create(data);
        return res.status(201).json({ msg: "User signed up successfully", data: createUser });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
    }
}

//Login user

const loginUser = async (req, res) => {
    try {
        let data = req.body;
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request ! No Data Provided" })
        }

        let { email, password, authProvider } = data;
        if (!isValid(authProvider)) {
            return res.status(400).json({ msg: "Auth Provider is required" });
        }

        if (authProvider !== "manual") {
            return res.status(400).json({ msg: "Use respective login API for google or OTP Auhtentication" });
        }
        if (!isValid(email)) {
            return res.status(400).json({ msg: "Email is required" })
        }
        if (!isValid(password)) {
            return res.status(400).json({ msg: "password is required" });
        }

        let user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (user.authProvider !== "manual") {
            return res.status(400).json({ msg: `This Email Registered using ${user.authProvider} login` })
        }


        let passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return res.status(401).json({ msg: "Incorrect Password" });

        let token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "24h" }

        );

        return res.status(200).json({ msg: "Login Successfull", token })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}

//Otp Login
const otpLogin = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
    }
}

//google user

const googleLogin = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}

//get User Profile
const getUserProfile = async (req, res) => {
    try {

        let userId = req.userId;

        if (!userId) {
            return res.status(400).json({ msg: "User Id is required" });
        }

        let user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        return res.status(200).json({
            msg: "User Profile Fetched Succcedully",
            data: user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}

//get all users(Admin, user)
const getAllUsers = async (req, res) => {
    try {
        if (req.userRole !== "admin") {
            return res.status(403).json({ msg: 'Access Denied! Admin Only' });
        }

        let data = (await userModel.find().select("-password"))
        if (!data || data.length === 0) {
            return res.status(404).json({ msg: "No Users Found" });
        }

        return res.status(200).json({ msg: "users Fetched Successfully", totalUsers: data.length, users: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

//update user profile
const updateUserProfile = async (req, res) => {
    try {
        let id = req.userId;
        let userData = req.body;

        if (!userData || Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "add Request ! No data Provided." });
        }

        let { name, email, phone } = userData;
        if (name !== undefined) {
            if (!isValid(name)) {
                return res.status(400).json({ msg: "Name is required" });
            }
            if (!isValidName(name)) {
                return res.status(400).json({ msg: "Invalid Name" });
            }
        }

        if (email !== undefined) {
            if (!isValid(email)) {
                return res.status(400).json({ msg: "Email is required" });
            }
            if (!isValidEmail(email)) {
                return res.status(400).json({ msg: "Invalid Email" });
            }
            let duplicateEmail = await userModel.findOne({ email });
            if (duplicateEmail) {
                return res.status(400).json({ msg: "Email is already Exit" });
            }
        }

        if (phone !== undefined) {
            if (!isValid(phone)) {
                return res.status(400).json({ msg: "Phone Number is required" });
            }
            if (!isValidContact(phone)) {
                return res.status(400).json({ msg: "Invalid Phone Number" });
            }
            let duplicatePhone = await userModel.findOne({ phone });
            if (duplicatePhone) {
                return res.status(400).json({ msg: "Phone number is already Exit" });
            }
        }

        // if (password !== undefined) {
        //   if (!isValid(password)) {
        //     return res.status(400).json({ msg: "password is required" });
        //   }
        //   if (!isValidPassword(password)) {
        //     return res.status(400).json({ msg: "Invalid password" });
        //   }

        //   userData.password = await bcrypt.hash(password, 10);
        // }


        let update = await userModel.findByIdAndUpdate(id, userData, { new: true });
        if (!update) {
            return res.status(404).json({ msg: "User Not found" });
        }

        return res.status(200).json({ msg: "user updated successfully", data: update });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}

//Delete User
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id || req.userId;

        let deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ msg: "User Not found" });
        }

        return res.status(200).json({ msg: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}

//Block Unblock all user for admin
const blockUnblockUser = async (req, res) => {
    try {

        let userId = req.params.userId;
        let { isBlocked } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "Invalid User Id" });
        }

        if (typeof isBlocked !== "boolean") {
            return res.status(400).json({ msg: "Isblocked Must Be a Boolean Value" });
        }

        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User Not Found" });
        }

        if (user.role === "admin") {
            return res.status(403).json({ msg: "Admin Cannot be Blocked" });
        }

        user.isBlocked = isBlocked;

        await user.save();

        return res.status(200).json({ msg: `User ${isBlocked ? "Blocked" : "Unblocked"} Successfully` })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}

//Change Password
const changePassword = async (req, res) => {
    try {

        let userId = req.userId;

        let { oldPassword, newPassword } = req.body;
        if(!req.bbody || Object.keys(req.body).length === 0){
            return res.status(400).json({msg:"Bad Request ! No Data Provider."});
        }

        if (!isValid(oldPassword)) {
            return res.status(400).json({ msg: "Old Password is Required" });
        }
        if (!isValid(newPassword)) {
            return res.status(400).json({ msg: "New Password is Required" });
        }

        if (!isValidPassword(newPassword)) {
            return res.status(400).json({ msg: "Invalid newPassword" });
        }

        let user = await userModel.findById(userId).select("+password");

        if (!user) return res.status(404).json({ msg: "User Not Found" });

        if (user.authProvider !== "manual") return res.status(400).json({ msg: "Password Change allowed only for manual login users" });

        let passwordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!passwordMatch) return res.status(401).json({ msg: "Old Pasword iS Incorret" });

        let hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword
        
        await user.save();
        return res.status(200).json({msg: "Passowrd Change Successfully"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });

    }
}





module.exports = { signUpUser, loginUser, otpLogin, googleLogin, getUserProfile, getAllUsers, updateUserProfile, deleteUser, blockUnblockUser, changePassword }