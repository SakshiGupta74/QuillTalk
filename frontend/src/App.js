import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard';
import AllBlog from './AllBlog.js';
import MyBlog from './MyBlog.js';
import Profile from './Profile.js';
import CreateBlog from './CreateBlog.js';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/AllBlog" element={<AllBlog />}/>
        <Route path="/MyBlog" element={<MyBlog />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/CreateBlog" element={<CreateBlog/>}/>
      </Routes>
    </Router>
  );
}

export default App;
