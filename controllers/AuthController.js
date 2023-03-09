const userModel = require("../models/UsersModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var validator = require('validator');

const authControllers = {

    signup: (req, res) => {
        const { name, email, password, phone } = req.body

        if (!name || !email || !password || !phone) {
            res.status(400).json({
                message: 'Required fields are missing'
            })
            return
        }

        userModel.findOne({ email })
            .then(async (user) => {
                if (user) {
                    res.status(400).json({
                        message: 'This email is already in use'
                    })
                }
                else {
                    const hashedPassword = await bcrypt.hash(password, 10)

                    const signupUser = {
                        ...req.body,
                        password: hashedPassword
                    }
                    userModel.create(signupUser)
                        .then(user => {
                            res.status(200).json({
                                message: 'User signed up successfully',
                                user
                            })
                        })
                        .catch(err => {
                            // console.log(err.errors.email.properties.message);
                            res.status(500).json({
                                message: 'Something went wrong'
                            })
                        })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            })
    },

    login: (req, res) => {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                message: 'Required fields are missing'
            })
            return
        }

        userModel.findOne({ email })
            .then(async (user) => {
                if (user) {
                    var token = jwt.sign({ user }, process.env.JWT_KEY);
                    const isPasswordMatch = await bcrypt.compare(password, user.password)
                    if (isPasswordMatch) {
                        res.status(200).json({
                            message: 'User logged in successfully',
                            user,
                            token
                        })
                    }
                    else {
                        res.status(400).json({
                            message: 'Email or password is incorrect'
                        })
                    }
                }
                else {
                    res.status(400).json({
                        message: 'Email or password is incorrect'
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            })
    }
}
module.exports = authControllers