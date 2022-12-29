import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';


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
