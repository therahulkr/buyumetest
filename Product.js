const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: Number,
    quantity: Number
});

module.exports = productSchema;
