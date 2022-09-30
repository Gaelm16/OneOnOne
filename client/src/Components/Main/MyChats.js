import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../../UserContext' 
import Main from './Main.css'

const MyChats = () => {
    const {myChats, setMyChats} = useContext(AuthContext);

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
                <div className='single-button-div'>
                    <button className='button'>Create Group Chat</button>
                </div>
            </div>
            
        </div>

        {myChats ?  (
            <div className="chatTab">
                {console.log(myChats)}
                {myChats.map((chatData) => {
                    return(
                        <article 
                        className='singlechatTab' 
                        key={chatData._id}
                        onClick={() => setMyChats(chatData)}
                        >
                        <h4>
                            {!chatData.groupChat 
                                // ? getSender(chatData.users)
                                ? <></>
                                : chatData.chatName
                            }   
                        </h4>
                        <h4>{chatData.chatName}</h4>
                         <h4>
                            {chatData.latestMessage && (
                               <b>{chatData.lastestMessage}</b>
                            )} 
                        </h4>
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