import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../UserContext';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const SingleChat = () => {
  const {selectedChat, loggedIn} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const ENDPOINT = "http://localhost:5000"; 
  let socket;

  const fetchChatMessages = async () => {
    if(!selectedChat) return;

    try{
      let { data } = await axios.get(`http://localhost:4000/api/message/${selectedChat._id}`)
      setMessages(data)
    } catch(err){
      console.log(err)
    }

  }

  const sendMessage = async() => {
    try{
      const { messageData } = axios.post('http://localhost:4000/api/message/', {
        messageContent: messageContent,
        chatId: selectedChat
      });

      return ([messageData, ...messages]);

    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", loggedIn);
    socket.on("connected", () => {
      setSocketConnected(true);
    })
  }, [])

  useEffect(() =>{
    fetchChatMessages();

  }, [selectedChat])

  return (
    <div>
        {selectedChat && 
          <>  
            <ScrollableChat messages={messages}/>
            <form onSubmit={sendMessage} >
              <input 
                  type="text" 
                  value={messageContent}
                  placeholder='Enter mesage'
                  onChange={ (e) => setMessageContent(e.target.value)}
                  className='searchInput'
              />
            </form>
          </>
        }
    </div>

  )
  
}

export default SingleChat