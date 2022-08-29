const User = require('../models/userModel')
const Chat = require('../models/chatModel')

const accessChat = async (req, res) => {
    const {userId} = req.body

    if(!userId){
        console.log('userId param not sent with request')
        return res.sendStatus(400)
    }

    let isChat = await Chat.find({
        groupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]

    }).populate("users", "-password")
        .populate("latestMessage")


    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "userName"
    })

    if(isChat.length > 0){
        res.json(isChat[0])
    } else {
        const chatData = {
            chatName: "sender",
            groupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await new Chat(chatData)

            const fullChat = await Chat.findOne({_id: createdChat}).populate(
                "users",
                '-password'
            )

            res.status(200).json(fullChat)

        } catch(e){
            console.log(e)
        }
    }

}

module.exports = {accessChat}