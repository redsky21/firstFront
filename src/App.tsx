import React, { lazy, Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';
import FirstPage from './first/FirstPage';
import SignIn from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';

function App() {
  

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn></SignIn>} ></Route>
        <Route path="/login" element={<SignIn></SignIn>} ></Route>
        <Route path="/layout" element={<Layout></Layout>} ></Route>
      </Routes>
      </BrowserRouter>
      
    
  );
}

export default App;
