import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FishFinderPage from "./components/FishFinder/FishFinderPage";
import JoinUs from "./components/JoinUs/JoinUs";
import UserProfiles from "./components/Community/UserProfiles";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/fishfinder" element={<FishFinderPage />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/userprofiles" element={<UserProfiles />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/" element={<h1></h1>} />
      </Routes>
    </div>
  );
}

export default App;
