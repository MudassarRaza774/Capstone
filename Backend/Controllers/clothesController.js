const mongoose = require("mongoose")
const Clothes = require('../Database/cothesModel')

const getSpecificClothes = async (req, res) => {
    const { id } = req.params
    if (id === 'sortAtoZ') {
        const result = await Clothes.find().sort({ name: 1 })
        res.status(200).json(result)

    } else if (id === 'sortZtoA') {
        const result = await Clothes.find().sort({ name: -1 })
        res.status(200).json(result)

    } else if (id === "sortPriceHigh") {
        const result = await Clothes.find().sort({ price: -1 })
        res.status(200).json(result)

    } else if (id === 'sortPriceLow') {
        const result = await Clothes.find().sort({ price: 1 })
        res.status(200).json(result)
    } else if (id === 'general') {
        const result = await Clothes.find({})
        res.status(200).json(result)
    }
}

const getFilteredItems = async (req, res) => {
    const { id } = req.params
    const items = id.split(',')
    console.log("itms", items)
    let color = [], stuff = [], price = ''
    // console.log("id issss", id)
    for (let i = 0; i < items.length; i++) {
        if (items[i] === 'Black' || items[i] === 'White' || items[i] === 'Red' || items[i] === 'Brown') {
            color.push(items[i])
        } else if (items[i] === 'Plain' || items[i] === 'Checks' || items[i] === 'Printed' || items[i] === 'Stripes') {
            stuff.push(items[i])
        } else if (items[i] === '>2000') {
            price = 2000
        } else if (items[i] === '<1000') {
            price = 1000
        } else {
            price = 'between'
        }
    }
    if (color.length === 0) {
        color = null
    }
    if (stuff.length === 0) {
        stuff = null
    }
    if (price == '') {
        price = null
    }
    console.log("color is", color, "stuff is", stuff, "price is", price)
    if (price === 2000) {
        console.log("greater than 2000")
        if (color === null && stuff === null) {
            console.log("both null")
            const result = await Clothes.find({
                $and: [
                    { $and: [{ price: { $gt: 2000 } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color === null || stuff === null) {
            console.log("single null")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $ne: null } }, { color: { $in: color } }] },
                    { $and: [{ stuff: { $in: stuff } }, { color: { $ne: null } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color !== null && stuff !== null) {
            console.log("not null both")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $in: stuff } }, { color: { $in: color } }, { price: { $gt: 2000 } }] },
                ]
            })
            if (result.length === 0) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        }
    } else if (price === 1000) {
        console.log("less than 1000")
        if (color === null && stuff === null) {
            console.log("both null")
            const result = await Clothes.find({
                $and: [
                    { $and: [{ price: { $lt: 1000 } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color === null || stuff === null) {
            console.log("single null")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $ne: null } }, { color: { $in: color } }] },
                    { $and: [{ stuff: { $in: stuff } }, { color: { $ne: null } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color !== null && stuff !== null) {
            console.log("not null both")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $in: stuff } }, { color: { $in: color } }, { price: { $lt: 1000 } }] },
                ]
            })
            if (result.length === 0) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        }
    } else if (price === 'between') {

        if (color === null && stuff === null) {
            console.log("both null")
            const result = await Clothes.find({
                $and: [
                    { $and: [{ price: { $gte: 1000, $lte: 2000 } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color === null || stuff === null) {
            console.log("single null")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $ne: null } }, { color: { $in: color } }] },
                    { $and: [{ stuff: { $in: stuff } }, { color: { $ne: null } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color !== null && stuff !== null) {
            console.log("not null both")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $in: stuff } }, { color: { $in: color } }] },
                ]
            })
            if (result.length === 0) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        }
    } else {

        if (color === null && stuff === null) {
            console.log("both null without price")
            return res.status(200).json({ "message": "cannot find" })
            // res.status(200).json(result)
        } else if (color === null || stuff === null) {
            console.log("single null without price")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $ne: null } }, { color: { $in: color } }] },
                    { $and: [{ stuff: { $in: stuff } }, { color: { $ne: null } }] },
                ]
            })
            if (!result) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        } else if (color !== null && stuff !== null) {
            console.log("not null both without price")
            const result = await Clothes.find({
                $or: [
                    { $and: [{ stuff: { $in: stuff } }, { color: { $in: color } }] },
                ]
            })
            if (result.length === 0) {
                return res.status(404).json({ "message": "cannot find" })
            }
            res.status(200).json(result)
        }
    }

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

module.exports = { addCloth, deleteCloth, updateItem, getSpecificClothes, getFilteredItems }