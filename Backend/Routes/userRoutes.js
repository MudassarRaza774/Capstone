const express = require('express')
const Router = express.Router()
const {
    login, signUp, logout, deleteUser
} = require('../Controllers/userController')

Router.post('/login', login)
Router.post('/signup', signUp)
Router.get('/logout', logout)
Router.delete('/delete/:id', deleteUser)

module.exports = Router