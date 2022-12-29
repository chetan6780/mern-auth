import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Auth.css';


const Login = ({ setLoginUser }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ email, password });

        try {
            const res = await axios.post('http://localhost:3001/api/login', body, config);
            setLoginUser(res.data.user);
            navigate('/');
        } catch (err) {
            alert("Invalid Credentials")
        }
    };

    return (
        <div className='container'>
            <h1 className='large'>Sign In</h1>
            <p>Sign into Your Account </p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                />
                <input type='submit' className='btn' value='Login' />
            </form>
            <p > Don't have an account? <Link to='/register'>Sign Up</Link> </p>
        </div>
    );
};

export default Login;
