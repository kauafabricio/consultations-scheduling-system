import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Painel from './pages/painel';
import Admin from './pages/admin'
import './all.css';

const domRoot = document.getElementById('root');
const root = createRoot(domRoot);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entrar" element={<Login />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </Router>,
);
