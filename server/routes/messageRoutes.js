const express = require('express');
const router = express.Router();

const {authenticateUser} = require('../middleware/authenticate');
const {sendMessage, getAllMessages} = require('../controllers/messageControllers');

//router.post('/', authenticateUser, sendMessage)
router.route('/').post(authenticateUser, sendMessage);
router.get('/:chatId', authenticateUser, getAllMessages);

module.exports = router;