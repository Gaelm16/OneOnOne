import React, {useEffect, useContext} from 'react'
import axios from 'axios'
import { chatContext } from '../../UserContext' 

const MyChats = () => {

    const {myChats, setMyChats} = useContext(chatContext);

    const fetchMyChats = async() => {
        try{
            const data = axios.get('http://localhost:4000/api/chat');
            setMyChats(data);
        } catch(e){
            console.log(e)
        }
      
    }

    useEffect(() => {
        fetchMyChats();
    }, [])

  return (
    <div>   
        <div>My Chats</div>
        {myChats.map((chatData) => {
            return(
                <div>
                    
                </div>
            )
        })}
    </div>
  )
}

export default MyChats