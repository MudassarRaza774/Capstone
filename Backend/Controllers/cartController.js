const Cart = require('../Database/cartModel')

const getCartItems = async (req, res) => {
    const { id } = req.params
    const result = await Cart.find({ userName: id })
    res.status(200).json(result)
}

const putCartItems = async (req, res) => {
    const { userName, productName, productPrice,
        productImage, size, color } = req.body

    const result = new Cart({
        userName, productName, productPrice,
        productImage, size, color
    })

    await result.save()
    res.status(200).json(result)
}

//remove single cart item or many as we want
const deleteCart = async (req, res) => {
    const { id } = req.params
    const newId = id.split(',')
    const deletion = await Cart.deleteMany({ _id: { $in: newId } });
    if (!deletion.deletedCount) {
        return res.status(404).json({ error: "Unable to delete the given cart item" })
    } else {
        res.status(200).json({ message: "given id deleted" })
    }
}
module.exports = { getCartItems, putCartItems, deleteCart }