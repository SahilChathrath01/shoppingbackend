const Order = require('./orderModel')
const OrderDetail = require('../orderDetail/orderDetailModel')
const Cart = require("../cart/cartModel")
// const add = async (req, res) => {
//     let validation = ""
//     if (!req.body.name) {
//         validation += "Name Is Required  "
//     }
//     if (!req.body.contact) {
//         validation += "Contact Is Required "
//     }
//     if (!req.body.address) {
//         validation += "Address Is Required "
//     }
//     if (!req.body.userId) {
//         validation += "UserId Is Required "
//     }
//     if (!req.body.productData) {
//         validation += "productData Is Required "
//     }

//     if (!!validation) {
//         res.send({
//             success: false,
//             status: 400,
//             message: "Validation Error  " + validation
//         })
//     }
//     else {
//         let Total = await Order.countDocuments()
//         let order = new Order()
//         order.autoId = Total + 1
//         order.userId = req.body.userId
//         order.name = req.body.name
//         order.contact = req.body.contact
//         order.address = req.body.address
//         order.total = 0
//         let productData = []

//         if (typeof productData == 'string') {
//             let productData = JSON.parse(req.body.productData)
//             for (let x of productData) {
//                 order.total += x.price * x.quantity
//             }
//         } else {
          //  productdata = req.body.productdata
//         }


//         order.save()
//             .then((savedOrder) => {
//                 for (let i in productData) {
//                     let x = productData[i]
//                     let obj1 = new OrderDetail()
//                     obj1.orderId = savedOrder._id
//                     obj1.productId = x.productId
//                     obj1.price = x.price
//                     obj1.quantity = x.quantity

//                     obj1.save()
//                         .then(() => {
//                             Cart.deleteMany({ userId }).exec()
//                                 .then((data_updata) => {
//                                     res.send({
//                                         success: true,
//                                         status: 200,
//                                         message: "cart is deleted",
//                                         data: data_updata
//                                     })
//                                 }).catch((err) => {
//                                     res.send({
//                                         success: false,
//                                         status: 500,
//                                         message: err.message
//                                     })
//                                 })

//                         }).catch((err) => {
//                             res.send({
//                                 success: false,
//                                 status: 500,
//                                 message: err.message
//                             })
//                         })
//                 }
//             }).catch((err) => {
//                 res.send({
//                     success: false,
//                     status: 400,
//                     data: err.message
//                 })
//             })

//     }
// }

const add = async (req, res) => {
    let validation = ""

    if (!req.body.userId) {
        validation += "userId required "
    }
    if (!req.body.name) {
        validation += "Name required "
    }
    if (!req.body.address) {
        validation += "address required "
    }
    if (!req.body.contact) {
        validation += "contact required"
    }
    if (!req.body.productArray) {
        validation += "productArray required"
    }

    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {

        let total = await Order.countDocuments()
        let order = new Order()
        order.autoId = total + 1
        order.userId = req.body.userId
        order.name = req.body.name
        order.contact = req.body.contact
        order.address = req.body.address
        let products;
        if (typeof req.body.productArray == 'string')
            products = JSON.parse(req.body.productArray)
        else
            products = req.body.productArray

        let amount = 0;
        for (let i = 0; i < products.length; i++) {
            let obj = products[i]
            amount += obj.price * obj.quantity
        }
    
        order.total = amount
        // console.log(total)

        order.save()
            .then(async (result) => {
                for (let i = 0; i < products.length; i++) {
                    let obj = products[i]
                    let oDetail = new OrderDetail()
                    oDetail.orderId = result._id
                    oDetail.productId = obj.productId
                    oDetail.quantity = obj.quantity
                    oDetail.price = obj.price
                    await oDetail.save(); 
                }
                Cart.deleteMany({ userId: req.body.userId })
                    .then(() => {
                        res.send({ success: true, status: 200, message: "Order Placed", data: result })
                    })
                    .catch((err) => {
                        res.send({ success: false, status: 500, message: err.message })
                    })
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: err.message })
            })
    }
}
const all = (req, res) => {
    
    Order.find(req.body).populate("userId").exec()
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "view all Order",
                Total: data.length,
                data: data

            })

        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                Message: err.message
            })
        })


}

const single = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    } else {

        Order.findOne({ _id: req.body._id }).populate("userId").exec()
            .then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Single Document loaded",
                    data: data
                })
            }).catch((err) => {
                res.send({
                    success: true,
                    status: 500,
                    message: err.message
                })
            })
    }
}

const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error :" + validation
        })
    }
    else {
        Order.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Order Does Not exist "
                    })
                }
                else {
                    if (!!req.body.status) data.status = req.body.status

                    data.save()
                        .then((updatedata) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Data Update",
                                data: updatedata
                            })
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }

}


module.exports = { add, all, update, single }




// 