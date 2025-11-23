import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login-register.css';
import config from '../config';
import TeslaLogo from '../assets/tesla-logo-navbar.png'; 


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e:any) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${config.API_URL}/api/auth/register`, {
                name,
                email,
                password,
            });


            localStorage.setItem('token', response.data.token);

            navigate(`/`);

        } catch (err:any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    }

    return (
        <div className="register-page">
            <div className='register-hero-title'>
                <div className="nav-logo">
                    <img src={TeslaLogo} alt="Tesla Logo"/>
                </div>
            </div>

            <div className="register-container">
            <div className="register-title">Register with us</div>
            <div className='register-form'>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="register-name-label">Name:</label>
                        <input id="register-name" type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Enter name"/>
                    </div>
                    <div className="form-group">
                        <label className="register-email-label">Email:</label>
                        <input id="register-email" type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Enter email ID"/>
                    </div>
                    <div className="form-group">
                        <label className="register-password-label">Password:</label>
                        <input id="register-password" type="password" value={password} required onChange={(e) => setPassword(e.target.value)} placeholder="******"/>
                    </div>
                    <button type="submit" className="register-btn">Register</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
                <Link to="/login" className='login-link'>Already have an account? Login here</Link>
            </div>
        </div>
    </div>
  );
}  

export default Register;