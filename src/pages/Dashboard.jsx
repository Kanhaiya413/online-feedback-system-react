import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const navigate = useNavigate()
  const username = localStorage.getItem('currentUser')
  const subjects=[
    {subject:'Mathematics', faculty:'Dr. Sharma'},
    {subject:'Physics', faculty:'Dr. Mehta'},
    {subject:'Computer Science', faculty:'Prof. Rao'},
    {subject:'English', faculty:'Dr. Nair'}
  ]
  const [feedback,setFeedback]=useState({})

  const handleRate=(sub,stars)=>{
    setFeedback(prev=>({...prev,[sub]:{...prev[sub],rating:stars}}))
  }

  const handleComment=(sub,text)=>{
    setFeedback(prev=>({...prev,[sub]:{...prev[sub],comment:text}}))
  }

  const saveFeedback=()=>{
    const users=JSON.parse(localStorage.getItem('users'))
    const user=users[username]
    const newFb=Object.entries(feedback).map(([subject,{rating,comment}])=>({
      subject,
      faculty:subjects.find(s=>s.subject===subject).faculty,
      rating,
      comment,
      date:new Date().toLocaleString()
    }))
    user.feedback.push(...newFb)
    users[username]=user
    localStorage.setItem('users',JSON.stringify(users))
    navigate('/submissions')
  }

  return(
    <div className='p-8'>
      <h2 className='text-2xl font-semibold mb-6'>Welcome, {username}</h2>
      <div className='grid gap-6'>
        {subjects.map(s=>(
          <div key={s.subject} className='p-4 rounded bg-slate-800'>
            <h3 className='text-xl font-bold'>{s.subject}</h3>
            <p className='text-sm text-gray-400 mb-2'>Faculty: {s.faculty}</p>
            <div className='flex gap-1 mb-2'>
              {[1,2,3,4,5].map(star=>(
                <span key={star} onClick={()=>handleRate(s.subject,star)} className={`cursor-pointer text-2xl ${feedback[s.subject]?.rating>=star?'text-yellow-400':'text-gray-500'}`}>★</span>
              ))}
            </div>
            <textarea className='w-full p-2 text-black rounded' placeholder='Write a comment...' onChange={e=>handleComment(s.subject,e.target.value)}></textarea>
          </div>
        ))}
      </div>
      <button onClick={saveFeedback} className='mt-6 px-6 py-2 bg-green-600 rounded hover:bg-green-700'>Submit Feedback</button>
    </div>
  )
}