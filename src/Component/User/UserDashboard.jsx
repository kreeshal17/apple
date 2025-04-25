import React, { useEffect, useState } from 'react';
import { auth,db } from '../Auth/firebase';
import { doc, getDoc } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiShoppingBag, FiUser, FiChevronRight } from 'react-icons/fi';
import { LogOut } from 'lucide-react';

const UserDashboard = () => {
    const [userDetail, setUserDetail] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const dbref = await getDoc(doc(db, "users", user.uid));
                if (dbref.exists()) {
                    setUserDetail(dbref.data());
                }
            }
        });
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Gradient Header */}
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 pb-32 pt-16 px-6">
                {/* Floating Logout Button */}
                <button
                    onClick={handleLogout}
                    className="absolute top-6 right-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    <FiLogOut className="text-lg" />
                    <span className="font-medium">Logout</span>
                </button>

                {/* User Profile */}
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <img
                            src={userDetail?.imageUrl || 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                            alt="User"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white/80 shadow-xl group-hover:border-pink-300 transition-all duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                            <div className="bg-purple-500 text-white p-1 rounded-full">
                                <FiUser className="text-sm" />
                            </div>
                        </div>
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-white">{userDetail?.fullname || "Guest User"}</h1>
                    <p className="text-white/90">{userDetail?.email || "loading@example.com"}</p>
                    <br>
                    </br>
                    <button onClick={handleLogout} className="relative inline-block px-6 py-3 text-white font-semibold uppercase tracking-wider bg-white/10 border border-white/20 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-pink-500/40 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:border-transparent">
      <span className="relative z-10">LogOut</span>
      <span className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 blur-lg"></span>
    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-6 -mt-16">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Orders</p>
                        <p className="text-2xl font-bold text-purple-600">12</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Wishlist</p>
                        <p className="text-2xl font-bold text-pink-500">5</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">Coupons</p>
                        <p className="text-2xl font-bold text-indigo-500">3</p>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FiShoppingBag className="text-purple-600" />
                                
                        </h2>
                    </div>

                    
                    
                    {/* Order Item */}
                    <div className="divide-y divide-gray-100">
                        <div className="p-5 hover:bg-gray-50 transition cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">#74557994327</p>
                                    <p className="text-sm text-gray-500">4 March, 2023</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Delivered</span>
                                    <span className="text-lg font-bold text-gray-900">₹61,999</span>
                                    <FiChevronRight className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Second Order */}
                        <div className="p-5 hover:bg-gray-50 transition cursor-pointer">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">#83451234987</p>
                                    <p className="text-sm text-gray-500">12 February, 2023</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Shipped</span>
                                    <span className="text-lg font-bold text-gray-900">₹24,499</span>
                                    <FiChevronRight className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Preview */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden p-5 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Last Purchased Item</h3>
                    <div className="flex gap-4">
                        <img 
                            src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png" 
                            alt="Nike Shoes" 
                            className="w-20 h-20 object-contain rounded-lg border border-gray-200"
                        />
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">Nike Air Force 1 07 LV8</h4>
                            <p className="text-sm text-gray-600 mb-2">Color: Orange | Size: 10</p>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-purple-600">₹61,999</span>
                                <button className="text-sm text-white bg-purple-600 px-3 py-1 rounded-full hover:bg-purple-700 transition">
                                    Buy Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};  

export default UserDashboard;