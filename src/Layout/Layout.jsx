import React from 'react'
import Header from '../Component/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Component/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout({ Children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
                <Outlet /> {/* This will render your page content */}
            </main>
            <ToastContainer />
            <Footer />
        </div>
    )
}

export default Layout