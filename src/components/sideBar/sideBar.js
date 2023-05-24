import "./sideBar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiChevronRight } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { RxActivityLog } from "react-icons/rx";
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
                  <BiHomeAlt className="icon" />
                  <span className="text nav-text">Home</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/users">
                  <AiOutlineUser className="icon" />
                  <span className="text nav-text">Users</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/events">
                  <RxActivityLog className="icon" />
                  <span className="text nav-text">Events</span>
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
