import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Blog from "./Pages/Blog";
import './index.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import AdminPanel from './components/Admin/AdminPanel';
import PostDetail from "./components/Blog/PostDetail";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
