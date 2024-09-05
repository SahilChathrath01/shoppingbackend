const Category1 = require('./categoryModel')

const add = async (req, res) => {
    // console.log(req.body);
    // console.log(req.file)
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required"
    }
    if (!req.body.description) {
        validation += "Description is Required"
    }
    if (!req.file) {
        validation += "image is required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error" + validation
        })
    }
    else {
        let prevCategory = await Category1.findOne({ name: req.body.name })
        if (prevCategory == null) {
            let Total = await Category1.countDocuments()
            let category = new Category1()
            category.autoId = Total + 1
            category.name = req.body.name
            category.description = req.body.description
            category.image = "category/"+req.file.filename
            category.save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Add New Category",
                        data: result
                    })
                })
                .catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        data: err.message
                    })
                })
        } else {
            res.send({
                success: false,
                status: 400,
                message: "Category Already exists with same"
            })
        }

    }

}

// const all = (req, res) => {
//     req.body.status = true
//     Category1.find(req.body).exec()
//         .then((data) => {
//             res.send({
//                 success: true,
//                 status: 200,
//                 message: "all category show",
//                 total: data.length,
//                 data: data
//             })
//         })
//         .catch((err) => {
//             res.send({
//                 success: false,
//                 status: 500,
//                 message: err.message
//             })
//         })
// }

const all = (req, res) => {
    req.body.status = true
    Category1.find(req.body).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All document loaded",
                total: result.length,
                data: result
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
    }
    else {
        Category1.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Category does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Document loaded",
                        data: data
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
            message: "Validation error : " + validation,
        })
    }
    else {
        Category1.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Category does not exist"
                    })
                }
                else {
                    data.status = false

                    data.save()
                        .then((updatedata => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Document Deleted",
                                data: updatedata
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

const update = (req, res) => {
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
        Category1.findOne({ _id: req.body._id }).exec()
            .then(async (update_save) => {
                if (update_save == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "category _id does not exist"
                    })
                } else {
                    let prevCategory = await Category1.findOne(
                        {
                            $and: [
                                { name: req.body.name },
                                { _id: { $ne: req.body._id } }
                            ]

                        }
                    )
                    if (prevCategory == null) {
                        if (!!req.body.name) update_save.name = req.body.name
                        if (!!req.body.description) update_save.description = req.body.description
                        if(!!req.file) update_save.image ="category/"+req.file.filename
                        update_save.save()
                            .then((prev_update) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "data update",
                                    data: prev_update
                                })
                            })
                            .catch((err) => {
                                res.send({
                                    success: false,
                                    status: 500,
                                    message: err.message
                                })
                            })
                    } else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Category Name already exixtss"
                        })
                    }
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

module.exports = { add, all, single, update, deleteFun }