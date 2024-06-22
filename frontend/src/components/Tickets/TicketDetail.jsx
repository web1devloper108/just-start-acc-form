import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  FaBell,
  FaRocket,
  FaTicketAlt,
  FaUserCircle,
} from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { IoDocumentLock } from 'react-icons/io5';
import { IoIosDocument } from 'react-icons/io';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './TicketDetail.css';
import '../Shared/Sidebar.css';

const TicketDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const ticket = location.state?.ticket;

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo">
          <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
          </div>
        </div>
        <div className="nav-container">
          <nav className="nav">
            <ul>
              <li>
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
              <li className="active">
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
            <FiMenu style={{ color: "#909090" }} /> Ticket Detail
          </span>
          <input type="text" placeholder="Search here" className="search-bar" />
          <div className="profile-section">
            <div>
              <FaBell className="notification-icon"/>
            </div>
            <div className="user-info">
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
          <div className="content-headerlist">
            <h2>Ticket Information</h2>
          </div>
          <div className="ticket-detail">
            <div className="detail-card">
              <div className="info-row">
                <div className="info-item-first">
                  <p><span className="label">Ticket For:</span> <span className="value">{ticket.type}</span></p>
                  <p><span className="label">Message:</span> <span className="value">{ticket.message}</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TicketDetail;





































// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from 'react-icons/fa';
// import { FiMenu } from 'react-icons/fi';
// import { IoDocumentLock } from 'react-icons/io5';
// import { IoIosDocument } from 'react-icons/io';
// import { RiArrowDropDownLine } from 'react-icons/ri';
// import './TicketDetail.css';
// import '../Shared/Sidebar.css';

// const TicketDetail = () => {
//   const location = useLocation();
//   const { ticket } = location.state;

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
//               <li>
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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Ticket Detail
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div>
//               <FaBell className="notification-icon"/>
//             </div>
//             <div className="user-info">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials" />
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
//           <div className="content-headerlist">
//             <h2>Ticket Information</h2>
//           </div>
//           <div className="ticket-detail">
//             <div className="detail-card">
//               <div className="info-row">
//                 <div className="info-item-first">
//                   <p><span className="label">Ticket For:</span> <span className="value">{ticket.type}</span></p>
//                   <p><span className="label">Message:</span> <span className="value">{ticket.message}</span></p>
//                 </div>
//               </div>
//               {/* Add more details as necessary */}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default TicketDetail;
