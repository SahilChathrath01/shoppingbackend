const mongoose = require('mongoose')

const customerSchema =  new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    gender: { type: String, default: "" },
    phone: { type: String, default: ""},
    address: { type: String, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null,ref:"user" }  ,  // ref user
    createdAt:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("customer", customerSchema)