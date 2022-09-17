const express = require('express')
const Router = express.Router()

const {
    getCartItems, putCartItems, deleteCart, deleteAll
} = require('../Controllers/cartController')

Router.get('/items/:id', getCartItems)
Router.post('/newItem', putCartItems)
Router.delete('/deleteItem/:id', deleteCart)
Router.delete('/deleteAll/:id', deleteAll)

module.exports = Router