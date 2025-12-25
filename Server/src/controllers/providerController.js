const mongoose = require("mongoose");
const providerModel = require("../models/providerModels");
const userModel = require("../models/userModels");
const {isValid} = require("../utils/validator");

//Apply As Provider


const applyProvider = async (req, res) =>{
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
        
    }
}

module.exports = {applyProvider}