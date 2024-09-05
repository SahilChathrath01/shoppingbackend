const Review = require('./reviewModel')
const add = async (req, res) => {
    let validtion = ""
    if (!req.body.review) {
        validtion = "review is required"
    }
    if (!req.body.rating) {
        validtion = "rating is required"
    }
    if (!req.body.userId) {
        validtion += "userId is required"
    }
    if (!req.body.name) {
        validtion += "name is required"
    }
    if (!req.body.email) {
        validtion += "email is required"
    }
    // if (!req.file) {
    //     validtion += "Image is required"
    // }
    if (!!validtion) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : "+validtion
        })
    }
    else {
        let total = await Review.countDocuments()
        let review1 = new Review()
        review1.autoId = total + 1
        review1.name = req.body.name
        review1.email = req.body.email
        review1.review = req.body.review
        review1.rating = req.body.rating
        // review1.image = "Review/"+req.file.filename
        review1.userId = req.body.userId

        review1.save()
            .then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: ' new review added',
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

const all = (req, res) => {
    Review.find(req.body).populate('userId').sort({ createdAt: -1 }).exec()
        .then((data) => {
            res.send({
                success: true,
                status: 200,
                message: "view all review",
                total: data.length,
                data: data
            })
        }).catch((err) => {
            req.send({
                success: false,
                status: 500,
                message: err.message
            })
        })

}




module.exports = { all, add, }

