import React from 'react'
import './Auth.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'

const Logout = ({ setLoginUser }) => {
    // logout
    const logout = async () => {
        localStorage.removeItem('token');
        const res = await axios.post('http://localhost:3001/logout');
        setLoginUser({});
    }
    useEffect(() => {
        logout();
    }, [])
    return (
        <div className='container'>
            <h3>You have been logged out!</h3>
            <p>
                Please <Link to="/login" >Login</Link> or <Link to="/register" >Register</Link> to continue...
            </p>
        </div>
    )
}

export default Logout