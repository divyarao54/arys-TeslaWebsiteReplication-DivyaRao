import React, { useState } from "react";
import "../styles/navbar.css";
import TeslaLogo from '../assets/tesla-logo-navbar.png'; 
import { useAuth } from '../context/UserContext'; // Renamed context import
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar: React.FC = () => {
    const { user, logout } = useAuth(); 
    
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

    const toggleMenu = () => {
        setIsUserPopupOpen(false);
        setIsMenuActive(!isMenuActive);
    };

    const closeMenu = () => {
        setIsUserPopupOpen(false);
        setIsMenuActive(false);
    };

    const handleUserIconClick = () => {
        if (user.isLoggedIn) {
            setIsUserPopupOpen(!isUserPopupOpen);
        } else {
            setIsMenuActive(false);
            window.location.href = '/login'; 
        }
    };
    
    const handleLogout = () => {
        logout();
        setIsUserPopupOpen(false);
    }


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
                </ul>

                <button 
                    className={`menu ${isMenuActive ? "active" : ""}`} 
                    onClick={toggleMenu}
                >
                    Menu
                </button>
            </nav>
        </header>
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