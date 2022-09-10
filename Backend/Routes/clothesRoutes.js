const express = require('express')
const Router = express.Router()
const {
    getAllClothes, addCloth, deleteCloth, updateItem
} = require('../Controllers/clothesController')

//this will get all the clothes
Router.get('/allVariety', getAllClothes)
//add item
Router.post('/addItem', addCloth)
//delete item
Router.delete('/deleteItem/:id', deleteCloth)
//update item
Router.patch('/updateItem/:id', updateItem)

module.exports = Router
