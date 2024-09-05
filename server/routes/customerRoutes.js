const routes = require("express").Router()
const CustomerController = require("../api/customer/customerController")
const CategoryController = require("../api/category/categoryController")
const ProductController = require("../api/product/productController")
const OrderController = require("../api/order/orderController")
const CartController = require("../api/cart/cartController")
const ReviewController = require("../api/review (Rating)/reviewController")
const ContactController = require("../api/Contact/contactContrller")
const OrderDetailController = require("../api/orderDetail/orderDetailController")
const UserController = require("../api/user/userController")
const multer = require("multer")

//NOTE - Category Routes
routes.post("/category/all",CategoryController.all)
routes.post("category/single",CategoryController.single)

//NOTE - Product Routes
routes.post("/product/all",ProductController.all)
routes.post("/product/single",ProductController.single)

//NOTE - User Routes
routes.post("/login",UserController.login)

//NOTE - Customer Routes
routes.post("/all",CustomerController.all)
routes.post("/single",CustomerController.single)
routes.post("/register",CustomerController.register)

//NOTE - Review Routes
routes.post("/reviwe/all",ReviewController.all)

// NOTE contact routes
routes.post("/contact/all",ContactController.contactall)
routes.post("/contact/add",ContactController.contactAdd)

// Order
routes.post("/order/all",OrderController.all)
routes.post("/order/single",OrderController.single)

//.......................................................................|
// routes.use(require("../middleware/tokenChecker"))
// .......................................................................|

// search api 

//NOTE - User Routes
routes.post("/change/password",UserController.change_password)

//NOTE - Cart Routes
routes.post("/cart/add",CartController.Addtocart)
routes.post("/cart/all",CartController.cartAll)
routes.post("/cart/update",CartController.update)
routes.post("/cart/delete",CartController.deleteFun)


//NOTE - Order Routes
routes.post("/order/add",OrderController.add)

routes.post("/order/update",OrderController.update)

//NOTE - OrderDetail Routes
routes.post("/order/detail",OrderDetailController.all)

//NOTE - Customer Routes
routes.post("/update/profile",CustomerController.update_Profile)

//NOTE - Review Routes
const ReviewUpload = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"server/public/review")
        }, 
        filename:(req,file,cb)=>{
            cb(null,Date.now()+ "-"+ file.originalname)
        }
    })
}).single("reviewpic")
routes.post("/review/add",ReviewUpload,ReviewController.add)

//NOTE contact routes
routes.post("/contact/update",ContactController.update)




module.exports = routes