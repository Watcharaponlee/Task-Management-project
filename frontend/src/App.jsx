import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import ProjectPage from "./pages/Project";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainLayout />}>
        <Route path="/project" element={<ProjectPage />} />
      </Route>
    </Routes>
  );
}

export default App;
