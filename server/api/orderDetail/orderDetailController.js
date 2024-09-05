const OrderDetail = require("./orderDetailModel")

const all =  (req, res) => {
    OrderDetail.find(req.body)
    .populate('orderId')
    .populate('productId').exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                total: result.length,
                message: "All OrderDetail loaded",
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

module.exports = {all}