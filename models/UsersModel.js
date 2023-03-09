const { mongoose } = require("mongoose");
var validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
        }
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const userModel = mongoose.model('user', userSchema)
module.exports = userModel