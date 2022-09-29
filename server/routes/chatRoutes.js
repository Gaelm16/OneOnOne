const express = require('express')
const router = express.Router()

const {authenticateUser} = require('../middleware/authenticate')
const {accessChat, fetchMyChats, createGroupChat} = require('../controllers/chatController')

//router.route("/").post(authenticateUser, accessChat)
router.post('/', authenticateUser, accessChat)
router.get('/', authenticateUser, fetchMyChats)
router.post('/group', authenticateUser, createGroupChat)

module.exports = router