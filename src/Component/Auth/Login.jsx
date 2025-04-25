import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-center"
            });
            window.location.href = "/userDashBoard";
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-center"
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            {/* Login Form */}
            <div className="bg-white p-8 lg:p-16 rounded-xl shadow-lg max-w-lg w-full relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-30 rounded-xl -z-10"></div>

                <h2 className="text-3xl font-semibold text-center text-purple-800 mb-8">Welcome Back!</h2>

                {/* Input Fields */}
                <div className="space-y-5">
                    {/* Email Input */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full px-6 py-3 rounded-xl text-lg placeholder-gray-500 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 transition duration-300"
                    />
                    {/* Password Input */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-6 py-3 rounded-xl text-lg placeholder-gray-500 bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-500 transition duration-300"
                    />
                </div>

                {/* Login Button */}
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                    >
                        Log In
                    </button>
                </div>

                {/* Sign-up Link */}
                <div className="mt-5 text-center">
                    <span className="text-gray-700">Don't have an account? </span>
                    <Link to="/signup" className="text-purple-600 font-semibold">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
