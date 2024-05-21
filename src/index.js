import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Travel from "./pages/travel";
import { ChakraProvider } from "@chakra-ui/react";
import { tasksLoader } from "./components/Travel/Travel";
import Login from "./pages/login"
import ShopReview from "./pages/ShopReview";
import NewDestination from "./pages/newdestination";
import NotFound from "./components/NotFound/NotFound";
import Saved from "./pages/Saved";
import EasyGoing from "./pages/EasyGoing";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Travel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ShopReview/:DestinationId" element={<ShopReview />} />
          <Route path="/NewDestination" element={<NewDestination />} />
          <Route path="/EasyGoing" element={<EasyGoing />} />
          <Route path="/Saved" element={<Saved />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
