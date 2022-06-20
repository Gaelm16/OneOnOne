import React, { useState, useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import {AuthContext} from '../../UserContext'
import axios from 'axios'
axios.defaults.withCredentials = true

const Register = () => {
    const [userName, setuserName] = useState('')
    const [passWord, setpassWord] = useState('')

    const {getLoggedIn} = useContext(AuthContext)

    const signUp = async(e) => {
        e.preventDefault()

        try{
            const data = {userName, passWord}
            await axios.post('http://localhost:4000/register', data, {credential: 'include', withCredentials: true})
            getLoggedIn()

        } catch(err) {
            console.log(err)
        }

        setuserName('')
        setpassWord('')
    }
    
  return (
     <div>
        <Navbar/>
        <div className='login-sign'>
            <form >
                <div className='header'>
                    <h3>Sign Up</h3>
                </div>
                <div className='forms'>
                    <div className='margin'>
                        <div className='labeldiv'>
                            <label className='label'>Create Username</label>
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
                        <label className='label'>Create Password</label>
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
                    <button className='enter-btn' onClick={signUp}>Sign up</button>
                </div>
            </form>
            </div>
    </div>
  )
}

export default Register