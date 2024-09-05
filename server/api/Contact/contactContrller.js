const Contact = require('./contactModel')

const contactAdd = async (req, res) => {
    let validtion = ""
    if (!req.body.name) {
        validtion += "name is required  "
    }
    if (!req.body.email) {
        validtion += "email is required  "
    }
    if (!req.body.subject) {
        validtion += "subject is required  "
    }
    if (!req.body.message) {
        validtion += "message is required "
    }
    if (!!validtion) {
        res.send({
            success: false,
            status: 400,
            message: "validation error   :"+validtion
        })
    }
    else {
        let total = await Contact.countDocuments()
        let contact = new Contact()
        contact.autoId = total + 1
        contact.name = req.body.name
        contact.email = req.body.email
        contact.subject = req.body.subject
        contact.message = req.body.message

        contact.save()
            .then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: ' new contact added',
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
}

const contactall = (req, res) => {
    req.body.status = true
    Contact.find(req.body).exec()
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "View All Conatct",
                total: data.length,
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

const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error :" + validation
        })
    }
    else {
        Contact.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Contact Does Not exist"
                    })
                }
                else {
                    if (!!req.body.status) data.status = req.body.status
                    data.save()
                        .then((data) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: 'Data Update (┬┬﹏┬┬)',
                                data:data
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


module.exports = { contactall, contactAdd, update, }