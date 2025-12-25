const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },

    profession:{
        type: String,
        required: true,
        trim: true,
    },

    experience:{
        type: Number,
        required: true,
        min: 0,
    },

    bio:{
        type: String,
        trim: true,
    },

    location: {
        city: String,
        state: String,
        pincode: String,
    },

    servicesOffered: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "service",

    }],
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",

    }],
    availableSlots: [
        {
            data: String,
            time: String,

        },
    ],
    isApproved: {
        type: Boolean,
        default: false,
    },

verification: {
    type: String,
    enum: ["pending", "approved", 'rejected'],
    default: "pending",
},

isActive:{
    type: Boolean,
    default: true,

},

},
    { timestamps: true }
);

module.exports = mongoose.model("provider", providerSchema);