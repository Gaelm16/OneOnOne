import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Components/LoginPage/Login'
import Register from './Components/RegisterPage/Register'
import MainPage from './Components/Main/MainPage'

const SwitchRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/chats" element={<MainPage/>} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>  

  )
}

export default SwitchRoute