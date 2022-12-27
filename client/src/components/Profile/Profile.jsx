import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css'

const Profile = ({ name, email }) => {
    return (
        <div className='container'>
            <h1 className='large'> Profile</h1>
            <p> Your Profile </p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <a href="/" className='btn'>Edit</a>
        </div>
    );
};

export default Profile;
