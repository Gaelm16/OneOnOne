import React, { createContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext();
export const chatContext = createContext();

const UserContext = ({children}) => {
    const [loggedIn, setloggedIn] = useState(false);
    const [selectedChat, setSelectedChat]  = useState();
    const [myChats, setMyChats] = useState([]);
    
    let navigate = useNavigate()

    const getloggedIn = async () => {
        const loggedInResponse = await axios.get('http://localhost:4000/loggedIn')
        setloggedIn(loggedInResponse.data)
    }

    const logOut = async() => {
        await axios.get('http://localhost:4000/logout')
        await getloggedIn()
        navigate('/')
    }

    useEffect(() => {
        getloggedIn()
    },[])
    
    return (
        <AuthContext.Provider value={{loggedIn, getloggedIn, logOut, myChats, setMyChats, selectedChat, setSelectedChat}}>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext