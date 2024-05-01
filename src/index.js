import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Social from "./pages/social";
import Travel from "./pages/travel";
import { ChakraProvider } from "@chakra-ui/react";
import { tasksLoader } from "./components/Travel/Travel";
import Destination_Detail from "./components/Destination/Destination_Detail";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Travel />} />
          <Route path="/social" element={<Social />} />
          <Route path="/detail" element={<Destination_Detail />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
