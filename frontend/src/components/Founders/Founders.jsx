import React from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaRocket,
  FaTicketAlt,
  FaUserCircle, 
  FaSort, 
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoDocumentLock } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./Founders.css";
import "../Shared/Sidebar.css"; 

const Founders = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo">
            <img src="/navbar/drishtilogo.jpg" alt="Logo"  className="dristilogo"/> 
          </div>
        </div>
        <div className="nav-container">
          <nav className="nav">
            <ul>
              <li >
                <Link to="/founders">
                  <FaUserCircle className="nav-icon" /> Founders Profile
                </Link>
              </li>
              <li>
                <Link to="/startup-general">
                  <FaRocket className="nav-icon" /> Startup General
                </Link>
              </li>
              <li>
                <Link to="/startup-legal">
                  <IoDocumentLock className="nav-icon" /> Startup Legal
                </Link>
              </li>
              <li>
                <Link to="/mis-docs">
                  <IoIosDocument className="nav-icon" /> MIS Docs
                </Link>
              </li>
              <li>
                <Link to="/tickets">
                  <FaTicketAlt className="nav-icon" /> Tickets
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <span className="founder">
            <FiMenu style={{ color: "#909090" }} /> Founders
          </span>
          <input type="text" placeholder="Search here" className="search-bar" />
          <div className="profile-section">
            <div >
              <FaBell className="notification-icon"/>
            </div>
            <div className="user-info">
              {/* <span className="user-initials">Amit</span> */}
              <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials" />
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
            <h2>List of Founders</h2>
            <div >
            <button className="add-founder-buttons">+ Add new founder</button>
            </div>
          </div>
          <div className="founders-list">
            <table>
              <thead>
                <tr>
                  <th>
                    Name <FaSort className="sorticon" /> 
                  </th>
                  <th>
                    Contact Number <FaSort className="sorticon" />  
                  </th>
                  <th>
                    Official Email <FaSort className="sorticon" />    
                  </th>
                  <th>
                    Date Of Birth <FaSort className="sorticon" />   
                  </th>
                  <th>  
                    Designation <FaSort className="sorticon" />  
                  </th>
                  <th>
                    Resume <FaSort className="sorticon" />
                  </th>
                  <th>
                    Qualification <FaSort className="sorticon" />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="no-founder">
                    <div className="no-founder-content">
                      <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
                      <h4>No Founder Added Yet</h4>
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

export default Founders;




// // src/components/Founders/Founders.jsx
// import React from "react";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { Link } from "react-router-dom";
// import "./Founders.css";

// const Founders = () => {
//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="drishtilogo.jpg" alt="Logo" />
//           </div>
//         </div>
//         <div className="nav-container">
//           <nav className="nav">
//             <ul>
//               <li className="active">
//                 <Link to="/founders">
//                   <FaUserCircle className="nav-icon" /> Founders Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/startup-general">
//                   <FaRocket className="nav-icon" /> Startup General
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/startup-legal">
//                   <IoDocumentLock className="nav-icon" /> Startup Legal
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/mis-docs">
//                   <IoIosDocument className="nav-icon" /> MIS Docs
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/tickets">
//                   <FaTicketAlt className="nav-icon" /> Tickets
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="header">
//           <span className="founder">
//             <FiMenu style={{ color: "#909090" }} /> Founders
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div className="notification-icon">
//               <FaBell />
//             </div>
//             <div className="user-info">
//               <span className="user-initials">Amit</span>
//               <div className="user-details">
//                 <span className="user-name">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop" />
//                 </span>
//                 <br />
//                 <span className="user-email">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content">
//           <div className="content-header">
//             <h2>List of Founders</h2>
//             <button className="add-founder-button">+ Add new founder</button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Name <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Contact Number <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Official Email <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Date Of Birth <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Designation <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Resume <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Qualification <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Founder Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Founders;






///bef
/// import React from "react";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./Founders.css";
// // import logo from "./logo.png";
// // import nouser from "./nouser.jpg"

// const Founders = () => {
//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             {/* <img src={logo} alt="Logo" /> */}
//             <img src="drishtilogo.jpg" alt="Logo" />
//           </div>
//         </div>
//         <div className="nav-container">
//           <nav className="nav">
//             <ul>
//               <li className="active">
//                 <FaUserCircle className="nav-icon" /> Founders Profile
//               </li>
//               <li>
//                 <FaRocket className="nav-icon" /> Startup General
//               </li>
//               <li>
//                 <IoDocumentLock className="nav-icon" /> Startup Legal
//               </li>
//               <li>
//                 <IoIosDocument className="nav-icon" /> MIS Docs
//               </li>
//               <li>
//                 <FaTicketAlt className="nav-icon" /> Tickets
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       <main className="main-content">
//         <header className="header">
//           <span className="founder">
//             <FiMenu style={{ color: "#909090" }} /> Founders
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div className="notification-icon">
//               <FaBell />
//             </div>
//             <div className="user-info">
//               <span className="user-initials">Amit</span>
//               <div className="user-details">
//                 <span className="user-name">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop" />
//                 </span>
//                 <br />
//                 <span className="user-email">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content">
//           <div className="content-header">
//             <h2>List of Founders</h2>
//             <button className="add-founder-button">+ Add new founder</button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Name <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Contact Number <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Official Email <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Date Of Birth <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Designation <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Resume <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Qualification <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       {/* <img src={nouser} alt="No User found" style={{marginTop:"50px"}} /> */}
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Founder Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Founders;
