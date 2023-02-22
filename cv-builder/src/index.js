/*REACT PACKAGES*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/*CSS AND INDEXJS*/
import './index.css';
import MainApp from './main.js';

import CustomisePage from './pages/customisePage';
import CanvasApp from './pages/customisePage2';

/*COMPONENTS AND PAGES*/

import BaseTemplate from './pages/baseTemplate';
import PreviewTemplate from './pages/previewTemplate';
import EditEducation from './cv_section_components/EditEducation';
import EditExperience from './cv_section_components/EditExperience';

/*REACT ROUTER*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <MainApp/> }/>
      <Route path='/cv_template' element={ <BaseTemplate/>  } />
      <Route path='/preview-temaplate' element={ <PreviewTemplate/> } />
      <Route path='/editeducation/:id' element={ <EditEducation/> } />
      <Route path='/editexperience/:id' element={ <EditExperience/> } />
      {/* <Route path='/custom' element={ <CustomisePage/> }/>
      <Route path='/canvas' element={ <CanvasApp/> }/> */}
    </Routes>
  </BrowserRouter>
);
