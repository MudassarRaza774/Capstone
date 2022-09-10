const mongoose = require('mongoose')
const schema = new mongoose.Schema(
    {
        images: {
            type: Array,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        stuff: {
            type: String,
            required: true
        },
        guidelines: {
            type: String,
            required: true
        },
        catagory: {
            type: String,
            required: true
        },
        name:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("clothes", schema)