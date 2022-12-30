const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getloggedIn, logout, searchUser, getUserInfo} = require('../controllers/usercontroller')
const {authenticateUser} = require('../middleware/authenticate')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/loggedIn', getloggedIn)
router.get('/logout', logout)
router.get('/userInfo', getUserInfo)
router.get('/', authenticateUser, searchUser)

module.exports = router