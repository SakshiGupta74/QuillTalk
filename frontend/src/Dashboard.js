import React from 'react';
import logo from './assets/quilltalk-Photoroom.svg';
import image from './assets/content.svg';

import { NavLink, useNavigate } from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate();
const handlelogin = async (e) =>{
  setTimeout(() => {
    navigate('/login')
}, 1000)
}
const handlesignup = async (e) =>{
  setTimeout(() => {
    navigate('/signup')
}, 1000)
}

  return (
    <div className="bg-white">
      <header className="relative inset-x-0 top-0 bottom-0">
        <nav className="flex items-center justify-between p-4 sm:px-4 py-2 bg-grey-800" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="block">
              <img
                className="h-20 w-20 transition-transform transform hover:scale-110 active:scale-90"
                src={logo}
                alt="Logo"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-x-6">
            <a href="#" className="text-black-500 font-semibold hover:underline hover:text-teal-500">
              HOME
            </a>
            <a href="#" className="text-black-500 font-semibold hover:underline hover:text-teal-500">
              CONTACT_US
            </a>
          </div>
        </nav>
      </header>
      <div className="flex items-center justify-center min-h-[87.4vh] bg-teal-500">
  {/* Grey Box */}
  <div className="flex flex-col lg:flex-row items-center justify-between bg-gray-200 rounded-lg shadow-lg p-8 max-w-4xl min-h-[400px] w-full">
    {/* Left Side: Quote and Buttons */}
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-5xl italic font-semibold text-gray-800">
        "Where every post sparks a new conversation"
      </h2>
      <div className="mt-6 flex gap-4 justify-center lg:justify-start">
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white active:bg-blue-700 font-medium" onClick={handlelogin}> 
          LOGIN
        </button>
        <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white active:bg-green-700 font-medium" onClick={handlesignup}>
          SIGNUP
        </button>
      </div>
    </div>

    {/* Right Side: Image */}
    <div className="flex-1 flex justify-center">
      <img
        src={image}
        alt="Right side visual"
        className="max-w-[400px] max-h-[300px] rounded-lg shadow-lg"
      />
    </div>
  </div>
</div>
</div>
  );
}

export default Dashboard;
