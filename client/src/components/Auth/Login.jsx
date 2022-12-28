import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from "react-router-dom"


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
            const res = await axios.post('http://localhost:3001/login', body, config);
            console.log("logged in", res.data)
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
                    minLength='6'
                    required
                />
                <input type='submit' className='btn' value='Login' />
            </form>
            <p > Don't have an account? <a href='/register'>Sign Up</a> </p>
        </div>
    );
};

export default Login;
