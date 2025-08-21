import { registerLicense } from "@syncfusion/ej2-base";
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-react-grids/styles/material.css';
import axios from "axios";
import { useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ClientView from "./ClientView/clientView";
import GenericGrid from "./Common/GenericGrid/genericGrid";
import AboutDetails from "./Components/AboutDetails";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Sidebar from "./Components/sidebar";
import Unauthorized from "./Components/Unauthorized";
import Biletat from "./Pages/biletat";
import Buses from "./Pages/buses";
import Home from "./Pages/home";
import Oraret from "./Pages/oraret";
import Pasagjeret from "./Pages/pasagjeret";
import Rezervimet from "./Pages/rezervimet";
import Rruget from "./Pages/rruget";
import Shoferet from "./Pages/shoferet";


axios.defaults.baseURL = "https://localhost:7255/";
axios.defaults.withCredentials = true;

registerLicense("Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXpec3VTRGVeVkd2WkRWYUA=");

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();  // ✅ Now inside Router

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    window.location.reload();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const PrivateRoute = ({ element, allowedRoles }) => {
    const role = localStorage.getItem("userRole");
    return allowedRoles.includes(role) ? element : <Navigate to="/unauthorized" />;
  };

  const showSidebar = ["/home", "/clientView", "/contact", "/aboutus","/oraret","/biletat", "/buses", "/rezervimet","/rruget", "/pasagjeret", "/shoferet","/about-details"].includes(location.pathname);

  return (
    <div className={`app-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {showSidebar && <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} allowedRoles={["Admin"]} />} />
          <Route path="/clientView" element={<PrivateRoute element={<ClientView />} allowedRoles={["Customer", "Admin"]} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/biletat" element={<Biletat />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/oraret" element={<Oraret />} />
          <Route path="/pasagjeret" element={<Pasagjeret />} />
          <Route path="/rezervimet" element={<Rezervimet />} />
          <Route path="/rruget" element={<Rruget />} />
          <Route path="/shoferet" element={<Shoferet />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/about-details" element={<AboutDetails />} />
          <Route path="/sidebar" element={<Sidebar />} />

           <Route path="/genericGrid" element={<GenericGrid />} />



        </Routes>
      </div>
    </div>
  );
};

export default AppWrapper;