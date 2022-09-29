import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
//import ChatsHome from './Components/Main/ChatsHome'
import Login from './Components/LoginPage/Login'
import Register from './Components/RegisterPage/Register'
import MyChats from './Components/Main/MyChats'
import MainPage from './Components/Main/MainPage'
// import Navbar from './Components/Navbar/Navbar'
// import Navbar from '../Navbar/Navbar'

const SwitchRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      {/* <Route exact path="/chats" element={<ChatsHome/>} /> */}
      {/* <Route exact path="/chats" element={<MyChats/>} /> */}
      <Route exact path="/chats" element={<MainPage/>} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>  

  )
}

export default SwitchRoute