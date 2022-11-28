import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../UserContext'
import axios from 'axios';
import ScrollableChat from './ScrollableChat';

const SingleChat = () => {
  const {selectedChat, setSelectedChat, loggedIn} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

    const getMessageSender = (loggedUser, users) => {
      return users[0]._id === loggedUser._id ? users[1].userName : users[0].userName;
    };

    const getSenderFull = (loggedUser, users) => {
      return users[0]._id === loggedUser._id ? users[1] : users[0];
    };

  const fetchChatMessages = async () => {
    if(!selectedChat) return;

    try{
      let data = await axios.get(`http://localhost:4000/api/message/${selectedChat._id}`)
      setMessages(data.data)
    } catch(err){
      console.log(err)
    }

  }

  const sendMessage = async() => {
    try{
      const messageData = axios.post('http://localhost:4000/api/message/', {
        messageContent: messageContent,
        chatId: selectedChat
      });

      return ([messageData, ...messages]);

    } catch(e){
      console.log(e);
    }
  }

  useEffect(() =>{
    fetchChatMessages();

  }, [selectedChat])

  return (
    <div>
        {selectedChat && 
        
          <>  
             {/* {messages && (
              !selectedChat.groupChat ? (
                <>  
                {getSenderFull(loggedIn, selectedChat.users)}
                </>
              ) : (
                <>
                {selectedChat.chatName.toUpperCase()}
                </>
              )
            )} */}
            
            {/* <div>{selectedChat.users}</div> */}
            <ScrollableChat messages={messages}/>
            <form onSubmit={sendMessage}>
              <input 
                  type="text" 
                  value={messageContent}
                  placeholder='Enter mesage'
                  onChange={ (e) => setMessageContent(e.target.value)}
              />
            </form>
          </>
        }
       {/* {console.log(selectedChat)} */}

    </div>

  )
  
}

export default SingleChat