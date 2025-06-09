import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Music from "../pages/Music";
import Location from "../pages/Location";
import More from "../pages/More";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />

        <Route element={<MainLayout />}>
          <Route path="/Music" element={<Music />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/More" element={<More />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
