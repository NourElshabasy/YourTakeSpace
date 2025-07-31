import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css'
import App from './App.jsx'
import Create from './pages/Create.jsx';
import Details from './pages/Details.jsx';
import Edit from './pages/Edit.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/details/:id" element={<Details/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
