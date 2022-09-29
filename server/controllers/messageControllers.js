const Message = require('../models/messageModel')
const User = require('../models/userModel')
const Chat = require('../models/chatModel')

const sendMessage = async(req, res) => {
    const {messageContent, chatId} = req.body

    if(!messageContent || !chatId){
        console.log("no content passed")
        return res.status(400)
    }

    const newMessage = {
        sender: req.user._id,
        messageContent: messageContent,
        chat: chatId
    }

    try{
        let message = await Message.create(newMessage)

        message = await message.populate("sender", "-passWord")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "userName"
        })
        
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })

        res.json(message)

    } catch(e){
        res.status(400);
        console.log(e);
    }
}

const getAllMessages = async(req, res) => {
    try{
        const messages = await Message.find({chat: req.params.chatId})
            .populate("sender", "userName")
            .populate("chat")
        res.json(messages)
    } catch(e){
        console.log(e)
    }
}

module.exports = {sendMessage, getAllMessages}