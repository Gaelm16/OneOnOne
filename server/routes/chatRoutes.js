const express = require('express')
const router = express.Router()

const {authenticateUser} = require('../middleware/authenticate')

router.post('/', authenticateUser, sendMessage)
router.get('/:chatId', authenticateUser, getAllMessages)

module.exports = router