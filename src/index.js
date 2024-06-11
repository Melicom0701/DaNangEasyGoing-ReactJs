import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Travel from "./pages/travel";
import { ChakraProvider } from "@chakra-ui/react";
import { tasksLoader } from "./components/Travel/Travel";
import Login from "./pages/login";
import ShopReview from "./pages/ShopReview";
import NewDestination from "./pages/newdestination";
import NotFound from "./components/NotFound/NotFound";
import Saved from "./pages/Saved";
import EasyGoing from "./pages/EasyGoing";
import Register from "./pages/register";
import ProfileEdit from "./pages/ProfileEdit";
const root = ReactDOM.createRoot(document.getElementById("root"));
//check if the user is logged in
const token = localStorage.getItem("token");
const API = process.env.REACT_APP_ENDPOINT + "user/me";
const requestOption = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
await fetch(API, requestOption)
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      localStorage.removeItem("token");
    }
  })
  .catch((err) => {
    console.log(err);
  });

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Travel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/ShopReview/:DestinationId" element={<ShopReview />} />
          <Route path="/NewDestination" element={<NewDestination />} />
          <Route path="/EasyGoing" element={<EasyGoing />} />
          <Route path="/Saved" element={<Saved />} />
          <Route path="/Profile-Edit" element={<ProfileEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
