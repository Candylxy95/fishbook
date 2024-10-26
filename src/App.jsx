import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FishFinderPage from "./components/FishFinder/FishFinderPage";
import JoinUs from "./components/JoinUs/JoinUs";
import UserProfiles from "./components/Community/UserProfiles";
import CreatePost from "./components/CreatePost";
import UserPokedex from "./components/Community/UserPokedex";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/fishfinder" element={<FishFinderPage />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/userprofiles" element={<UserProfiles />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/userpokedex/:id" element={<UserPokedex />} />
        <Route path="*" element={<h1>Sailed too far out, head back</h1>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
