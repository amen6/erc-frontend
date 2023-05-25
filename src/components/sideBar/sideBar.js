import "./sideBar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsJournalMedical } from "react-icons/bs";
import { FaAmbulance, FaClinicMedical } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import logo from "./logo.svg";

const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    props.setIsSidebarOpen(isSidebarOpen);
  };

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "close" : ""}`}>
        <div className="head">
          <div className="image-text">
            <span className="image">
              <img src={logo} alt="logo" />
            </span>

            <div className="text logo-text">
              <span className="name">Welcome</span>
              <span className="profession">CEO</span>
            </div>
          </div>
          <BiChevronRight className="toggle" onClick={handleToggleSidebar} />
        </div>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <NavLink to="/">
                  <FaClinicMedical className="icon" />
                  <span className="text nav-text">Home</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/missions">
                  <BsJournalMedical className="icon" />
                  <span className="text nav-text">Missions</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/ambulances">
                  <FaAmbulance className="icon" />
                  <span className="text nav-text">Ambulances</span>
                </NavLink>
              </li>

              {/* <li className="nav-link">
                <NavLink to="/test">
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">anything</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/test">
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">anything</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/test">
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">anything</span>
                </NavLink>
              </li> */}
            </ul>
          </div>

          <div className="bottom-content">
            {/* <li className="nav-link">
              <NavLink to="/test">
                <BiHomeAlt className="icon" />
                <span className="text nav-text">anything</span>
              </NavLink>
            </li> */}
            <li className="">
              <NavLink to="/login">
                <TbLogout className="icon" />
                <span className="text nav-text">logout</span>
              </NavLink>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
