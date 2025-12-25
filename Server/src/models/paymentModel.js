const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    booking:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking",
        required: true,
    },
    amount: {
        type: Number,
        required: true,

    },
    paymentId:{
        type: String,
        required: true,
    },
    method:{
        type: String,
        enum: ["Razorpay", "Wallet"],
        default: "Razorpay",
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },
},
{ timestamps: true}
);

module.exports = mongoose.model("payment", paymentSchema);