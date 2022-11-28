import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../../UserContext' 
import Main from './Main.css'

const MyChats = () => {
    const {loggedIn, selectedChat, setSelectedChat, myChats, setMyChats} = useContext(AuthContext);

    const getMessageSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].userName : users[0].userName;
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/chat')
        .then(response => setMyChats(response.data))
    }, [])

  return (
    <section className='myChats-tab'>   
        <div className='front'>
            <div className='alignhead'>
                <h1 className='h1'>My Chats</h1>
            </div>

            <div className='align'>
                <div className='single-button-div'>
                    <button className='button'>Search for User</button>
                </div>
                {/* <div className='single-button-div'>
                    <button className='button'>Create Group Chat</button>
                </div> */}
            </div>
            
        </div>

        {myChats ?  (
            <div className="chatTab">
                {myChats.map((chatData) => {
                    {console.log(chatData.latestMessage.messageContent)}
                    return(
                        <article 
                        className='singlechatTab' 
                        key={chatData._id}
                        onClick={() => setSelectedChat(chatData)}
                        >
                        <h4>
                            {!chatData.groupChat 
                                ? getMessageSender(loggedIn, chatData.users)
                                : <h4>{chatData.chatName}</h4>
                            }   
                        </h4>
                        <h4>{chatData.latestMessage.messageContent}</h4>
                        {/* {chatData.latestMessage && (
                            <h4>{chatData.lastestMessage}</h4>                               
                        )}  */}
                        
                        </article>
                    )
                   
                })}
            </div>
        )   
         : ( <div>error</div>)
        }
        
    </section>
  )
}

export default MyChats