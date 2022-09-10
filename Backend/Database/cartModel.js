const mongoose = require('mongoose')

schema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        productName: {
            type: String,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        },
        productImage: {
            type: Array,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }
)

module.exports = mongoose.model('cart', schema)