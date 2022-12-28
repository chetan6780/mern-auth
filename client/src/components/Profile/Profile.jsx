import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';

const Profile = ({user}) => {
    console.log("user", user)
    return (
        <div className='container'>
            <h1 className='large'> Profile</h1>
            <p> Your Profile </p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <Link to="/register" className='btn'>Edit</Link>
        </div>
    );
};

export default Profile;
