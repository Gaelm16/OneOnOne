const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

const authenticateUser = async (req, res, next) => {
    try{
        let token = req.cookies.token

        const userInfo = jwt.verify(token, process.env.JWT_SECRET)

        req.user = User.findById(userInfo.id)
        
        next()
    } catch(err){
        res.status(401)
    }
}

module.exports = {authenticateUser}