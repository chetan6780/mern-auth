import React from 'react';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Profile name={"chetan"} email={"crp20802@gmail.com"} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>

    </>
  );
};

export default App;
