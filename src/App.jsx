import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import Blogs from "./pages/Blogs.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
