import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App  from './App';
import Social from './pages/social';
import Travel from './pages/travel';
import { ChakraProvider } from "@chakra-ui/react";
import { tasksLoader } from './components/Travel/Travel';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Travel />} />
          <Route path="/social" element={<Social />} />
        </Routes>
        
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>

);

