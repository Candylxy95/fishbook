import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
        <Route path="/" element={<h1></h1>} />
      </Routes>
    </div>
  );
}

export default App;
