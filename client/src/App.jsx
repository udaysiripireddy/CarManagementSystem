import React from 'react';
import './index.css';  // or your appropriate CSS file

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import List from './components/List'
import Docs from './components/docs';
const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true, 
        v7_relativeSplatPath: true, 
      }}
    >
      <Routes>
        
        <Route path="/" element={<Signup />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/List" element={<List />} />
        <Route path="/docs" element={<Docs />} /> 
       
      </Routes>
    </Router>
  );
};

export default App;
