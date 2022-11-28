import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './main.js';
import CustomisePage from './pages/customisePage';
import CanvasApp from './pages/customisePage2';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <MainApp/> }/>
      <Route path='/custom' element={ <CustomisePage/> }/>
      <Route path='/canvas' element={ <CanvasApp/> }/>
    </Routes>
  </BrowserRouter>
);
