const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    image: { type: String, default: "product/Noimg.jpg" },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "category" }, //ref  category
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model("product", productSchema)