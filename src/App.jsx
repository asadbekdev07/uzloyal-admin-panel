import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Categories from "./pages/Categories.jsx";
import Faqs from "./pages/Faqs.jsx";
import News from "./pages/News.jsx";
import Blogs from "./pages/Blogs.jsx";
import Login from "./pages/Login.jsx";
import Services from "./pages/Services.jsx"
import Sources from "./pages/Sources.jsx"
import { ToastContainer } from "react-toastify";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token?.length > 27) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/categories" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          element={isLoggedIn ? <Sidebar /> : <Navigate to="/" />}
        >
          <Route path="/categories" element={<Categories />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/news" element={<News />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sources" element={<Sources />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
