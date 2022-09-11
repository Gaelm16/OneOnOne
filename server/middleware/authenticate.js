const User = require('../models/userModel')
const jwt = require("jsonwebtoken")

const authenticateUser = async (req, res, next) => {
    let token = req.cookies.token

    try{
        const userInfo = jwt.verify(token, process.env.JWT_SECRET)
        req.user = userInfo.id
        //req.user = User.findById(userInfo).select("-passWord")
        
        next()
    } catch(err){
        res.status(401)
    }

    if(!token){
        res.status(401)
    }
}

module.exports = {authenticateUser}