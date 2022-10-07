import React from 'react'
import MyChats from './MyChats'
import Navbar from '../Navbar/Navbar'
import ChatBox from './ChatBox'

const MainPage = () => {
  return (
    <>
    <Navbar/>
    <div className='main'>
    <MyChats/>
    <ChatBox/>
    </div>
    </>
  )
}

export default MainPage