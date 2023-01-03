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

      //socket.emit("join chat", selectedChat._id);
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
      return setMessages([...messages, messageData.data]);
      
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

  // useEffect(() => {
  //   socket.on("receive message", (newMessage) => {
  //     console.log(newMessage);
  //     setMessages([...messages, newMessage]);
  //     setMessageContent("");
  //   })
  // })

  useEffect(() =>{
    fetchChatMessages();
    // if(!selectedChat) return;

    // let data = axios.get(`http://localhost:4000/api/message/${selectedChat._id}`);
    // setMessages(data);

    //selectedChatCompare = selectedChat

  }, [selectedChat])

  //  useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connected", () => {
  //     setSocketConnected(true);
  //   })
  // }, [])

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
            <button onClick={() => sendMessage()}>send </button>
          </>
        }
    </div>

  )
  
}

export default SingleChat