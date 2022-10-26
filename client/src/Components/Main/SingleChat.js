import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../UserContext'
import axios from 'axios';
import ScrollableChat from './ScrollableChat';

const SingleChat = () => {
  const {selectedChat, setSelectedChat} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');

  const fetchChatMessages = async () => {
    if(!selectedChat) return;

    try{
      let data = await axios.get(`http://localhost:4000/api/message/${selectedChat._id}`)
      setMessages(data.data)
    } catch(err){
      console.log(err)
    }

  }

  useEffect(() =>{
    fetchChatMessages();

  }, [selectedChat])

  return (
    <div>
        SingleChat
        {selectedChat && 
          <ScrollableChat messages={messages}/>

        }
       {console.log(messages)}
        <input 
            type="text" 
            value={messageContent}
            placeholder='Enter mesage'
            onChange={ (e) => setMessageContent(e.target.value)}
        />
    </div>

  )
}

export default SingleChat