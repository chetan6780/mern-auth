import React from 'react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import { useState } from 'react';

const App = () => {
  const [loginUser, setLoginUser] = useState({});
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={
            // if user is logged in, show profile page else show login page
            loginUser._id ? <Profile user={loginUser} /> : <Login setLoginUser={setLoginUser} />
          } />
          <Route path='/register' element={<Register user={loginUser} />} />
          <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
          <Route path='/logout' element={<Logout setLoginUser={setLoginUser} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
