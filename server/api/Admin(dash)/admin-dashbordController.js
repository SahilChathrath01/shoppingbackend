const TotalActiveCustomer = require("../user/userModel")
const Category = require("../category/categoryModel") 
const Product = require("../product/productModel")
const Order = require("../order/orderModel") 
const Enquiries = require("../Contact/contactModel") 

const adminDashboard = async (req,res)=>{
    let TotalCategorys = await Category.countDocuments()
    let TotalProducts = await Product.countDocuments()
    let TotalOrders = await Order.find({status:"Pending"})
    let TotalEnquiries = await Enquiries.find({status:true})
    let TotalCustomers = await TotalActiveCustomer.find({status:true,userType:2})

    res.send({
        success:true,
        status:200,
        TotalCustomers:TotalCustomers.length,
        TotalCategories:TotalCategorys,
        TotalProducts:TotalProducts,
        TotalOrders:TotalOrders.length,
        TotalEnquiries:TotalEnquiries.length,
    
    })
}


module.exports= {adminDashboard}