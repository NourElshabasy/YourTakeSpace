import { StrictMode, useState } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css';
import App from './App.jsx';
import Create from './pages/Create.jsx';
import Details from './pages/Details.jsx';
import Edit from './pages/Edit.jsx';

const Root = () => {
  const [query, setQuery] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App query={query} setQuery={setQuery} />} />
        <Route path="/create" element={<Create setQuery={setQuery} />} />
        <Route path="/edit/:id" element={<Edit setQuery={setQuery} />} />
        <Route path="/details/:id" element={<Details setQuery={setQuery} />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
