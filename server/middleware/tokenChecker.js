const jwt = require("jsonwebtoken")
const SECRETkey = ("adjgkjn55465465")

const check = (req, res, next) => {
    let token = req.headers['authorization']

    if (!!token) {
        jwt.verify(token, SECRETkey, (err) => {
            if (err) {
                res.send({ success: false, status: 403, message: "unauthorised Asscess" })
            } else {
                next()
            }
        })
    } else {
        res.send({ success: false, status: 403, message: "To Token Found" })
    }
}

module.exports=check