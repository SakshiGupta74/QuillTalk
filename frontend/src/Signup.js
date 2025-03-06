import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils.js';
import "react-toastify/dist/ReactToastify.css";

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    console.log('signup info->', signupInfo);

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:4000/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        
        <div className="flex items-center justify-center min-h-screen bg-teal-500">
            <div className="bg-gray-200 shadow-lg rounded-lg p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Signup</h1>
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            autoFocus
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            value={signupInfo.email}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-700"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            value={signupInfo.password}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition duration-300"
                    >
                        Signup
                    </button>
                    <div className="text-center text-sm text-gray-600">
                        <span>Already have an account ?
                            <Link to="/login" className="text-teal-500 hover:underline">Login</Link>
                        </span>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Signup