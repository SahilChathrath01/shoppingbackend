const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    review: { type: String, default: "" },
    // image: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' }, // ? ref: user
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model("Review", reviewSchema)