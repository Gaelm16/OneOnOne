const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getloggedIn, logout} = require('../controllers/usercontroller')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/loggedIn', getloggedIn)
router.get('/logout', logout)

module.exports = router