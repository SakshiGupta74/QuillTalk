import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils.js';
import MyBlog from './AllBlog.js';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = `http://localhost:4000/auth/login`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error,userId } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                console.log(localStorage.setItem('userId', userId)); // Store userId
                console.log('UserId stored:', userId); 
                
                setTimeout(() => {
                    navigate('/MyBlog');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details || 'An error occurred');
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-teal-500">
            <div className="bg-gray-200 shadow-lg rounded-lg p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            value={loginInfo.email}
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
                            value={loginInfo.password}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition duration-300" 
                    >
                        Login
                    </button>
                    <div className="text-center text-sm text-gray-600">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-teal-500 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
