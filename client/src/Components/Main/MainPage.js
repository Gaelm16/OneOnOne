import React, {useContext, useState} from 'react';
import MyChats from './MyChats';
import Navbar from '../Navbar/Navbar';
import ChatBox from './ChatBox';
import SearchUser from './SearchUser';
import { AuthContext } from '../../UserContext';
import Main from './Main.css';

const MainPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const {searchDrawer, user} = useContext(AuthContext);
  
  return (
    <>
    <Navbar/>
    <div className="main">
      {user && <MyChats fetchAgain={fetchAgain}/>}
      {searchDrawer && <SearchUser/>}
      {user && <ChatBox/>}
    </div>
    </>
  )
}

export default MainPage