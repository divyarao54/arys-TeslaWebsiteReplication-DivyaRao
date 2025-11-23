import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import TeslaLogo from '../assets/tesla-logo-navbar.png'; 
import { useAuth } from '../context/UserContext'; // Renamed context import
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar: React.FC = () => {
    // Corrected context hook use (assuming you renamed the file/context)
    const { user, logout } = useAuth(); 
    
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

    const toggleMenu = () => {
        setIsUserPopupOpen(false);
        setIsMenuActive(!isMenuActive);
    };

    const closeMenu = () => {
        // We will now close the popup whenever the main menu closes
        setIsUserPopupOpen(false);
        setIsMenuActive(false);
    };

    const handleUserIconClick = () => {
        // On mobile, the nav-menu is already open. We only toggle the popup.
        if (user.isLoggedIn) {
            setIsUserPopupOpen(!isUserPopupOpen);
        } else {
            // If redirecting, we should close the menu first for a cleaner transition
            setIsMenuActive(false);
            window.location.href = '/login'; 
        }
    };
    
    const handleLogout = () => {
        logout();
        setIsUserPopupOpen(false);
    }

    // ... (useEffect for scroll lock remains the same) ...

    return (
      <div className="header-outer-container">
        <header className="header">
            <nav className="navbar">
                <div className="nav-logo">
                    <img src={TeslaLogo} alt="Tesla Logo"/>
                </div>
                
                <ul className={`nav-menu ${isMenuActive ? "active" : ""}`}>
                    {/* Standard Links */}
                    <li className="nav-item">
                        <a href="/" className="nav-link" onClick={closeMenu}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/products" className="nav-link" onClick={closeMenu}>Products</a>
                    </li>
                    <li className="nav-item">
                        <a href="/customize" className="nav-link" onClick={closeMenu}>Customize</a>
                    </li>
                    
                    {/* 🔑 MOVED: Account Section is now a list item within the menu */}
                    <li className="nav-item nav-account-item">
                        <div className="nav-account-section">
                            <button 
                                className="nav-user-icon-button" 
                                onClick={handleUserIconClick}
                                aria-label={user.isLoggedIn ? "Account Information" : "Login"}
                            >
                                <span className="user-icon-label">{user.isLoggedIn ? user.name : "Account"}</span>
                                <FaUserCircle size={24} /> 
                            </button>
                        </div>
                    </li>
                    {/* 🔑 MOVED: Place the popup inside the header-outer-container (as it was) 
                       BUT we will use CSS to position it relative to the icon. 
                       We will use the existing popup structure but adjust its position in CSS.
                    */}
                </ul>

                {/* The Mobile Menu Toggle Button remains outside the nav-menu */}
                <button 
                    className={`menu ${isMenuActive ? "active" : ""}`} 
                    onClick={toggleMenu}
                >
                    Menu
                </button>
            </nav>
        </header>
        {/* 🔑 POPUP REMAINS HERE for better z-index control outside the nav-menu flow */}
        {user.isLoggedIn && isUserPopupOpen && (
            <div className="user-popup">
                <div className="user-popup-heading">Account</div>
                <div className="user-info">
                    <p><strong>Name:</strong> {user.name ?? 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email ?? 'N/A'}</p>
                </div>
                <button className="user-popup-logout" onClick={handleLogout}>Logout</button>
            </div>
        )}
      </div>
    );
};

export default Navbar;