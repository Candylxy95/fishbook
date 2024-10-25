import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FishFinderPage from "./components/FishFinderPage";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/fishfinder" element={<FishFinderPage />} />
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
      </Routes>
    </div>
  );
}

export default App;
