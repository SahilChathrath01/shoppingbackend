const mongoose = require('mongoose')

const orderSchema = new  mongoose.Schema({
    autoId: { type:Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, default:null,ref:"user"}, // ref user 
    total: { type: Number, default: 0},
    // tax: { type: Number, default: 0},
    // subTotal: { type: Number, default: 0},
    name: { type: String, default: "" },
    contact: { type: String, default: "" },
    address: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now() },
    status: { type: String, default: "Pending" },
    
})

module.exports = mongoose.model("order", orderSchema)