const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require("jsonwebtoken");

//generates token for new user
const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET) 
}

function getuserfromToken(token){
    const userInfo = jwt.verify(token, process.env.JWT_SECRET)
    return User.findById(userInfo.id)
}

const registerUser = async (req, res) => {
    try{
        const hashedpassword = await bcrypt.hashSync(req.body.passWord, 10)
        const useremail = await User.findOne({userName: req.body.userName})

        if(useremail) return res.json({status: 'username exists, please choose another one'})

        const user = new User({ 
            userName:req.body.userName,
            passWord: hashedpassword
        })
        await user.save()
        .then(userInfo => {
            const token = generatetoken({id: userInfo._id})
            res.cookie('token', token,{
                httpOnly: true
            })
        })
    } catch(err){
        console.log(err)
    }

    res.json({status:'ok'})
}

const loginUser = async (req, res) => {
    const {userName, passWord} = req.body

    try{
        const validUser = await User.findOne({userName})

        if(!validUser) return res.json({status: 'username does not match or user does not exist'})

        if(await bcrypt.compare(passWord, validUser.passWord)){
            const token = generatetoken({id: validUser._id})
            res.cookie('token', token,{
            httpOnly: true
            })
            return res.json({status: 'ok', data: token, result: validUser})
        } 
    } catch(err){
        console.log(err)
    }

    return res.json({status: 'error', error: 'Invalid username/password'})
}

const searchUser = async(req, res) =>{

    const inputSearch = req.query.search ? {
        $or: [
            {userName: {$regex: req.query.search, $options: "i"}},
        ]
    }

    : {}

    const users = await User.find(inputSearch).find({_id: {$ne: req.user._id}})

    res.json(users)
  
}

const getloggedIn = async (req,res) => {
    try{
        const token = req.cookies.token

        if(!token) {
            return res.json(false)
        }

        getuserfromToken(token)

        res.json(true)
    } catch(err) {
        res.json(false)
    }
}

const logout = (req, res) => {
     res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    .send()
}

module.exports = {registerUser, loginUser, getloggedIn, logout, searchUser}