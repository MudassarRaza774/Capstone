const express = require('express')
const Router = express.Router()
const {
    addCloth, deleteCloth, updateItem, getSpecificClothes, getFilteredItems
} = require('../Controllers/clothesController')

//get all clothes
Router.get('/allVariety/:id', getSpecificClothes)
//get filtered items
Router.get('/allVariety/filter/:id', getFilteredItems)
//add item
Router.post('/addItem', addCloth)
//delete item
Router.delete('/deleteItem/:id', deleteCloth)
//update item
Router.patch('/updateItem/:id', updateItem)

module.exports = Router
