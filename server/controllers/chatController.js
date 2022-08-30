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
                '-passWord'
            )

            res.status(200).json(fullChat)

        } catch(e){
            console.log(e)
        }
    }

}

const fetchMyChats = async (req, res) =>{

    try{
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-passWord")
            //.populate("groupAdmin", "-passWord")
            .populate("lastestMessage")
            .sort({updatedAt: -1})
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "userName"
                })
            })

            res.status(200).send(results)
    } catch(e){
        res.status(400)
        console.log(e)
    }
   
}

const createGroupChat = async(req, res) => {
    if(!req.body.users || !req.body.userName){
        return res.status(400).send({"message": "please fill all missing fields"})
    }

    if(users.length < 2){
        return res.status(400).send({"message": "there needs to be more than 2 people"})
    }

    users.push(req.userName)

    try{
        const newGroup = new Chat({
            chatName: req.body.userName,
            users: users,
            isgroupChat: true,

        })

        const group = await Chat.findOne({_id: newGroup._id})
            .populate("users", "-passWord")
            .populate("groupAdmin", "-passWord")

            res.status(200).send(group)

    }catch(e){
        res.status(400)
        console.log(e)
    }
}

module.exports = {accessChat, fetchMyChats, createGroupChat}