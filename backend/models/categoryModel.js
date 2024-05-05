const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    Sgst: {
        type: Number,
        required: true
    },
    Cgst: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Category", categorySchema);