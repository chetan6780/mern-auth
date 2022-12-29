import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const Logout = ({ setLoginUser }) => {
    // logout
    const logout = async () => {
        const res = await axios.post('http://localhost:3001/api/logout');
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