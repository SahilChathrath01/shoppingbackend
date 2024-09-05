const Customer = require("./customerModel")
const User = require('../user/userModel')
const bcrypt = require('bcrypt')

const all = (req, res) => {
    Customer.find(req.body).populate("userId").exec()
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                total: data.length,
                message: "All Customer Loaded",
                data: data
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
    Customer.findOne({ userId: req.body._id }).populate('userId').exec()
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "single document loaded",
                data: data
            })
        }).catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message
            })
        })
}

const register = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation = "Name is required"
    }
    if (!req.body.email) {
        validation = "email is required"
    }
    if (!req.body.password) {
        validation = "password is required"
    }
    if (!req.body.address) {
        validation = "address is required"
    }

    if (!req.body.phone) {
        validation = "phone is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error :" + validation
        })
    }
    else {
        let prevemail = await User.findOne({ email: req.body.email })
        if (prevemail == null) {
            let totalUser = await User.countDocuments()
            let obj1 = new User()
            obj1.autoId = totalUser + 1
            obj1.name = req.body.name
            obj1.email = req.body.email
            obj1.password = bcrypt.hashSync(req.body.password, 10)
            obj1.save()

                .then(async (saveUser) => {
                    let totalCustomer = await Customer.countDocuments()
                    let obj2 = new Customer()
                    obj2.autoId = totalCustomer + 1
                    obj2.name = req.body.name
                    obj2.email = req.body.email
                    obj2.phone = req.body.phone
                    obj2.address = req.body.address
                    obj2.gender = req.body.gender
                    obj2.userId = saveUser._id

                    obj2.save()
                        .then((saveCustomer) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "New Account Created",
                                data: saveCustomer
                            })
                        }).catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
                }).catch((err) => {
                    res.send({
                        success: false,
                        status: 500,
                        message: err.message
                    })
                })
        }else{
            res.send({
                success:false,
                status:400,
                message:"email already exist"
            })
        }

    }
}

const update_Profile = (req, res) => {
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
        User.findOne({ _id: req.body._id }).exec()
            .then((userdata) => {
                if (userdata == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "_id does not exist"
                    })
                } else {
                    if (!!req.body.name) userdata.name = req.body.name
                    if (!!req.body.email) userdata.email = req.body.email
                    userdata.save()
                        .then((saveduser) => {
                            Customer.findOne({ userId: req.body._id }).exec()
                                .then((Customersave) => {
                                    if (Customersave == null) {
                                        res.send({
                                            success: false,
                                            status: 400,
                                            message: "_id does not exist"
                                        })
                                    } else {
                                        if (!!req.body.name) Customersave.name = req.body.name
                                        if (!!req.body.email) Customersave.email = req.body.email
                                        if (!!req.body.gender) Customersave.gender = req.body.gender
                                        if (!!req.body.phone) Customersave.phone = req.body.phone
                                        if (!!req.body.address) Customersave.address = req.body.address
                                        Customersave.save()
                                            .then((updata_data) => {
                                                res.send({
                                                    success: true,
                                                    status: 200,
                                                    message: "data updata",
                                                    data: updata_data
                                                })
                                            }).catch((err) => {
                                                res.send({
                                                    success: false,
                                                    status: 500,
                                                    message: err.message
                                                })
                                            })
                                    }
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






module.exports = { all, single, register, update_Profile }