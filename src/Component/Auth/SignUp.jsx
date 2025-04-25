import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { auth, db } from './firebase';
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';

function SignUp() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        imageUrl: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "krishal");
        data.append("cloud_name", "dgfuwtqbk");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dgfuwtqbk/image/upload", {
                method: "POST",
                body: data
            });
            const result = await res.json();

            if (res.ok) {
                setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
                toast.success("Image uploaded successfully!");
            } else {
                throw new Error(result.error?.message || "Image upload failed");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullname || !formData.email || !formData.password) {
            toast.error("Please fill all fields", { position: "top-center" });
            return;
        }

        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                email: formData.email,
                fullname: formData.fullname,
                imageUrl: formData.imageUrl,
                // Note: You shouldn't store passwords in Firestore
                createdAt: new Date().toISOString()
            });

            toast.success("User registered successfully!", { position: "top-center" });
            window.location.href="/userDashBoard"
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gray-50'>
            <div className="login_Form bg-white px-6 lg:px-8 py-8 border border-gray-200 rounded-xl shadow-md w-full max-w-md">
                <div className="mb-6 text-center">
                    <h2 className='text-3xl font-bold text-pink-600'>Create Account</h2>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            placeholder='Full Name'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email Address'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500'
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Profile Picture (Optional)
                        </label>
                        <input
                            type="file"
                            onChange={handleFile}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-pink-50 file:text-pink-700
                                hover:file:bg-pink-100"
                        />
                    </div>

                    <div className="mb-5">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-pink-600 font-semibold hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;