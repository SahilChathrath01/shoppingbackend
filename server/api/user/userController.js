const User = require('./userModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRETkey = ("adjgkjn55465465")

const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation Error💀 :" + validation
        })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "user does not exist 🪰"
                    })
                }
                else {
                    if (!!req.body.status) data.status = req.body.status
                    data.save()
                        .then((update_data) => {
                            res.send({
                                success: true,
                                message: 200,
                                message: "Date Update 👆",
                                data: update_data
                            })
                        }).catch((err) => {
                            res.send({
                                success: true,
                                status: 500,
                                message: err.message
                            })
                        })
                }
            }).catch((err) => {
                res.send({
                    success: true,
                    status: 500,
                    message: err.message
                })
            })
    }
}

const login = (req, res) => {
    let validation = ""
    if (!req.body.email) {
        validation += "Email is required :"
    }
    if (!req.body.password) {
        validation += "password is required "
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation error : " + validation
        })
    }
    else {
        User.findOne({ email: req.body.email }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "email does not exist"
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, userData.password)) {
                        if (userData.status) {
                            let payload = {
                                _id: userData._id,
                                name: userData.name,
                                email: userData.email,
                                userType: userData.userType
                            }
                            // {expiresIn:"24h"}
                            let token = jwt.sign(payload,SECRETkey,)
                            res.send({
                                success: true,
                                status: 200,
                                message: "login successfuly",
                                data: userData,
                                token:token
                            })
                        }
                        else {
                            res.send({
                                success: false,
                                status: 400,
                                message: "Account inactive ,contact Admin",
                            })
                        }
                    } else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "invalid Credentials",
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

const change_password = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!req.body.current) {
        validation += "current is required"
    }
    if (!req.body.newpassword) {
        validation += "new_password is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "validation" + validation
        })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((userdata) => {
                if (userdata == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "_id is does not exist"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.current, userdata.password)) {
                        userdata.password = bcrypt.hashSync(req.body.newpassword, 10)
                        userdata.save()
                            .then((userdata) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "password change successfuly",
                                    data: userdata
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
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "current_password  does not  matched"
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


module.exports = { update, login, change_password }