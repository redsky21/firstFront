import React, { lazy, Suspense, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';
import FirstPage from './first/FirstPage';
import SignIn from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PubInfo from './pages/PubInfo';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { observer } from 'mobx-react';

function App() {
  return (
    <RecoilRoot>
      <PubInfo />
    </RecoilRoot>
  );
}

export default App;
