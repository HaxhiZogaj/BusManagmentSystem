
import axios from "axios";
import { useState } from "react";
import { FaBars, FaBell, FaBug, FaChevronDown, FaChevronRight, FaCog, FaEnvelope, FaHome, FaInfoCircle, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Styles/sidebar.css";
import UserImage from '../assets/UserImage.jpg';

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [showSettings, setShowSettings] = useState(false);
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sessionId = localStorage.getItem("sessionId");


  const handleLogout = async () => {
    try {
      if (sessionId) {
        await axios.post("https://localhost:7255/api/users/logout", { sessionId });
      }
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };


  const handleHomeClick = () => {
    navigate("/home");
    setShowHomeDropdown(true);
  };

  const toggleHomeDropdown = (e) => {
    e.stopPropagation(); 
    setShowHomeDropdown((prev) => !prev);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={() => setIsSidebarOpen(!isOpen)}>
        <FaBars className="icon" />
      </button>

    <div className={`user-section ${sidebarOpen ? "expanded" : "collapsed"}`}>
      <img src={UserImage} alt="User" className="user-image" />
      {sidebarOpen && (
      <div className="user-greeting">
      <span>Pershendetje:</span><br />
      <strong>Haxhi</strong>
     </div>
     )}
   </div>

 <hr className="divider separator" />

      <div className="top-section">
        <span className="branding">SMA</span>
        <input
          type="text"
          placeholder={isOpen ? "Search..." : ""}
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </div>

      <hr className="divider" />

      <div className="menu">
        <div className="menu-item" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }} onClick={handleHomeClick}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaHome className="icon" />
            {isOpen && <span>Home</span>}
          </div>
          {isOpen && (
            <span onClick={toggleHomeDropdown} style={{ cursor: "pointer" }}>
              {showHomeDropdown ? <FaChevronDown /> : <FaChevronRight />}
            </span>
          )}
        </div>

        {showHomeDropdown && isOpen && (
          <>
            <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/oraret")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>⏰ - Menaxho  Oraret</span>}
            </div>
            <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/biletat")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>🎫 - Menaxho  Biletat</span>}
            </div>
            <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/buses")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>🚌 - Menaxho  Autobusët</span>}
            </div>
            <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/rezervimet")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>📅 - Menaxho  Rezervimet</span>}
            </div>

             <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/rruget")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>📍 - Menaxho  Rruget</span>}
            </div>
             <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/pasagjeret")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>👥 - Menaxho  Pasagjeret</span>}
            </div>
               <div
              className="menu-item dropdown-subitem"
              onClick={() => navigate("/shoferet")}
              style={{ paddingLeft: "40px" }}
            >
              {isOpen && <span>🚍 - Menaxho  Shoferet</span>}
            </div>
          </>
        )}
        
        <div className="menu-item" onClick={() => navigate("/clientView")}>
          <FaUsers className="icon" />
          {isOpen && <span>Client View</span>}
        </div>
        <div className="menu-item" onClick={() => navigate("/aboutus")}>
          <FaInfoCircle className="icon" />
          {isOpen && <span>About Us</span>}
        </div>
        <div className="menu-item" onClick={() => navigate("/contact")}>
          <FaEnvelope className="icon" />
          {isOpen && <span>Contact</span>}
        </div>
      </div>

      <hr className="divider separator" />

      <div className="menu-item" onClick={() => navigate("/notifications")}>
        <FaBell className="icon" />
        {isOpen && <span>Notifications</span>}
      </div>
      <div className="menu-item" onClick={() => navigate("/report")}>
        <FaBug className="icon" />
        {isOpen && <span>Report</span>}
      </div>

      <div className="menu-item settings" onClick={() => setShowSettings(!showSettings)}>
        <FaCog className="icon" />
        {isOpen && <span>Settings</span>}
      </div>
      {showSettings && isOpen && (
        <div className="dropdown">
          <button className="dropdown-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>

    
  );
};

export default Sidebar;