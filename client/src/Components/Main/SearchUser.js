import React, {useEffect, useState} from 'react'
import axios from 'axios'

const SearchUser = () => {
    const [searchInput, setsearchInput] = useState("");
    const [searchResult, setsearchResult] = useState([]);

    const fetchSearchedUser = async () => {
        try{
            const data = axios.get(`http://localhost:4000/search?=${input}`);
            setsearchResult(data);
        } catch(e){
            console.log(e);
        }
    }

    
  return (
    <> 
        <div>
            <h1>SearchUser</h1>
            <input 
            type="text" 
            placeholder="search user..."
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
            />
            <button className='button'>Search</button>
        </div>
    </>
  )
}

export default SearchUser