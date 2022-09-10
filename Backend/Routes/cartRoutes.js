const express = require('express')
const Router = express.Router()

const {
    getCartItems, putCartItems, deleteCart
} = require('../Controllers/cartController')

Router.get('/items/:id', getCartItems)
Router.post('/newItem',putCartItems)
Router.delete('/deleteItem/:id', deleteCart)

module.exports = Router