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
import AddStartupModal from "./AddStartupModal";
import StartupSuccessModal from "./StartupSuccessModal"; 
import "./Startup.css";
import "../Shared/Sidebar.css";

const Startup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [startups, setStartups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startupsPerPage, setStartupsPerPage] = useState(10);
  const [selectedStartups, setSelectedStartups] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false); 
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSuccessModal = () => setIsSuccessModalOpen(true); 
  const closeSuccessModal = () => setIsSuccessModalOpen(false); 

  const handleSave = (newStartup) => {
    setStartups([...startups, newStartup]);
    closeModal();
    openSuccessModal(); 
  };

  const handleExport = () => {
    if (selectedStartups.length === 0) {
      toast.error("Please select at least one startup to export.");
      return;
    }

    const csv = selectedStartups.map(startup => ({
      "Startup Stage": startup.stage,
      "Registered Office Location": startup.location,
      "One Line of Your Startup": startup.oneLiner,
      "Logo": startup.logo.name,
      "Social Media Link": startup.socialMedia,
      "Domain Of Startup": startup.domain,
      "Team Size": startup.teamSize
    }));

    const csvContent = "data:text/csv;charset=utf-8,"
      + Object.keys(csv[0]).join(",") + "\n"
      + csv.map(e => Object.values(e).join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "startups.csv");
    document.body.appendChild(link);
    link.click();
  };

  const renderLogoName = (logo) => {
    if (logo) {
      return logo.name;
    }
    return null;
  };

  const indexOfLastStartup = currentPage * startupsPerPage;
  const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
  const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
  const totalPages = Math.ceil(startups.length / startupsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setStartupsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  const handleViewDetails = (startup) => {
    navigate(`/startup-general/${startup.id}`, { state: { startup } });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedStartups([]);
    } else {
      setSelectedStartups(currentStartups);
    }
    setAllSelected(!allSelected);
  };

  const handleSelect = (startup) => {
    if (selectedStartups.includes(startup)) {
      setSelectedStartups(selectedStartups.filter(s => s !== startup));
    } else {
      setSelectedStartups([...selectedStartups, startup]);
    }
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
      setStartups([...startups]); 
      return;
    }

    const sortedData = [...startups].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setStartups(sortedData);
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const toggleStartupGeneral = (e) => {
    e.preventDefault();
    setIsStartupGeneralOpen(!isStartupGeneralOpen);
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo">
            <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo" />
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
              <li onClick={toggleStartupGeneral}>
                <div className="dropdown-header-new">
                  <FaRocket className="nav-icon" /> Startup General <RiArrowDropDownLine className="drop" />
                </div>
                {isStartupGeneralOpen && (
                  <ul className="dropdown-menu-new">
                    <li className="dropdown-menu-item-new">
                      <Link to="/startup-general" className="dropdown-menu-link-new">Startup</Link>
                    </li>
                    <li className="dropdown-menu-item-new">
                      <Link to="/form" className="dropdown-menu-link-new">Form</Link>
                    </li>
                  </ul>
                )}
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
            <FiMenu style={{ color: "#909090" }} /> Startup General
          </span>
          <input type="text" placeholder="Search here" className="search-bar" />
          <div className="profile-section">
            <div>
              <FaBell className="notification-icon" />
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
            <h2>List of Startups</h2>
            <button className="add-startup-button" onClick={openModal}>
              + Add startup Details
            </button>
          </div>
          <div className="founders-list">
            <table className="no-border-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />  
                  </th>
                  <th onClick={() => requestSort('stage')}>
                    Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('location')}>
                    Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('oneLiner')}>
                    One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('logo')}>
                    Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('socialMedia')}>
                    Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('domain')}>
                    Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th onClick={() => requestSort('teamSize')}>
                    Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentStartups.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="no-founder">
                      <div className="no-founder-content">
                        <img src="/founders/nostartupadd.jpg" alt="Logo" style={{ marginTop: "70px", width: "120px", height: "120px" }} />
                        <h4>No Startup Added Yet</h4>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentStartups.map((startup, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
                      </td>
                      <td>{startup.stage}</td>
                      <td>{startup.location}</td>
                      <td>{startup.oneLiner}</td>
                      <td>{renderLogoName(startup.logo)}</td>
                      <td>{startup.socialMedia}</td>
                      <td>{startup.domain}</td>
                      <td>{startup.teamSize}</td>
                      <td>
                        <div className="dropdown">
                          <FaEllipsisV className="dots-icon" />
                          <div className="dropdown-content">
                            <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
                <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
                  {[2, 10, 15, 20].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
        <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
        <StartupSuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
        <ToastContainer position="bottom-right" /> 
      </main>
    </div>
  );
};

export default Startup;









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
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import AddStartupModal from "./AddStartupModal";
// import StartupSuccessModal from "./StartupSuccessModal"; 
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for the success modal
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const openSuccessModal = () => setIsSuccessModalOpen(true); // Function to open success modal
//   const closeSuccessModal = () => setIsSuccessModalOpen(false); // Function to close success modal

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//     closeModal(); // Close the AddStartupModal
//     openSuccessModal(); // Open the StartupSuccessModal
//   };

//   const handleExport = () => {
//     if (selectedStartups.length === 0) {
//       toast.error("Please select at least one startup to export.");
//       return;
//     }

//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8,"
//       + Object.keys(csv[0]).join(",") + "\n"
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogoName = (logo) => {
//     if (logo) {
//       return logo.name;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo" />
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div>
//               <FaBell className="notification-icon" />
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />  
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{ marginTop: "70px", width: "120px", height: "120px" }} />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogoName(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <StartupSuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
//         <ToastContainer position="bottom-right" /> {/* Toast container for notifications */}
//       </main>
//     </div>
//   );
// };

// export default Startup;







//////////////////bef 
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
// import AddStartupModal from "./AddStartupModal";
// import StartupSuccessModal from "./StartupSuccessModal"; // Import the success modal
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for the success modal
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const openSuccessModal = () => setIsSuccessModalOpen(true); // Function to open success modal
//   const closeSuccessModal = () => setIsSuccessModalOpen(false); // Function to close success modal

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//     closeModal(); // Close the AddStartupModal
//     openSuccessModal(); // Open the StartupSuccessModal
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8,"
//       + Object.keys(csv[0]).join(",") + "\n"
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogoName = (logo) => {
//     if (logo) {
//       return logo.name;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <img src="/navbar/drishtilogo.jpg" alt="Logo" className="dristilogo" />
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div>
//               <FaBell className="notification-icon" />
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} />
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{ marginTop: "70px", width: "120px", height: "120px" }} />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogoName(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//         <StartupSuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} /> {/* Success Modal */}
//       </main>
//     </div>
//   );
// };

// export default Startup;






















///////////////end sweet 
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogoName = (logo) => {
//     if (logo) {
//       return logo.name;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table className="no-border-table">
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogoName(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;






















































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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogoName = (logo) => {
//     if (logo) {
//       return logo.name;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogoName(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;



























// // ////100% table567
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogoName = (logo) => {
//     if (logo) {
//       return logo.name;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogoName(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//                 {currentPage} / {totalPages}
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;
































///ok 17/6
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogoName = (logo) => {
//     if (logo) {
//       return logo.name;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogoName(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;
































































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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//       setStartups([...startups]); // Reset to default order (no sorting)
//       return;
//     }

//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className="sort-icon">{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('stage') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className="sort-icon">{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('location') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className="sort-icon">{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('oneLiner') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className="sort-icon">{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('logo') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className="sort-icon">{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('socialMedia') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className="sort-icon">{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('domain') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className="sort-icon">{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : getClassNamesFor('teamSize') === 'descending' ? <SortDescIcon /> : <SortBothIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;







////both work


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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
//     }
//   };

//   const SortAscIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M6 15l6-6 6 6H6z"></path>
//     </svg>
//   );

//   const SortDescIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M6 9l6 6 6-6H6z"></path>
//     </svg>
//   );

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
//       direction = 'ascending';
//     }
//     setSortConfig({ key, direction });
//     sortArray(key, direction);
//   };

//   const sortArray = (key, direction) => {
//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className={`sort-icon ${getClassNamesFor('stage')}`}>{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className={`sort-icon ${getClassNamesFor('location')}`}>{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className={`sort-icon ${getClassNamesFor('oneLiner')}`}>{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className={`sort-icon ${getClassNamesFor('logo')}`}>{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className={`sort-icon ${getClassNamesFor('socialMedia')}`}>{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className={`sort-icon ${getClassNamesFor('domain')}`}>{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className={`sort-icon ${getClassNamesFor('teamSize')}`}>{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;



////check and single shorting arrow work
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
//     }
//   };

//   const SortAscIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M6 15l6-6 6 6H6z"></path>
//     </svg>
//   );

//   const SortDescIcon = () => (
//     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M6 9l6 6 6-6H6z"></path>
//     </svg>
//   );

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//     sortArray(key, direction);
//   };

//   const sortArray = (key, direction) => {
//     const sortedData = [...startups].sort((a, b) => {
//       if (a[key] < b[key]) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (a[key] > b[key]) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });
//     setStartups(sortedData);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th onClick={() => requestSort('stage')}>
//                     Startup Stage <span className={`sort-icon ${getClassNamesFor('stage')}`}>{getClassNamesFor('stage') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('location')}>
//                     Registered Office Location <span className={`sort-icon ${getClassNamesFor('location')}`}>{getClassNamesFor('location') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('oneLiner')}>
//                     One Line of Your Startup <span className={`sort-icon ${getClassNamesFor('oneLiner')}`}>{getClassNamesFor('oneLiner') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('logo')}>
//                     Logo <span className={`sort-icon ${getClassNamesFor('logo')}`}>{getClassNamesFor('logo') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('socialMedia')}>
//                     Social Media Link <span className={`sort-icon ${getClassNamesFor('socialMedia')}`}>{getClassNamesFor('socialMedia') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('domain')}>
//                     Domain Of Startup <span className={`sort-icon ${getClassNamesFor('domain')}`}>{getClassNamesFor('domain') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th onClick={() => requestSort('teamSize')}>
//                     Team Size <span className={`sort-icon ${getClassNamesFor('teamSize')}`}>{getClassNamesFor('teamSize') === 'ascending' ? <SortAscIcon /> : <SortDescIcon />}</span>
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;












/// check work
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const [selectedStartups, setSelectedStartups] = useState([]);
//   const [allSelected, setAllSelected] = useState(false);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = selectedStartups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   const handleSelectAll = () => {
//     if (allSelected) {
//       setSelectedStartups([]);
//     } else {
//       setSelectedStartups(currentStartups);
//     }
//     setAllSelected(!allSelected);
//   };

//   const handleSelect = (startup) => {
//     if (selectedStartups.includes(startup)) {
//       setSelectedStartups(selectedStartups.filter(s => s !== startup));
//     } else {
//       setSelectedStartups([...selectedStartups, startup]);
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" onChange={handleSelectAll} checked={allSelected} /> 
//                   </th>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="9" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="checkbox" onChange={() => handleSelect(startup)} checked={selectedStartups.includes(startup)} />
//                       </td>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
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
//                 <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                   {[2, 10, 15, 20].map(size => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;


















//////ok second component 
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = startups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//           <img src="/navbar/drishtilogo.jpg" alt="Logo"  className="dristilogo"/> 
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-startup-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                       <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           {/* <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)}>
//                               View Details
//                             </button>
//                           </div> */}
//                                   <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)} className="dropdown-button">
//                                  <span className="icon">&#x1F4C4;</span> 
//                                     View Details
//                                   </button>
//                               </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="exporttablepage">
//             <div className="export-table" onClick={handleExport}>
//               <FaDownload className="export-icon" />
//               <span>Export Table</span>
//             </div>
//             <div className="rows-per-page">
//               <label>Rows per page</label>
//               <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                 {[2, 10, 15, 20].map(size => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;





















































////full desh with details
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = startups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)}>
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="export-table" onClick={handleExport}>
//               <FaDownload className="export-icon" />
//               <span>Export Table</span>
//             </div>
//             <div className="rows-per-page">
//               <label>Rows per page</label>
//               <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                 {[2, 10, 15, 20].map(size => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);
//   const navigate = useNavigate();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = startups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

//   const handleViewDetails = (startup) => {
//     navigate(`/startup-general/${startup.id}`, { state: { startup } });
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <button onClick={() => handleViewDetails(startup)}>
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
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="export-table" onClick={handleExport}>
//               <FaDownload className="export-icon" />
//               <span>Export Table</span>
//             </div>
//             <div className="rows-per-page">
//               <label>Rows per page</label>
//               <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                 {[2, 10, 15, 20].map(size => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = startups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <Link to={`/startup/${index}`}>View Details</Link>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="export-table" onClick={handleExport}>
//               <FaDownload className="export-icon" />
//               <span>Export Table</span>
//             </div>
//             <div className="rows-per-page">
//               <label>Rows per page</label>
//               <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                 {[2, 10, 15, 20].map(size => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;



 


// ok page csv
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaChevronLeft,
//   FaChevronRight,
//   FaEllipsisV,
//   FaDownload
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [startupsPerPage, setStartupsPerPage] = useState(10);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleExport = () => {
//     const csv = startups.map(startup => ({
//       "Startup Stage": startup.stage,
//       "Registered Office Location": startup.location,
//       "One Line of Your Startup": startup.oneLiner,
//       "Logo": startup.logo.name,
//       "Social Media Link": startup.socialMedia,
//       "Domain Of Startup": startup.domain,
//       "Team Size": startup.teamSize
//     }));

//     const csvContent = "data:text/csv;charset=utf-8," 
//       + Object.keys(csv[0]).join(",") + "\n" 
//       + csv.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "startups.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const indexOfLastStartup = currentPage * startupsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - startupsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / startupsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleRowsPerPageChange = (e) => {
//     setStartupsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>
//                         <div className="dropdown">
//                           <FaEllipsisV className="dots-icon" />
//                           <div className="dropdown-content">
//                             <Link to={`/startup/${index}`}>View Details</Link>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <div className="pagination-container">
//             <div className="pagination">
//               <FaChevronLeft
//                 className={`pagination-arrow ${currentPage === 1 && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage - 1)}
//               />
//               <span className="page-number">
//                 {currentPage} / {totalPages}
//               </span>
//               <FaChevronRight
//                 className={`pagination-arrow ${currentPage === totalPages && 'disabled'}`}
//                 onClick={() => handlePageChange(currentPage + 1)}
//               />
//             </div>
//             <div className="export-table" onClick={handleExport}>
//               <FaDownload className="export-icon" />
//               <span>Export Table</span>
//             </div>
//             <div className="rows-per-page">
//               <label>Rows per page</label>
//               <select value={startupsPerPage} onChange={handleRowsPerPageChange}>
//                 {[2, 10, 15, 20].map(size => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaDownload,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";
// import ReactPaginate from 'react-paginate';

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const exportTable = () => {
//     const csvRows = [];
//     const headers = ["Startup Stage", "Registered Office Location", "One Line of Your Startup", "Logo", "Social Media Link", "Domain Of Startup", "Team Size"];
//     csvRows.push(headers.join(','));

//     for (const startup of startups) {
//       const row = [
//         startup.stage,
//         startup.location,
//         startup.oneLiner,
//         startup.logo ? startup.logo.name : '',
//         startup.socialMedia,
//         startup.domain,
//         startup.teamSize,
//       ];
//       csvRows.push(row.join(','));
//     }

//     const csvData = new Blob([csvRows.join('\n')], { type: 'text/csv' });
//     const csvUrl = URL.createObjectURL(csvData);
//     const a = document.createElement('a');
//     a.href = csvUrl;
//     a.download = 'startups.csv';
//     a.click();
//   };

//   const handlePageChange = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//   };

//   const startIndex = currentPage * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const currentStartups = startups.slice(startIndex, endIndex);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     <input type="checkbox" />
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>View Details</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="pagination-container">
//               <ReactPaginate
//                 previousLabel={'<'}
//                 nextLabel={'>'}
//                 breakLabel={'...'}
//                 breakClassName={'break-me'}
//                 pageCount={Math.ceil(startups.length / rowsPerPage)}
//                 marginPagesDisplayed={2}
//                 pageRangeDisplayed={5}
//                 onPageChange={handlePageChange}
//                 containerClassName={'pagination'}
//                 activeClassName={'active'}
//               />
//               <div className="export-table" onClick={exportTable}>
//                 <FaDownload className="export-icon" />
//                 Export Table
//               </div>
//               <div className="rows-per-page">
//                 Rows per page
//                 <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//                   <option value={2}>2</option>
//                   <option value={10}>10</option>
//                   <option value={15}>15</option>
//                   <option value={20}>20</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup; 



////ok page 
// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reset to the first page whenever rows per page changes
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   // Pagination calculations
//   const indexOfLastStartup = currentPage * rowsPerPage;
//   const indexOfFirstStartup = indexOfLastStartup - rowsPerPage;
//   const currentStartups = startups.slice(indexOfFirstStartup, indexOfLastStartup);
//   const totalPages = Math.ceil(startups.length / rowsPerPage);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>View Details</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="pagination-container">
//               <div className="pagination">
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//                   &lt;
//                 </button>
//                 <span>{currentPage} / {totalPages}</span>
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//                   &gt;
//                 </button>
//               </div>
//               <div className="table-actions">
//                 <button className="export-button">Export Table</button>
//                 <div className="rows-per-page">
//                   <label>Rows per page</label>
//                   <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
//                     <option value={2}>2</option>
//                     <option value={10}>10</option>
//                     <option value={15}>15</option>
//                     <option value={20}>20</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;





///page icon ok 
// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaDownload,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const exportTable = () => {
//     // Implement export table functionality here
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentStartups = startups.slice(indexOfFirstRow, indexOfLastRow);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentStartups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentStartups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>View Details</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="pagination-controls">
//               <div className="pagination">
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//                   &lt;
//                 </button>
//                 <span>
//                   {currentPage} / {Math.ceil(startups.length / rowsPerPage)}
//                 </span>
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(startups.length / rowsPerPage)}>
//                   &gt;
//                 </button>
//               </div>
//               <div className="export-table">
//                 <button onClick={exportTable}>
//                   <FaDownload className="export-icon" /> Export Table
//                 </button>
//               </div>
//               <div className="rows-per-page">
//                 <label htmlFor="rows-per-page">Rows per page</label>
//                 <select id="rows-per-page" value={rowsPerPage} onChange={handleRowsPerPageChange}>
//                   <option value={2}>2</option>
//                   <option value={20}>20</option>
//                   <option value={30}>30</option>
//                   <option value={50}>50</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;








///b page
// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <img src={URL.createObjectURL(logo)} alt="logo" style={{ width: "50px", height: "50px" }} />;
//     }
//     return null;
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {startups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   startups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{renderLogo(startup.logo)}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>View Details</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;



///// main list
// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
//   FaSort,
//   FaEllipsisV,
//   FaFileExport,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import AddStartupModal from "./AddStartupModal";
// import ReactPaginate from 'react-paginate';
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);
//   const [dropdownIndex, setDropdownIndex] = useState(null);

//   const startupsPerPage = 1;
//   const pagesVisited = pageNumber * startupsPerPage;

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

//   const renderLogo = (logo) => {
//     if (logo) {
//       const isPdf = logo.name.endsWith(".pdf");
//       if (isPdf) {
//         return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">PDF</a>;
//       }
//       return <a href={URL.createObjectURL(logo)} target="_blank" rel="noopener noreferrer">Logo.png</a>;
//     }
//     return null;
//   };

//   const displayStartups = startups
//     .slice(pagesVisited, pagesVisited + startupsPerPage)
//     .map((startup, index) => (
//       <tr key={index}>
//         <td>{startup.stage}</td>
//         <td>{startup.location}</td>
//         <td>{startup.oneLiner}</td>
//         <td>{renderLogo(startup.logo)}</td>
//         <td>{startup.socialMedia}</td>
//         <td>{startup.domain}</td>
//         <td>{startup.teamSize}</td>
//         <td>
//           <div className="dropdown">
//             <FaEllipsisV onClick={() => setDropdownIndex(index === dropdownIndex ? null : index)} />
//             {dropdownIndex === index && (
//               <div className="dropdown-content">
//                 <a href="#" onClick={() => alert("View Details")}>View Details</a>
//               </div>
//             )}
//           </div>
//         </td>
//       </tr>
//     ));

//   const pageCount = Math.ceil(startups.length / startupsPerPage);

//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//             <button className="export-button">
//               <FaFileExport /> Export Table
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {startups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   displayStartups
//                 )}
//               </tbody>
//             </table>
//             <ReactPaginate
//               previousLabel={"Previous"}
//               nextLabel={"Next"}
//               pageCount={pageCount}
//               onPageChange={changePage}
//               containerClassName={"paginationBttns"}
//               previousLinkClassName={"previousBttn"}
//               nextLinkClassName={"nextBttn"}
//               disabledClassName={"paginationDisabled"}
//               activeClassName={"paginationActive"}
//             />
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;







// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [startups, setStartups] = useState([]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSave = (newStartup) => {
//     setStartups([...startups, newStartup]);
//   };

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {startups.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="no-founder">
//                       <div className="no-founder-content">
//                         <img src="drishtilogo.jpg" alt="Logo" />
//                         <h4>No Startup Added Yet</h4>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   startups.map((startup, index) => (
//                     <tr key={index}>
//                       <td>{startup.stage}</td>
//                       <td>{startup.location}</td>
//                       <td>{startup.oneLiner}</td>
//                       <td>{startup.logo}</td>
//                       <td>{startup.socialMedia}</td>
//                       <td>{startup.domain}</td>
//                       <td>{startup.teamSize}</td>
//                       <td>View Details</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} />
//       </main>
//     </div>
//   );
// };

// export default Startup;










// // bef save list          
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;






////ok input file ooooooooooooook
// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;






































// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;



////ok
// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;






// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;






/// moooooooooooooo
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;




// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;





// // src/components/Startup/Startup.jsx
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
// import AddStartupModal from "./AddStartupModal";
// import "./Startup.css";
// import "../Shared/Sidebar.css";

// const Startup = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button" onClick={openModal}>
//               + Add startup Details
//             </button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <AddStartupModal isOpen={isModalOpen} onClose={closeModal} />
//       </main>
//     </div>
//   );
// };

// export default Startup;





// before model25
// // src/components/Startup/Startup.jsx
// import React from "react";
// import { Link } from "react-router-dom";
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
// import "./Startup.css";
// import "../Shared/Sidebar.css"; // Import the shared CSS

// const Startup = () => {
//   return (
//     <div className="dashboard">
//       <aside className="sidebar">
//         <div className="logo-container">
//           <div className="logo">
//           <img src="/navbar/drishtilogo.jpg" alt="Logo"  className="dristilogo"/> 
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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button">+ Add startup Details</button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                     <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                     <h4>No Startup Added Yet</h4>
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

// export default Startup;





// // src/components/Startup/Startup.jsx
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
// import "./Startup.css";

// const Startup = () => {
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
//               <li className="active">
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
//             <FiMenu style={{ color: "#909090" }} /> Startup General
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
//             <h2>List of Startups</h2>
//             <button className="add-founder-button">+ Add startup Details</button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>
//                     Startup Stage <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Registered Office Location <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     One Line of Your Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Logo <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Social Media Link <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Domain Of Startup <FaSort className="sorticon" />
//                   </th>
//                   <th>
//                     Team Size <FaSort className="sorticon" />
//                   </th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="8" className="no-founder">
//                     <div className="no-founder-content">
//                       <img src="drishtilogo.jpg" alt="Logo" />
//                       <h4>No Startup Added Yet</h4>
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

// export default Startup;




// ////b link
// // import React from "react";
// // import {
// //   FaBell,
// //   FaRocket,
// //   FaTicketAlt,
// //   FaUserCircle,
// //   FaSort,
// // } from "react-icons/fa";
// // import { FiMenu } from "react-icons/fi";
// // import { IoDocumentLock } from "react-icons/io5";
// // import { IoIosDocument } from "react-icons/io";
// // import { RiArrowDropDownLine } from "react-icons/ri";
// // import { Link } from "react-router-dom";
// // import "./Startup.css";

// // const Startup = () => {
// //   return (
// //     <div className="dashboard">
// //       <aside className="sidebar">
// //         <div className="logo-container">
// //           <div className="logo">
// //             <img src="drishtilogo.jpg" alt="Logo" />
// //           </div>
// //         </div>
// //         <div className="nav-container">
// //           <nav className="nav">
// //             <ul>
// //               <li>
// //                 <Link to="/founders">
// //                   <FaUserCircle className="nav-icon" /> Founders Profile
// //                 </Link>
// //               </li>
// //               <li className="active">
// //                 <Link to="/startup-general">
// //                   <FaRocket className="nav-icon" /> Startup General
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/startup-legal">
// //                   <IoDocumentLock className="nav-icon" /> Startup Legal
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/mis-docs">
// //                   <IoIosDocument className="nav-icon" /> MIS Docs
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/tickets">
// //                   <FaTicketAlt className="nav-icon" /> Tickets
// //                 </Link>
// //               </li>
// //             </ul>
// //           </nav>
// //         </div>
// //       </aside>

// //       <main className="main-content">
// //         <header className="header">
// //           <span className="founder">
// //             <FiMenu style={{ color: "#909090" }} /> Startup General
// //           </span>
// //           <input type="text" placeholder="Search here" className="search-bar" />
// //           <div className="profile-section">
// //             <div className="notification-icon">
// //               <FaBell />
// //             </div>
// //             <div className="user-info">
// //               <span className="user-initials">Amit</span>
// //               <div className="user-details">
// //                 <span className="user-name">
// //                   Mr. Amit Rathod <RiArrowDropDownLine className="drop" />
// //                 </span>
// //                 <br />
// //                 <span className="user-email">Amit@mail.com</span>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         <section className="content">
// //           <div className="content-header">
// //             <h2>List of Startups</h2>
// //             <button className="add-founder-button">+ Add startup Details</button>
// //           </div>
// //           <div className="founders-list">
// //             <table>
// //               <thead>
// //                 <tr>
// //                   <th>
// //                     Startup Stage <FaSort className="sorticon" />
// //                   </th>
// //                   <th>
// //                     Registered Office Location <FaSort className="sorticon" />
// //                   </th>
// //                   <th>
// //                     One Line of Your Startup <FaSort className="sorticon" />
// //                   </th>
// //                   <th>
// //                     Logo <FaSort className="sorticon" />
// //                   </th>
// //                   <th>
// //                     Social Media Link <FaSort className="sorticon" />
// //                   </th>
// //                   <th>
// //                     Domain Of Startup <FaSort className="sorticon" />
// //                   </th>
// //                   <th>
// //                     Team Size <FaSort className="sorticon" />
// //                   </th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 <tr>
// //                   <td colSpan="8" className="no-founder">
// //                     <div className="no-founder-content">
// //                       <img src="drishtilogo.jpg" alt="Logo" />
// //                       <h4>No Startup Added Yet</h4>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             </table>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Startup;
