const routes = require('express').Router()
const multer = require("multer")
const CategoryController = require('../api/category/categoryController')
const ProductController = require('../api/product/productController')
const OrderController = require('../api/order/orderController')
const reviewController = require("../api/review (Rating)/reviewController")
const ContactController = require("../api/Contact/contactContrller")
const UserController = require("../api/user/userController")
const Admin = require("../api/Admin(dash)/admin-dashbordController")
const CustomerController = require("../api/customer/customerController")
const OrderDetail  = require("../api/orderDetail/orderDetailController")

// ? Auth Routes 
routes.post("/login", UserController.login)

//............................... Token_SECURITY....................................|
// routes.use(require("../middleware/tokenChecker"))
//...................................................................................|              


routes.post("/dashboard",Admin.adminDashboard)


// ? User Routes 
routes.post("/update/status", UserController.update)
routes.post("/change/password", UserController.change_password)

// NOTE order routes
routes.post('/order/all', OrderController.all)
routes.post('/order/single', OrderController.single)
routes.post('/order/update', OrderController.update)


// NOTE Review routes
routes.post("/review/all", reviewController.all)

// customer routes
routes.post("/all",CustomerController.all)
routes.post("/single",CustomerController.single)


// NOTE Conatct routes
routes.post("/contact/all", ContactController.contactall)
routes.post("/contact/update",ContactController.update)


// OrderDetail
routes.post("/order/detail",OrderDetail.all)

// REVIEW Category Upload
const categoryStorage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) { 
            cb(null, "server/public/category")
        },
        filename: function (req, file, cb) {

            cb(null, Date.now() + "-" + file.originalname)
        },

    })
}).single("picture")

// LINK -  Category Routes
routes.post("/category/all",CategoryController.all)
routes.post("/category/add", categoryStorage, CategoryController.add)
routes.post("/category/single", CategoryController.single)
routes.post("/category/update",categoryStorage, CategoryController.update)
routes.post("/category/delete", CategoryController.deleteFun)


// REVIEW - Product Upload
const productupload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
           cb(null,"server/public/product")
        },
        filename:(req,file,cb)=>{
            // console.log("Req.files", req.files);
            cb(null,Date.now() +"-"+ file.originalname)
        }
    })
}).single("picture")


// NOTE products routes
routes.post("/product/add",productupload, ProductController.add)
routes.post("/product/all", ProductController.all)
routes.post("/product/single", ProductController.single)
routes.post("/product/update",productupload, ProductController.update)
routes.post("/product/delete", ProductController.deleteFun)

// ! Routes End


// ? wide card entry

routes.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "invalid address"

    })
})
module.exports = routes
