const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const clothesRoutes = require('./Routes/clothesRoutes')
const userRoutes = require('./Routes/userRoutes')
const cartRoutes = require('./Routes/cartRoutes')
const Authenticate = require('./Middleware/Authenticate')
const mongoose = require('mongoose')
require('dotenv').config()
app.use(express.json())
app.use(cookieParser()) //use for reading the cookie from the borwser
mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database connected to port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log("Database connection Failed", error)
    })

app.use('/clothes', Authenticate, clothesRoutes)
app.use('/user', userRoutes)
app.use('/cart', Authenticate, cartRoutes)