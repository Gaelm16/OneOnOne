import React, {useContext} from 'react'
import MyChats from './MyChats'
import Navbar from '../Navbar/Navbar'
import ChatBox from './ChatBox'
import SearchUser from './SearchUser'
import { AuthContext } from '../../UserContext'
import Main from './Main.css'

const MainPage = () => {

  const {searchDrawer} = useContext(AuthContext);
  
  return (
    <>
    <Navbar/>
    <div className="main">

  
    {/* <div className='main'> */}
    <MyChats/>
    {searchDrawer && <SearchUser/>}

    <ChatBox/>
    </div>
    {/* </div> */}
    </>
  )
}

export default MainPage