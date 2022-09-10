const Users = require('../Database/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//login
const login = async (req, res) => {
    if (req.cookies.token) {
        return res.status(400).json({ "message": "A User is already login, logout first" })
    }
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Fill the data first" })
    }
    const result = await Users.findOne({ email: email })
    if (result) {
        const token = await result.generateAuthToken()
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 300000)
        })
        const isMatch = await bcrypt.compare(password, result.password)
        if (!isMatch) {
            return res.status(404).json("Username or Password is wrong")
        } else {
            res.status(200).json(result)
        }
    } else {
        return res.status(404).json("username or password is wrong")
    }
}

//Signup
const signUp = async (req, res) => {
    const { firstName, lastName, email, userName, password, phoneNo, address } = req.body
    try {
        if (!firstName || !lastName || !email || !userName || !password || !phoneNo || !address) {
            return res.status(404).json({ "message": "Fill all the fields first" })
        }
        const result = new Users({ firstName, lastName, email, userName, password, phoneNo, address })
        await result.save()
        res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json("Email or username already exists", error)
    }
}

const deleteUser = async (req, res) => {
    const token = req.cookies.token
    const { id } = req.params
    try {
        const loggedUserId = await jwt.verify(token, process.env.SECRET_KEY)
        if (id === loggedUserId._id) {
            const rawResult = await Users.findByIdAndDelete({ _id: id })
            if (rawResult) {
                res.status(200).json("User deleted successfully :)")
            } else {
                res.status(404).json({ "message": "User not found :(" })
            }
        } else {
            res.status(404).json({ "message": "You can't delete someone ;)" })
        }
    } catch (err) {
        res.status(400).json({ "message": "You should have login first :}" })
    }

}
const updateUser = async (req, res) => {
    const token = req.cookies.token
    const { id } = req.params
    try {
        const loggedUserId = await jwt.verify(token, process.env.SECRET_KEY)
        if (loggedUserId._id === id) {
            if (!Object.keys(req.body).length) {
                return res.status(404).json({ "message": "You can't leave the fields empty :(" })
            }
            const result = await Users.findOneAndUpdate(
                { _id: id },
                { ...req.body }
            )
            if (!result) {
                res.status(404).json({ "message": "You just changed noting :(" })
            } else {
                res.status(200).json({ "message": "Profile updated successfully :)" })
            }
        } else {
            res.status(404).json({ "message": "Your mention id matched nothing" })
        }
    } catch (err) {
        res.status(400).json({ "message": "You have to login first :}" })
    }

}

//logout
const logout = (req, res) => {
    if (req.cookies.token) {
        try {
            res.clearCookie("token")
            res.status(200).json("User logged out Successfully")
        } catch (error) {
            res.status(400).json({ error })
        }
    }
    else {
        res.status(404).json({ "message": "No user is currently login" })
    }
}

module.exports = { login, signUp, logout, deleteUser, updateUser }