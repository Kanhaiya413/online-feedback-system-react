import React, { useState } from 'react'

export default function JsonSaver(){
  const [data,setData]=useState(localStorage.getItem('users')||'{}')

  const saveJson=()=>{
    localStorage.setItem('users',data)
    alert('Data saved!')
  }

  return(
    <div className='p-8'>
      <h2 className='text-2xl font-semibold mb-4'>JSON Saver</h2>
      <textarea className='w-full h-96 text-black p-2 rounded' value={data} onChange={e=>setData(e.target.value)}></textarea>
      <button onClick={saveJson} className='mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700'>Save</button>
    </div>
  )
}