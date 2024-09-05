const Cart = require('./cartModel')

const Addtocart = async (req, res) => {
    let validation = ""

    if (!req.body.quantity) {
        validation += "Quantity is Required "
    }
    if (!req.body.userId) {
        validation += "userId is Required "
    }
    if (!req.body.productId) {
        validation += "productId is Required "
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error  " + validation
        })
    }
    else {
        let prevCartItem = await Cart.findOne({ userId: req.body.userId, productId: req.body.productId })

        if (prevCartItem == null) {
            let cart = new Cart()
            cart.userId = req.body.userId
            cart.productId = req.body.productId
            cart.quantity = req.body.quantity

            cart.save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: 'New Cart added',
                        data: result
                    })
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 400,
                        message: err.message
                    })
                })
        }
        else {
            prevCartItem.quantity += Number(req.body.quantity)

            prevCartItem.save()
                .then((data) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: 'Quantity Updated',
                        message: data
                    })
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 400,
                        message: err.message
                    })
                })
        }
    }
}

const cartAll = (req, res) => {
    // req.body.status = true
    Cart.find(req.body).populate("userId").populate('productId').exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: 'view all cart',
                total:result.length,
                data: result
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}

const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is requrired"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error " + validation
        })
    }
    else {
        Cart.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "_id Does Not exsit "
                    })
                }
                else {
                    if (!!req.body.quantity) data.quantity = req.body.quantity
                    data.save()
                        .then((updatedate) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Quantity Updated",
                                data: updatedate
                            })
                        }).catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}

const deleteFun = (req, res) => {
    Cart.deleteOne({ _id: req.body._id }).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "Single Document Deleted",
                data: result
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}

module.exports = { Addtocart, cartAll, update, deleteFun }