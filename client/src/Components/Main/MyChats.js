import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../../UserContext' 

const MyChats = () => {

    const {myChats, setMyChats} = useContext(AuthContext);

    const fetchMyChats = async() => {
        try{
            const data = await axios.get('http://localhost:4000/api/chat');
            setMyChats(data.response)
        } catch(e){
            console.log(e)
        }
      
    }

    // useEffect(() => {
    //     fetchMyChats();
    // }, [])

    useEffect(() => {
        axios.get('http://localhost:4000/api/chat')
        .then(response => setMyChats(response.data))
    }, [])

  return (
    <section>   
        <div>
            <div>My Chats</div>
            <div>
                <button>Search for User</button>
                <button>Create Group Chat</button>
            </div>
        </div>

        {myChats ?  (
            <div>
                {console.log(myChats)}
                {myChats.map((chatData) => {
                    <article key={chatData._id}>
                        <h4>
                            {!chatData.groupChat 
                                // ? getSender(chatData.users)
                                ? <>hello</>
                                : chatData.chatName 
                            }   
                        </h4>
                         <h4>
                            {chatData.latestMessage && (
                               <b>{chatData.lastestMessage}</b>
                            )} 
                        </h4>
                    </article>
                })}
            </div>
        )   
         : ( <div>error</div>)
        }
        
    </section>
  )
}

export default MyChats