const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    passWord: {type: String, required: true},
    //admin: {type: Boolean, required: true}
}, 
    {timestamps: true}
)

const User = mongoose.model('User', userSchema)
module.exports = User