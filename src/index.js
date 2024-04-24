import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App  from './App';
import Home from './pages/home';
import { ChakraProvider } from "@chakra-ui/react";
import { tasksLoader } from './components/Home/Home';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>

);

