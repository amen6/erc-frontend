import "./sideBar.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { BsFileMedicalFill, BsFillHospitalFill } from "react-icons/bs";
import { FaAmbulance, FaClinicMedical } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { MdSick } from "react-icons/md";
import { useSignOut } from "react-auth-kit";
import logo from "./logo.svg";

const Sidebar = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const signOut = useSignOut();
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 112.02 112.03"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className="cls-1"
                      d="M12.84,43.33a3.79,3.79,0,0,1,3.05,1.44l25,25L52.83,81.72c2.16,2.15,4.21,2.14,6.39,0L81.67,59.23c2.2-2.2,2.19-4.25,0-6.48L59.27,30.39c-2.27-2.27-4.27-2.26-6.57,0L37.58,45.55c-2.15,2.15-4.21,2.16-6.39,0q-4-4-8-8c-2.16-2.17-2.14-4.24,0-6.4Q38.05,16.38,52.87,1.58C55-.53,57-.53,59.16,1.6l51.27,51.27c2.12,2.12,2.12,4.16,0,6.28L59.24,110.33c-2.24,2.25-4.2,2.26-6.44,0L1.71,59.26C-.57,57-.57,55,1.72,52.72,4.43,50,7.1,47.26,9.88,44.62A13.37,13.37,0,0,1,12.66,43Z"
                    />
                    <path
                      className="cls-1"
                      d="M69.73,56a8.9,8.9,0,0,1-1,1.64Q63.2,63.24,57.61,68.76c-1.1,1.1-2.07,1.12-3.16,0q-5.64-5.58-11.21-11.21c-1.12-1.13-1.06-2.07.1-3.23q5.5-5.52,11-11c1.11-1.1,2.15-1.15,3.24-.07q5.6,5.54,11.12,11.13A8.92,8.92,0,0,1,69.73,56Z"
                    />
                  </g>
                </g>
              </svg>
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
                  <BsFileMedicalFill className="icon" />
                  <span className="text nav-text">Missions</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/ambulances">
                  <FaAmbulance className="icon" />
                  <span className="text nav-text">Ambulances</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/hospitals">
                  <BsFillHospitalFill className="icon" />
                  <span className="text nav-text">Hospitals</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/teams">
                  <RiTeamFill className="icon" />
                  <span className="text nav-text">Teams</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/paramedics">
                  {/* <TbLogout className="icon" /> */}
                  <svg
                    className="icon"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1V362c27.6 7.1 48 32.2 48 62v40c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16s7.2-16 16-16V424c0-17.7-14.3-32-32-32s-32 14.3-32 32v24c8.8 0 16 7.2 16 16s-7.2 16-16 16H256c-8.8 0-16-7.2-16-16V424c0-29.8 20.4-54.9 48-62V304.9c-6-.6-12.1-.9-18.3-.9H178.3c-6.2 0-12.3 .3-18.3 .9v65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7V311.2zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"></path>
                  </svg>
                  <span className="text nav-text">Paramedics</span>
                </NavLink>
              </li>

              <li className="nav-link">
                <NavLink to="/patients">
                  <MdSick className="icon" />
                  <span className="text nav-text">Patients</span>
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
            <li className="" onClick={signOut}>
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
