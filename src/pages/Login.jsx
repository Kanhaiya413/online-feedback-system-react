import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username,setUsername] = useState('')
  const navigate = useNavigate()

  const handleLogin=()=>{
    const users = JSON.parse(localStorage.getItem('users')) || {}
    if(!users[username]) users[username] = {name:username, feedback:[]}
    localStorage.setItem('users',JSON.stringify(users))
    localStorage.setItem('currentUser',username)
    navigate('/dashboard')
  }

  return(
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h1 className='text-3xl font-bold'>Online Feedback System</h1>
      <input className='p-2 text-black rounded' value={username} onChange={e=>setUsername(e.target.value)} placeholder='Enter your name'/>
      <button onClick={handleLogin} className='px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'>Login / Sign Up</button>
    </div>
  )
}