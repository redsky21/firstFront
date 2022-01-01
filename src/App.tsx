import React, { lazy, Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';
import FirstPage from './first/FirstPage';
import SignIn from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn></SignIn>} ></Route>
        
      </Routes>
      </BrowserRouter>
      
    
  );
}

export default App;
