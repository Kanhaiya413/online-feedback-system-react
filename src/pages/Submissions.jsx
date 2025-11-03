import React from 'react'
import { Link } from 'react-router-dom'

export default function Submissions(){
  const username=localStorage.getItem('currentUser')
  const users=JSON.parse(localStorage.getItem('users'))||{}
  const feedbacks=users[username]?.feedback||[]

  return(
    <div className='p-8'>
      <h2 className='text-2xl font-semibold mb-4'>Previous Feedback - {username}</h2>
      {feedbacks.length===0 && <p>No feedback yet.</p>}
      {feedbacks.map((f,i)=>(
        <div key={i} className='p-4 mb-4 rounded bg-slate-800'>
          <strong>{f.subject}</strong> ({f.faculty})<br/>
          Rating: {f.rating} ⭐<br/>
          Comment: {f.comment}<br/>
          <small>{f.date}</small>
        </div>
      ))}
      <Link to='/dashboard' className='text-blue-400 underline'>← Back to Dashboard</Link>
    </div>
  )
}