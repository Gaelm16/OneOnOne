import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../UserContext';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const SingleChat = () => {
  const {selectedChat, user} = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);

  const ENDPOINT = "http://localhost:4000"; 

  let socket, selectedChatCompare;

  const fetchChatMessages = async () => {
    if(!selectedChat) return;

    try{
      let { data }= await axios.get(`http://localhost:4000/api/message/${selectedChat._id}`);
      setMessages(data); 
       
    } catch(err){
      console.log(err);
    }

  }

  const sendMessage = async() => {
    try{
      const messageData = await axios.post('http://localhost:4000/api/message/', {
        messageContent: messageContent,
        chatId: selectedChat
      });

      console.log(messageData.data);
      setMessageContent('');

      //socket.emit('sendNewMessage', messageData.data);
      setMessages([...messages, messageData.data]);

      socket.emit("sendNewMessage", messageData);
      
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    })
  }, [])

   useEffect(() =>{
    fetchChatMessages();

    selectedChatCompare = selectedChat;
  
  }, [selectedChat])


  useEffect(() => {
      socket = io(ENDPOINT);
      socket.on("receive_Message", (newMessage) => {

      //console.log(newMessage);
      setMessages([...messages, newMessage.data]);
      setMessageContent("");
    })
  })

  return (
    <div>
        {selectedChat && 
          <>  
            <ScrollableChat messages={messages}/>
            {console.log(messages)}
            <form  >
              <input 
                  type="text" 
                  value={messageContent}
                  placeholder='Enter mesage'
                  onChange={ (e) => setMessageContent(e.target.value)}
                  className='searchInput'
              />
            </form>
            <button onClick={() => sendMessage()} className='button'>send </button>
          </>
        }
    </div>

  )
  
}

export default SingleChat