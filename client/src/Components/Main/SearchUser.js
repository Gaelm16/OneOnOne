import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { AuthContext } from '../../UserContext';

const SearchUser = () => {
    const [searchInput, setsearchInput] = useState("");
    const [searchResult, setsearchResult] = useState([]);

    const {setSearchModal} = useContext(AuthContext);

    const fetchSearchedUser = async () => {
        try{
            const { data } = await axios.get(`http://localhost:4000/?search=${searchInput}`);
            setsearchResult(data);
        } catch(e){
            console.log(e);
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
                />
                <button className='button' onClick={fetchSearchedUser}>Search</button>
                <button className='button' onClick={() => setSearchModal(false)}> Cancel </button>
            </div>
        </div>
        {searchResult.map((userData) => {
            console.log(userData)
            return (
                <div key={userData._id} className="myChats-tab"> 
                    <h2 >{userData.userName}</h2>
                    <button className="button">Start Chat</button>
                </div>
            )
               
        })}
    </>
  )
}

export default SearchUser