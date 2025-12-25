const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    firebaseUid: {
       type: String,
       unique: true,
       sparse: true,
    },
    
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            sparse: true,
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            sparse: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
            select: false,
        },

        isBlocked: {
            type: Boolean,
            default:  false,
        },
        role: {
            type: String,
            enum: ["user","provider","admin"],
            default: "user",
        },

        authProvider:{
            type: String,
            enum: ["google", "Phone", "manual"],
            required: true,
        },

        profileImage: {
            type: String,
            trim: true,
        },

    },
    {timestamps: true}
    
);

module.exports = mongoose.model("user", userSchema);