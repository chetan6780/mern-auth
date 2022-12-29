import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';


const Profile = ({ user }) => {
    return (
        <div className='container'>
            <h1 className='large'> Profile</h1>
            <p> Your Profile </p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <div className='btn-group'>
                <Link to="/register" className='btn'>Edit</Link>
                <Link to="/logout" className='btn'>Logout</Link>
            </div>
        </div>
    );
};

export default Profile;
