import React, {useState, useContext} from 'react'
import Navbar from '../Navbar/Navbar'
import {Link, Navigate} from 'react-router-dom'
import {AuthContext} from '../../UserContext'
import axios from 'axios'

const Login = () => {
    const [userName, setuserName] = useState('')
    const [passWord, setpassWord] = useState('')

    const {loggedIn, getloggedIn, user, setUser} = useContext(AuthContext)

    const login = async(e) => {
        e.preventDefault()
        try{
            //const data = {userName, passWord}
            let { data } = await axios.post('http://localhost:4000/login', {userName, passWord});
            setUser(data);
            getloggedIn()

        } catch(err){
            console.log('there is an error', err)
        }
        setuserName('')
        setpassWord('')

    }

    if(loggedIn){
        return (<Navigate to='/chats'/>)
    }

  return (
    <div>
        <Navbar/>
            <div className='login-sign'>
                <form >
                <div className='header'>
                    <h3>Login</h3>
                </div>
                <div className='forms'>
                    <div className='margin'>
                        <div className='labeldiv'>
                            <label className='label'>Username</label>
                        </div>
                        <input 
                        type='text'
                        className='form-input'
                        value={userName}
                        placeholder='Enter username'
                        onChange={((e) => setuserName(e.target.value))}
                        />
                    </div>
                    <div className='margin'>
                        <div className='labeldiv'>
                            <label className='label'>Password</label>
                        </div>
                        <input 
                        type='text'
                        className='form-input'
                        value={passWord}
                        placeholder='Enter password'
                        onChange={((e) => setpassWord(e.target.value))}
                        />
                    </div>
                </div>
                <div className='enter-form'>
                    <button className='enter-btn' onClick={login}>Login</button>
                </div>
                </form>
                <div className='enterform'>
                    <p>Don't have an account sign up? 
                        <span>
                            <Link to='/register' className='links-btn'>Here</Link>
                        </span>
                    </p>
                </div>
            </div>
    </div>
  )
}

export default Login