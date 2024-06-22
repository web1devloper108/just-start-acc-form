import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaRocket,
  FaTicketAlt,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaDownload
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoDocumentLock } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RaiseTicketModal from "./RaiseTicketModal";
import SuccessModal from "./SuccessModal";
import "./Tickets.css";
import "../Shared/Sidebar.css";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(10);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (newTicket) => {
    newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1;
    setTickets([...tickets, newTicket]);
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const handleExport = () => {
    if (selectedTickets.length === 0) {
      toast.error("Please select at least one ticket to export.");
      return;
    }

    const csv = selectedTickets.map(ticket => ({
      "Ticket For": ticket.type,
      "Message": ticket.message,
    }));

    const csvContent = "data:text/csv;charset=utf-8,"
      + Object.keys(csv[0]).join(",") + "\n"
      + csv.map(e => Object.values(e).join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setTicketsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(currentTickets);
    }
    setAllSelected(!allSelected);
  };

  const handleSelect = (ticket) => {
    if (selectedTickets.includes(ticket)) {
      setSelectedTickets(selectedTickets.filter(t => t !== ticket));
    } else {
      setSelectedTickets([...selectedTickets, ticket]);
    }
  };

  const handleViewDetails = (ticket) => {
    navigate(`/tickets/${ticket.id}`, { state: { ticket } });
  };

  const SortAscIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6l-6 6h12l-6-6z"></path>
    </svg>
  );

  const SortDescIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 18l6-6H6l6 6z"></path>
    </svg>
  );

  const SortBothIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6l-6 6h12l-6-6zM12 18l6-6H6l6 6z"></path>
    </svg>
  );

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = '';
      }
    }
    setSortConfig({ key, direction });
    sortArray(key, direction);
  };

  const sortArray = (key, direction) => {
    if (direction === '') {
      setTickets([...tickets]);
      return;
    }

    const sortedData = [...tickets].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setTickets(sortedData);
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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
            <FiMenu style={{ color: "#909090" }} /> Tickets
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
          <div className="content-header">
            <h2>List of Tickets</h2>
            <button className="add-ticket-button" onClick={openModal}>
              + Raise New Ticket
            </button>
          </div>
          <div className="tickets-list">
            <table className="no-border-table">
              <thead>
                <tr>
                  <th className="checkbox-header">
                    <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />
                  </th>
                  <th onClick={() => requestSort('type')}>
                    Ticket For <span className="sort-icon">{getClassNamesFor('type') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('type') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('message')}>
                    Message <span className="sort-icon">{getClassNamesFor('message') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('message') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-ticket">
                      <div className="no-ticket-content">
                        <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
                        <h4>No Tickets Added Yet</h4>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentTickets.map((ticket, index) => (
                    <tr key={index}>
                      <td className="checkbox-cell">
                        <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
                      </td>
                      <td>{ticket.type}</td>
                      <td>{ticket.message}</td>
                      <td>
                        <div className="dropdown">
                          <FaEllipsisV className="dots-icon" />
                          <div className="dropdown-content">
                            <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
                              <span className="icon">&#x1F4C4;</span>
                              View Details
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="table-bottom-border"></div>
          </div>
          <div className="pagination-container">
            <div className="pagination">
              <FaChevronLeft
                className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              <span className="page-number">
                <span className="current-page">{currentPage}</span> / {totalPages}
              </span>
              <FaChevronRight
                className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </div>
            <div className="exporttablepage">
              <div className="export-table" onClick={handleExport}>
                <FaDownload className="export-icon" />
                <span>Export Table</span>
              </div>
              <div className="rows-per-page">
                <label>Rows per page</label>
                <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
                  {[2, 10, 15, 20].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
        <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
        <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
        <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </main>
    </div>
  );
};

export default Tickets;





////////good tostify
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import SuccessModal from "./SuccessModal";
// import { ToastContainer, toast } from "react-toastify";  // Import ToastContainer and toast
// import "react-toastify/dist/ReactToastify.css";  // Import toastify CSS
// import "./Tickets.css";
// import "../Shared/Sidebar.css";

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1;
//     setTickets([...tickets, newTicket]);
//     setIsSuccessModalOpen(true);
//   };

//   const closeSuccessModal = () => setIsSuccessModalOpen(false);

//   const handleExport = () => {
//     if (selectedTickets.length === 0) {
//       toast.error("Please select at least one ticket to export.");
//       return;
//     }
    
//     const csv = selectedTickets.map(ticket => ({
//       "Ticket For": ticket.type,
//       "Message": ticket.message,
//     }));

//     const csvContent = "data:text/csv;charset=utf-8,"
//       + Object.keys(csv[0]).join(",") + "\n"
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "tickets.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const handleViewDetails = (ticket) => {
//     navigate(`/tickets/${ticket.id}`, { state: { ticket } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/>
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th className="checkbox-header">
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td className="checkbox-cell">
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span>
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table" onClick={handleExport}>
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
//         <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//       </main>
//     </div>
//   );
// };

// export default Tickets;









//// ok formic

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import SuccessModal from "./SuccessModal";
// import "./Tickets.css";
// import "../Shared/Sidebar.css";

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1;
//     setTickets([...tickets, newTicket]);
//     setIsSuccessModalOpen(true);
//   };

//   const closeSuccessModal = () => setIsSuccessModalOpen(false);

//   const handleExport = () => {
//     const csv = selectedTickets.map(ticket => ({
//       "Ticket For": ticket.type,
//       "Message": ticket.message,
//     }));

//     const csvContent = "data:text/csv;charset=utf-8,"
//       + Object.keys(csv[0]).join(",") + "\n"
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "tickets.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const handleViewDetails = (ticket) => {
//     navigate(`/tickets/${ticket.id}`, { state: { ticket } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/>
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th className="checkbox-header">
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td className="checkbox-cell">
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span>
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table" onClick={handleExport}>
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import SuccessModal from "./SuccessModal";
// import "./Tickets.css";
// import "../Shared/Sidebar.css";

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1;
//     setTickets([...tickets, newTicket]);
//     setIsSuccessModalOpen(true);
//   };

//   const closeSuccessModal = () => setIsSuccessModalOpen(false);

//   const handleExport = () => {
//     const csv = selectedTickets.map(ticket => ({
//       "Ticket For": ticket.type,
//       "Message": ticket.message,
//     }));

//     const csvContent = "data:text/csv;charset=utf-8,"
//       + Object.keys(csv[0]).join(",") + "\n"
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "tickets.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const handleViewDetails = (ticket) => {
//     navigate(`/tickets/${ticket.id}`, { state: { ticket } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/>
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span>
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table" onClick={handleExport}>
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import SuccessModal from "./SuccessModal"; 
// import "./Tickets.css"; 
// import "./SweetAlertTickets.css";
// import "../Shared/Sidebar.css"; 

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Add state for SuccessModal
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1; // Generate a unique id for the new ticket
//     setTickets([...tickets, newTicket]);
//     setIsSuccessModalOpen(true); // Show SuccessModal
//   };

//   const closeSuccessModal = () => setIsSuccessModalOpen(false); // Close SuccessModal

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const handleViewDetails = (ticket) => {
//     navigate(`/tickets/${ticket.id}`, { state: { ticket } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table">
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;




// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import SuccessModal from "./SuccessModal"; // Import the new SuccessModal component
// import "./Tickets.css"; 
// import "./SweetAlertTickets.css";
// import "../Shared/Sidebar.css"; 

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Add state for SuccessModal
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1; // Generate a unique id for the new ticket
//     setTickets([...tickets, newTicket]);
//     setIsSuccessModalOpen(true); // Show SuccessModal
//   };

//   const closeSuccessModal = () => setIsSuccessModalOpen(false); // Close SuccessModal

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const handleViewDetails = (ticket) => {
//     navigate(`/tickets/${ticket.id}`, { state: { ticket } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table">
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} /> {/* Add SuccessModal component */}
//       </main>
//     </div>
//   );
// };

// export default Tickets;










////end sweet 












// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import "./Tickets.css"; 
// import "./SweetAlertTickets.css";
// import "../Shared/Sidebar.css"; 

// const MySwal = withReactContent(Swal);

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     newTicket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1; // Generate a unique id for the new ticket
//     setTickets([...tickets, newTicket]);
//     showSuccessAlert();
//   };

//   const showSuccessAlert = () => {
//     MySwal.fire({
//       title: "Ticket Raised Successfully",
//       text: "You will receive an update regarding your request shortly.",
//       icon: "success",
//       confirmButtonText: "Ok",
//       customClass: {
//         popup: "popup-class",
//         title: "title-class",
//         htmlContainer: "text-class",
//         confirmButton: "confirm-button-class"
//       }
//     });
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const handleViewDetails = (ticket) => {
//     navigate(`/tickets/${ticket.id}`, { state: { ticket } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(ticket)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table">
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;





















// ok till sweet 1321
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import "./Tickets.css"; // Reference the new CSS file
// import "./SweetAlertTickets.css"; // Reference the new CSS file for SweetAlert
// import "../Shared/Sidebar.css"; // Reuse the same styles from Sidebar.css

// const MySwal = withReactContent(Swal);

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     setTickets([...tickets, newTicket]);
//     showSuccessAlert();
//   };

//   const showSuccessAlert = () => {
//     MySwal.fire({
//       title: "Ticket Raised Successfully",
//       text: "You will receive an update regarding your request shortly.",
//       icon: "success",
//       confirmButtonText: "Ok",
//       customClass: {
//         popup: "popup-class",
//         title: "title-class",
//         htmlContainer: "text-class",
//         confirmButton: "confirm-button-class"
//       }
//     });
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => navigate(`/ticket-details/${ticket.id}`)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table">
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;






// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import "./Tickets.css"; // Reference the new CSS file
// import "../Shared/Sidebar.css"; // Reuse the same styles from Sidebar.css

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     setTickets([...tickets, newTicket]);
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => navigate(`/ticket-details/${ticket.id}`)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table">
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;
  













////////////////////Hard core data 

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import RaiseTicketModal from "./RaiseTicketModal";
// import "./Tickets.css"; // Reference the new CSS file
// import "../Shared/Sidebar.css"; // Reuse the same styles from Sidebar.css

// const Tickets = () => {
//   const [tickets, setTickets] = useState([
//     // Example tickets data
//     { id: 1, type: "Founder Profile", message: "Lorem ipsum dolor sit amet consectetur." },
//     { id: 2, type: "Startup Genl", message: "Lorem ipsum dolor sit amet consectetur." },
//     { id: 3, type: "Startup Legal", message: "Lorem ipsum dolor sit amet consectetur." },
//   ]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     setTickets([...tickets, newTicket]);
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(t => t !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/founders/nostartupadd.jpg" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.type}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => navigate(`/ticket-details/${ticket.id}`)} className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table">
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <RaiseTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;























//   import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddTicketModal from "./AddTicketModal";
// import "./Tickets.css";
// import "../Shared/Sidebar.css";

// const Tickets = () => {
//   const [tickets, setTickets] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newTicket) => {
//     setTickets([...tickets, newTicket]);
//   };

//   const handleExport = () => {
//     const csv = selectedTickets.map(ticket => ({
//       "Ticket For": ticket.for,
//       "Message": ticket.message
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "tickets.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(s => s !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   const SortAscIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M12 6l-6 6h12l-6-6z"></path>
//     </svg>
//   );

//   const SortDescIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M12 18l6-6H6l6 6z"></path>
//     </svg>
//   );

//   const SortBothIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M12 6l-6 6h12l-6-6zM12 18l6-6H6l6 6z"></path>
//     </svg>
//   );

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key) {
//       if (sortConfig.direction === 'ascending') {
//         direction = 'descending';
//       } else if (sortConfig.direction === 'descending') {
//         direction = '';
//       }
//     }
//     setSortConfig({ key, direction });
//     sortArray(key, direction);
//   };

//   const sortArray = (key, direction) => {
//     if (direction === '') {
//       setTickets([...tickets]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...tickets].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setTickets(sortedData);
//   };

//   const getClassNamesFor = (name) => {
//     if (!sortConfig) {
//       return;
//     }
//     return sortConfig.key === name ? sortConfig.direction : undefined;
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div >
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button" onClick={openModal}>
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('for')}>
//                     Ticket For <span className="sort-icon">{getClassNamesFor('for') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('for') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('message')}>
//                     Message <span className="sort-icon">{getClassNamesFor('message') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('message') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-ticket">
//                       <div className="no-ticket-content">
//                         <img src="/tickets/noticket.png" alt="No Tickets" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Tickets Raised Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.for}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table" onClick={handleExport}>
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddTicketModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Tickets;











// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./Tickets.css";
// import "../Shared/Sidebar.css";

// const Tickets = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ticketsPerPage, setTicketsPerPage] = useState(10);
//   const [selectedTickets, setSelectedTickets] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [tickets, setTickets] = useState([
//     { id: 1, for: 'Founder Profile', message: 'Lorem ipsum dolor sit amet consectetur.' },
//     { id: 2, for: 'Startup General', message: 'Lorem ipsum dolor sit amet consectetur.' },
//     { id: 3, for: 'Startup Legal', message: 'Lorem ipsum dolor sit amet consectetur.' }
//   ]);

//   const navigate = useNavigate();

//   const handleExport = () => {
//     const csv = selectedTickets.map(ticket => ({
//       "Ticket For": ticket.for,
//       "Message": ticket.message
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "tickets.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const indexOfLastTicket = currentPage * ticketsPerPage;
//   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
//   const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
//   const totalPages = Math.ceil(tickets.length / ticketsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setTicketsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedTickets([]);
//     } else {
//       setSelectedTickets(currentTickets);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (ticket) => {
//     if (selectedTickets.includes(ticket)) {
//       setSelectedTickets(selectedTickets.filter(s => s !== ticket));
//     } else {
//       setSelectedTickets([...selectedTickets, ticket]);
//     }
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Tickets
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
//           <div className="content-header">
//             <h2>List of Tickets</h2>
//             <button className="add-ticket-button">
//               + Raise New Ticket
//             </button>
//           </div>
//           <div className="tickets-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>Ticket For</th>
//                   <th>Message</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentTickets.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="no-tickets">
//                       <div className="no-tickets-content">
//                         <h4>No Tickets Raised Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentTickets.map((ticket, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(ticket)} checked={selectedTickets.includes(ticket)} />
//                       </td>
//                       <td>{ticket.for}</td>
//                       <td>{ticket.message}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button className="dropdown-button">
//                               <span className="icon">&#x1F4C4;</span> 
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="table-bottom-border"></div>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 <span className="current-page">{currentPage}</span> / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//               <div className="export-table" onClick={handleExport}>
//                 <FaDownload className="export-icon" />
//                 <span>Export Table</span>
//               </div>
//               <div className="rows-per-page">
//                 <label>Rows per page</label>
//                 <select value={ticketsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Tickets;
