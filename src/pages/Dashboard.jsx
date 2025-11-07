import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const username = localStorage.getItem('currentUser')

  const subjects = [
    { subject: 'Mathematics', faculty: ['Dr. Sharma', 'Prof. Karan'] },
    { subject: 'Physics', faculty: ['Dr. Mehta', 'Dr. Goyal'] },
    { subject: 'Computer Science', faculty: ['Prof. Rao', 'Dr. Sen'] },
    { subject: 'English', faculty: ['Dr. Nair'] }
  ]

  const [feedback, setFeedback] = useState({})
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const handleRate = (sub, fac, stars) => {
    const key = `${sub}-${fac}`
    setFeedback(prev => ({
      ...prev,
      [key]: { ...prev[key], rating: stars }
    }))
  }

  const handleComment = (sub, fac, text) => {
    const key = `${sub}-${fac}`
    setFeedback(prev => ({
      ...prev,
      [key]: { ...prev[key], comment: text }
    }))
  }

  const saveFeedback = () => {
    const users = JSON.parse(localStorage.getItem('users'))
    const user = users[username]

    const key = `${selected.subject}-${selected.faculty}`
    const data = feedback[key]

    if (!data?.rating || !data?.comment) {
      alert("Please give rating and comment")
      return
    }

    const newEntry = {
      subject: selected.subject,
      faculty: selected.faculty,
      rating: data.rating,
      comment: data.comment,
      date: new Date().toLocaleString()
    }

    user.feedback.push(newEntry)
    users[username] = user
    localStorage.setItem('users', JSON.stringify(users))
    navigate('/submissions')
  }

  const expandedList = subjects.flatMap(s =>
    s.faculty.map(fac => ({
      subject: s.subject,
      faculty: fac
    }))
  )

  const filteredList = expandedList.filter(item =>
    item.subject.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Welcome, {username}</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search subject..."
        className="p-2 rounded text-black w-full mb-3"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Search result list */}
      <div className="bg-slate-800 rounded p-3 mb-6">
        {filteredList.length === 0 && (
          <p className="text-gray-400">No subjects found.</p>
        )}

        {filteredList.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item)}
            className={`p-2 rounded mb-2 cursor-pointer ${
              selected &&
              selected.subject === item.subject &&
              selected.faculty === item.faculty
                ? 'bg-blue-600'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            {item.subject}  
            <span className="text-gray-400"> ({item.faculty})</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className="p-4 rounded bg-slate-900">
          <h3 className="text-xl font-bold">{selected.subject}</h3>
          <p className="text-sm text-gray-400 mb-2">Faculty: {selected.faculty}</p>

          {/* STAR RATING */}
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(star => {
              const key = `${selected.subject}-${selected.faculty}`
              return (
                <span
                  key={star}
                  onClick={() =>
                    handleRate(selected.subject, selected.faculty, star)
                  }
                  className={`cursor-pointer text-2xl ${
                    feedback[key]?.rating >= star
                      ? 'text-yellow-400'
                      : 'text-gray-500'
                  }`}
                >
                  ★
                </span>
              )
            })}
          </div>

          <textarea
            className="w-full p-2 text-black rounded"
            placeholder="Write a comment..."
            onChange={e =>
              handleComment(
                selected.subject,
                selected.faculty,
                e.target.value
              )
            }
          />

          <button
            onClick={saveFeedback}
            className="mt-4 px-6 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  )
}
