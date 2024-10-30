import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import FishFinderPage from "./components/FishFinder/FishFinderPage";
import JoinUs from "./components/JoinUs/JoinUs";
import UserProfiles from "./components/Community/UserProfiles";
import CreatePostModal from "./components/CreatePostModal";
import UserPokedex from "./components/Community/UserPokedex";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/fishfinder" element={<FishFinderPage />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/userprofiles" element={<UserProfiles />} />
        <Route path="/createpost" element={<CreatePostModal />} />
        <Route path="/userpokedex/:id" element={<UserPokedex />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
