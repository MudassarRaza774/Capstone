const mongoose = require('mongoose')
const schema = new mongoose.Schema(
    {
        images: { //done
            type: Array,
            required: true
        },
        price: { //done
            type: Number,
            required: true
        },
        description: { //done
            type: String,
            required: true
        },
        size: { //done
            type: String,
            required: true
        },
        stuff: { //done
            type: String,
            required: true
        },
        guidelines: { //done
            type: Array,
            required: true
        },
        catagory: { //done
            type: String,
            required: true
        },
        name: { //done
            type: String,
            required: true
        },
        color: { //done
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("clothes", schema)