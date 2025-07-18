import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./pages/Header";
import Sbar from "./pages/Sbar";
import Home from "./pages/Home";
import VocSearch from "./pages/VocSearch";

function App() {
  const [count, setCount] = useState(0);
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div className="flex flex-1">
          <div className="w-64 flex-shrink-0">
            <Sbar />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<VocSearch />} />
              <Route path="/register" element={<div className="p-4"><h1>VOC 등록 페이지</h1></div>} />
              <Route path="/manage" element={<div className="p-4"><h1>VOC 관리 페이지</h1></div>} />
              <Route path="/report" element={<div className="p-4"><h1>Report 페이지</h1></div>} />
              <Route path="/users" element={<div className="p-4"><h1>사용자 관리 페이지</h1></div>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
