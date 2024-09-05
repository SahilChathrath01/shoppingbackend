const mongoose = require('mongoose')

const cartSchema = new  mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref:"user" },  // ref  user 
    productId: { type: mongoose.Schema.Types.ObjectId, default: null,ref:'product' }, // ref product
    quantity: { type: Number, default: 0 }

})

module.exports = mongoose.model("cart", cartSchema)