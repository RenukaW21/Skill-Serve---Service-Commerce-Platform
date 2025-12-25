const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "provider",
    },
    service:[
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "service",   
        },
    ],
    totolPrice: {
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum: ["Requested", "Accepted", "In Progess", "Completed", "Cancelled"],
        default: "Requested",
    },
    bookingDate: {
        type: Date,
        required: true,
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },

},
{timestamps: true}
);

module.exports = mongoose.model("booking", bookingSchema);