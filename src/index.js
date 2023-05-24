import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/styles.css'
import './styles/index.css';

import LoginView from './routes/loginView';
import DashboardView from './routes/dashboardView';
import ProfileEditView from './routes/profileEditView';
import ProfileView from './routes/profileView';
import SignOutView from './routes/signoutView';
import ConfirmEmail from './routes/confirmEmail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<LoginView />} />
      <Route path='/dashboard' element={<DashboardView />} />
      <Route path='/dashboard/profile' element={<ProfileEditView />} />
      <Route path='/signout' element={<SignOutView />} />
      <Route path='u/:username' element={<ProfileView />} />
      <Route path='/confirm_email' element={<ConfirmEmail />} />
    </Routes>
  </BrowserRouter>

);
