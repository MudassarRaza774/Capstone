const mongoose = require("mongoose")
const Clothes = require('../Database/cothesModel')

const getAllClothes = async (req, res) => {
    const result = await Clothes.find({})
    console.log("in all cllothes ")
    if (!result) {
        return res.status(404).json("login first")
    }
    res.status(200).json(result)
}

const addCloth = async (req, res) => {
    console.log("i am in add clothe")
    const { price, description,
        size, name, color,
        stuff, guidelines, catagory, images } = req.body

    try {
        const result = await Clothes.create({
            images, price, description,
            size, name, color,
            stuff, guidelines, catagory
        })
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json(error.message)
    }
}

const deleteCloth = async (req, res) => {
    const { id } = req.params
    const result = await Clothes.findByIdAndDelete({ _id: id })
    if (result) {
        res.status(200).json("item deleted")
    }
    else {
        res.status(400).json("unable to delete")
    }
}

const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid) {
        return res.status(404).json("id is not valid")
    }
    const result = await Clothes.findOneAndUpdate(
        { _id: id },
        { ...req.body }
    )
    if (!result) {
        res.status(404).json("item with this id not found")
    } else {
        res.status(200).json("item updated successfully")
    }
}

module.exports = { getAllClothes, addCloth, deleteCloth, updateItem }