import React from 'react'
import MyChats from './MyChats'
import Navbar from '../Navbar/Navbar'
import ChatBox from './ChatBox'
import SearchUser from './SearchUser'

const MainPage = () => {
  const [searchDrawer, setSearchModal] = useState(false);
  return (
    <>
    <Navbar/>
    {/* <div className='main'> */}
    <MyChats/>
    {searchDrawer && <SearchUser/>}
    <ChatBox/>
    {/* </div> */}
    </>
  )
}

export default MainPage