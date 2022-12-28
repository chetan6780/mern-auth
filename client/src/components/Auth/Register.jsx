import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Register = (loginUser) => {
    console.log(loginUser);
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

                const res = await axios.post('http://localhost:3001/register', body, config);
                console.log(res.data);
                navigate('/');
            } catch (err) {
                console.error(err.response.data);
            }
        }
    };

    const onEdit = async e => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Retrieve the updated user data from the form
        const { name, email, password } = user;
        const loggedUserEmail = loginUser.user.email;
        console.log("mera user edit pe", user)

        // Create the request body
        const body = JSON.stringify({ name, email, password,loggedUserEmail });

        try {
            // Send the "put" request to the server
            const res = await axios.put('http://localhost:3001/edit', body, config);
            console.log('User updated successfully', res.data);
            navigate('/login');
        } catch (err) {
            alert("Incorrect Password")
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
                    minLength='6'
                    required
                />
                {isUserLoggedIn ? null :
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                }
                <input type='submit' className='btn' value={isUserLoggedIn ? 'Save Changes' : 'Register'} />
            </form>
            {isUserLoggedIn ? null : <p > Already have an account? <a href='/login'>Sign In</a> </p>}
        </div>
    )
};

export default Register;