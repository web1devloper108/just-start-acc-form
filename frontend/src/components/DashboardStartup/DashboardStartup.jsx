import React from "react";
import {
  FaBell,
  FaRocket,
  FaTicketAlt,
  FaUserCircle,
  FaSort,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoDocumentLock } from "react-icons/io5";
import { IoIosDocument, IoIosSearch } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./DashboardStartup.css";
// import logo from "./logo.png";
// import nouser from "./nouser.jpg"

const DashboardStartup = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo">
            {/* <img src={logo} alt="Logo" /> */}
            <img src="drishtilogo.jpg" alt="Logo" />
          </div>
        </div>
        <div className="nav-container">
          <nav className="nav">
            <ul>
              <li>
                <FaUserCircle className="nav-icon" /> Founders Profile
              </li>
              <li className="active">
                <FaRocket className="nav-icon" /> Startup General
              </li>
              <li>
                <IoDocumentLock className="nav-icon" /> Startup Legal
              </li>
              <li>
                <IoIosDocument className="nav-icon" /> MIS Docs
              </li>
              <li>
                <FaTicketAlt className="nav-icon" /> Tickets
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <span className="founder">
            <FiMenu style={{ color: "#909090" }} /> Startup General
          </span>
          <input type="text" placeholder="Search here" className="search-bar" />
          <div className="profile-section">
            <div className="notification-icon">
              <FaBell />
            </div>
            <div className="user-info">
              <span className="user-initials">Amit</span>
              <div className="user-details">
                <span className="user-name">
                  Mr. Amit Rathod <RiArrowDropDownLine className="drop" />
                </span>
                <br />
                <span className="user-email">Amit@mail.com</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="content-header">
            <h2>List of Startups</h2>
            <button className="add-founder-button">+ Add startup Details</button>
          </div>
          <div className="founders-list">
            <table>
              <thead>
                <tr>
                  <th>
                    Startup Stage <FaSort className="sorticon" />
                  </th>
                  <th>
                    Registered Office Location
                    <FaSort className="sorticon" />
                  </th>
                  <th>
                    One Line of Your Startup
                    <FaSort className="sorticon" />
                  </th>
                  <th>
                    Logo
                    <FaSort className="sorticon" />
                  </th>
                  <th>
                    Social Media Link
                    <FaSort className="sorticon" />
                  </th>
                  <th>
                    Domain Of Startup
                    <FaSort className="sorticon" />
                  </th>
                  <th>
                    Team Size
                    <FaSort className="sorticon" />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="no-founder">
                    <div className="no-founder-content">
                      {/* <img src={nouser} alt="No User found" style={{marginTop:"50px"}} /> */}
                      <img src="drishtilogo.jpg" alt="Logo" />
                      <h4>No Startup Added Yet</h4>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardStartup;
