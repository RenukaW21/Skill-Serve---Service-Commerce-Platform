const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type:String,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"provider",
    },

},
{ timestamps: true}
);

module.exports = mongoose.model("service", serviceSchema);