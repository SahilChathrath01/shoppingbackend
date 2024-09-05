const mongoose = require('mongoose')

const orderDetailSchema = new  mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'order'},   // ref order
    productId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'product'},  // ref product 
    price:{type:Number,default:0},
    quantity:{type:Number,default:0},
    
})

module.exports = mongoose.model("orderDetail",orderDetailSchema)