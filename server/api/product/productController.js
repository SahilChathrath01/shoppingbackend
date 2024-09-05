const Product = require('./productModel')

const add = async (req, res) => {
    // console.log(req.files);
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required "
    }
    if (!req.file) {
        validation += "image is Required "
    }
    if (!req.body.description) {
        validation += "description is Required "
    }
    if (!req.body.price) {
        validation += "price is Required "
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validtion Error  " + validation
        })
    }
    else {
        let Total = await Product.countDocuments()
        let product = new Product()
        product.autoId = Total + 1
        product.name = req.body.name
        // console.log(req);
        // let images = []
        // for (let x of req.files) {
        //     images.push("product/"+ x.filename)
        // }
        // product.image = images
        product.image = "product/"+req.file.filename
        product.description = req.body.description
        product.price = req.body.price
        product.categoryId = req.body.categoryId

        product.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Add New Product",
                    data: result
                })
            }).catch((err) => {
                res.send({
                    success: false,
                    status: 400,
                    data: err.message
                })
            })
    }
}

const all = (req, res) => {
    req.body.status = true
    Product.find(req.body).populate("categoryId").exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                total: result.length,
                message: "View All Product",
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

const single = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: validation
        })
    } else {

        Product.findOne({ _id: req.body._id }).populate("categoryId").exec()

            .then((result) => {

                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Product does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Document loaded",
                        data: result
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

const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation error : " + validation,
        })
    }
    else {
        Product.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Id does not exist"
                    })
                }
                else {
                    if (!!req.body.name) data.name = req.body.name
                    if (!!req.body.description) data.description = req.body.description
                    if (!!req.file) data.image ="product/"+req.file.filename
                    if (!!req.body.price) data.price = req.body.price
                     
                    data.save()
                        .then((result => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Data Updated",
                                data: result
                            })
                        })).catch((err) => {
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
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error :" + validation
        })
    } else {
        Product.findOne({ _id: req.body._id }).exec()
            .then((updata_data) => {
                if (updata_data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "_id is does not exist"
                    })
                } else {
                    updata_data.status = false
                    updata_data.save()
                        .then((delete_data) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Single Document",
                                dats: delete_data
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



    




module.exports = { add, all, single, update, deleteFun}