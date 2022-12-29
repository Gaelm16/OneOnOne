import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { AuthContext } from '../../UserContext';

const SearchUser = () => {
    const [searchInput, setsearchInput] = useState("");
    const [searchResult, setsearchResult] = useState([]);

    const {setSearchModal, setSelectedChat, myChats, setMyChats} = useContext(AuthContext);

    const fetchSearchedUser = async () => {
        try{
            const { data } = await axios.get(`http://localhost:4000/?search=${searchInput}`);
            setsearchResult(data);
        } catch(e){
            console.log(e);
        }
    }

    const accessChat = async (userId) => {
        try{
            const newChat = await axios.post('http://localhost:4000/api/chat', {userId});

            if(!myChats.find((c) => c._id === newChat._id)){
                setMyChats([...myChats, newChat]);
            }

            setSelectedChat(newChat);
            setSearchModal(false);

        } catch(e){
            console.log(e)
        }
       
    }

  return (
    <> 
        <div className='SearchModal'>
            <h3>SearchUser</h3>
            <div className="inline">
                <input 
                type="text" 
                placeholder="search user..."
                value={searchInput}
                onChange={(e) => setsearchInput(e.target.value)}
                className='searchInput'
                />
                <button className='button' onClick={fetchSearchedUser}>Search</button>
                <button className='button' onClick={() => setSearchModal(false)}> Cancel </button>
            </div>
    
        <div className="searchResults-tab">
        {searchResult.map((userData) => {
            console.log(userData)
            return (
                <div key={userData._id} className="searchResults"> 
                    <div className="user">
                        <p >{userData.userName}</p>    
                    </div>
                    
                    <button className='button' onClick={() => accessChat(userData._id)}>Start Chat</button>
                </div>
            )  
         })}
        </div>
        </div>
    </>
  )
}

export default SearchUser