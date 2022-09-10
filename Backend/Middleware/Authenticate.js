const jwt = require('jsonwebtoken')
const User = require('../Database/userModel')

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log("verified token is:", verifyToken)
        const userData = await User.findOne({ _id: verifyToken._id, "tokens": token })
        console.log("userData:", userData)
        if (!userData) {
            res.status(404).json({ "message": "Authorization Failed" })
        } else {
            next()
        }
    } catch (err) {
        // res.status(400).json("user not login")
        res.status(404).json({ "message": "You should have login first" })

        // console.log("user not login")
    }
}

module.exports = Authenticate
