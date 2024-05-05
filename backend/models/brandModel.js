const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema ({
    brandName: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"]
    }

},{timestamps: true})

module.exports = mongoose.model("Brand", brandSchema)