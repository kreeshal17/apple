import { NavLink, useNavigate } from 'react-router-dom';
import { useUserRole } from './Auth/useUserRole';
import { useState } from 'react';

function Header() {
  const role = useUserRole();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleClick = () => {
    navigate("/Search");
  };
  
  const handlecart = () => {
    navigate("/cart");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkStyle = ({ isActive }) => {
    return `px-3 py-2 rounded-md transition-all duration-300 ${isActive
      ? 'bg-white/90 text-indigo-600 font-medium shadow-sm'
      : 'text-white hover:bg-white/10'
      }`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50">
      {/* Black top bar - hidden on mobile */}
      <div className="w-full bg-black h-2 sm:h-4 md:h-6 lg:h-8 xl:h-10"></div>

      {/* Main header with purple background */}
      <div className="w-full bg-purple-700 shadow-lg">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between py-2 md:py-3">
            {/* Logo - smaller on mobile */}
            <div className="flex items-center">
              <div className="text-white font-bold text-lg sm:text-xl md:text-2xl flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1 sm:mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                <span className="hidden sm:inline">AafnaiBazar</span>
                <span className="sm:hidden">AB</span>
              </div>
            </div>

            {/* Mobile menu button - hidden on desktop */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-1 rounded-md text-white hover:bg-white/20 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>

            {/* Navigation Links - hidden on mobile, shown on desktop */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1 lg:space-x-2 xl:space-x-4 2xl:space-x-6">
                <li>
                  <NavLink to="/" className={navLinkStyle}>
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Search"
                    className={({ isActive }) =>
                      `px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 lg:px-6 rounded-md transition-all duration-300 ${isActive
                        ? 'bg-white text-purple-700 font-medium shadow-sm'
                        : 'bg-white/20 text-white hover:bg-white/30'
                      }`
                    }
                  >
                    Search
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/NewArrival" className={navLinkStyle}>
                    New
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/cart" className={navLinkStyle}>
                    Cart
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/login" className={navLinkStyle}>
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/signup" className={navLinkStyle}>
                    SignUp
                  </NavLink>
                </li>

                {role === "Admin" && (
                  <li>
                    <NavLink to="/AllProduct" className={navLinkStyle}>
                      Add
                    </NavLink>
                  </li>
                )}

                {role === "Admin" && (
                  <li>
                    <NavLink to="/admin" className={navLinkStyle}>
                      Admin
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink to="/userDashBoard" className={navLinkStyle}>
                    User
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
              <button onClick={handleClick} className="p-1 sm:p-1.5 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300">
                <svg
                  className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>

              <button className="p-1 sm:p-1.5 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300">
                <svg
                  className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </button>

              <button onClick={handlecart} className="p-1 sm:p-1.5 md:p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-300 relative">
                <svg
                  className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[8px] sm:text-xs rounded-full h-3 w-3 sm:h-4 sm:w-4 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>

          {/* Mobile menu - shown when hamburger is clicked */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-3">
              <ul className="flex flex-col space-y-2">
                <li>
                  <NavLink 
                    to="/" 
                    className={navLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Search"
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition-all duration-300 ${isActive
                        ? 'bg-white text-purple-700 font-medium shadow-sm'
                        : 'bg-white/20 text-white hover:bg-white/30'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Search
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/NewArrival" 
                    className={navLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    New Arrival
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/cart" 
                    className={navLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/login" 
                    className={navLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink 
                    to="/signup" 
                    className={navLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    SignUp
                  </NavLink>
                </li>

                {role === "Admin" && (
                  <li>
                    <NavLink 
                      to="/AllProduct" 
                      className={navLinkStyle}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Add Product
                    </NavLink>
                  </li>
                )}

                {role === "Admin" && (
                  <li>
                    <NavLink 
                      to="/admin" 
                      className={navLinkStyle}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin
                    </NavLink>
                  </li>
                )}

                <li>
                  <NavLink 
                    to="/userDashBoard" 
                    className={navLinkStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    User Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;