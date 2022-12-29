import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = (loginUser) => {
    const navigate = useNavigate();
    const isUserLoggedIn = loginUser.user._id ? true : false;
    const [user, setUser] = useState({
        name: loginUser.user.name || '',
        email: loginUser.user.email || '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // check password with regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number');
        } else {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
            } else {
                const newUser = {
                    name,
                    email,
                    password
                };

                try {
                    const config = {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    const body = JSON.stringify(newUser);

                    const res = await axios.post('http://localhost:3001/api/register', body, config);
                    navigate('/');
                } catch (err) {
                    alert(err.response.data.message)
                    console.error("Something went wrong", err.response.data.message);
                }
            }
        }
    };

    const onEdit = async e => {
        e.preventDefault();
        // check password with regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number');
        } else {
            if (password !== confirmPassword) {
                alert('Passwords do not match');
            } else {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const { name, email, password } = user;
                const loggedUserEmail = loginUser.user.email;
                const body = JSON.stringify({ name, email, password, loggedUserEmail });

                try {
                    const res = await axios.put('http://localhost:3001/api/edit', body, config);
                    navigate('/login');
                } catch (err) {
                    console.log(err)
                    const errMessage = err.response.data.message || 'Something went wrong';
                    alert(errMessage);
                }
            }
        }
    };


    return (
        <div className='container'>
            <h1 className='large'>
                {isUserLoggedIn ? "Edit" : "Register"}
            </h1>
            <p> {isUserLoggedIn ? "Edit your information" : "Create Your Account"}  </p>
            <form className='form' onSubmit={e => {
                isUserLoggedIn ? onEdit(e) : onSubmit(e);
            }}>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={e => onChange(e)}
                    required
                />
                <input
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={e => onChange(e)}
                    required
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={e => onChange(e)}
                />
                <input type='submit' className='btn' value={isUserLoggedIn ? 'Save Changes' : 'Register'} />
            </form>
            {isUserLoggedIn ? null : <p > Already have an account? <Link to='/login'>Sign In</Link> </p>}
        </div>
    )
};

export default Register;