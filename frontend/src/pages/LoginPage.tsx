import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login-register.css';
import config from '../config';
import { useAuth } from '../context/UserContext'; 
import TeslaLogo from '../assets/tesla-logo-navbar.png'; 


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useAuth(); 

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${config.API_URL}/api/auth/login`, {
                email,
                password
            });

            const userData = response.data;

            login(userData); 

            navigate(`/`); 

        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Invalid credentials or server error.');
        }
    }

    return (
        <div className="login-page">
            <div className='login-hero-title'>
                <div className="nav-logo">
                    <img src={TeslaLogo} alt="Tesla Logo"/>
                </div>
            </div>

            <div className='login-container'>
                <div className='login-title'>Sign in or Log in to your Account</div>
                <div className='login-form'>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <div>
                                <label className='email-label'>Email:</label>
                            </div>
                            <div>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    placeholder='Enter email ID' 
                                />
                            </div>
                        </div><br />
                        <div className="form-group">
                            <div>
                                <label className='password-label'>Password:</label><br />
                            </div>
                            <div>
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                    placeholder='******' 
                                />
                            </div>
                        </div><br />
                        <button type="submit" className='login-btn'>Login</button>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <Link to="/register" className='register-link'>Don't have an account? Create one here</Link>
                </div>

            </div>

        </div>
    );
}

export default Login;