import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/styles.css'
import './styles/index.css';

import LoginView from './routes/loginView';
import DashboardView from './routes/dashboardView';
import ProfileEditView from './routes/profileEditView';
import ProfileView from './routes/profileView';
import SignOutView from './routes/signoutView';
import ConfirmEmail from './routes/confirmEmail'
import Habilidades from './routes/habilidades';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path='/home' element={<DashboardView />} />
      <Route path='/profile' element={<ProfileView />} />
      <Route path='/signout' element={<SignOutView />} />
      <Route path='/habilidades' element={<Habilidades />} />
      <Route path='/profile' element={<ProfileEditView />} />
      <Route path='/confirm_email' element={<ConfirmEmail />} />
    </Routes>
  </BrowserRouter>

);
