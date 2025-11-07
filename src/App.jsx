import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Submissions from './pages/Submissions.jsx';
import JsonSaver from './pages/JsonSaver.jsx';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/submissions' element={<Submissions />} />
        <Route path='/json-saver' element={<JsonSaver />} />
      </Routes>
    </HashRouter>
  );
}
