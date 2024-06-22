import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaRocket,
  FaTicketAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoDocumentLock } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdFileUpload } from "react-icons/md";
import "./StartupLegal.css";
import "../Shared/Sidebar.css";

const StartupLegal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform upload logic here
      console.log("Uploading file:", selectedFile);
      handleCloseModal();
    } else {
      console.log("No file selected.");
    }
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

      <main className="custom-main-content">
        <header className="custom-header">
          <span className="custom-founder">
            <FiMenu style={{ color: "#909090" }} /> Startup Legal
          </span>
          <input type="text" placeholder="Search here" className="custom-search-bar" />
          <div className="custom-profile-section">
            <div>
              <FaBell className="custom-notification-icon" />
            </div>
            <div className="custom-user-info">
              <img src="/navbar/profilepicture.png" alt="User Avatar" className="custom-user-initials" />
              <div className="custom-user-details">
                <span className="custom-user-name">
                  Mr. Amit Rathod <RiArrowDropDownLine className="custom-drop" />
                </span>
                <br />
                <span className="custom-user-email">Amit@mail.com</span>
              </div>
            </div>
          </div>
        </header>

        <section className="custom-content">
          <div className="custom-documents-container">
            <div className="custom-content-header">
              <h2>Main Documents</h2>
            </div>
            <div className="custom-documents-list">
              <div className="custom-document-item">
                <div className="custom-document-text">
                  <span>Upload Pitch Deck <span className="custom-star">*</span></span>
                  <span className="custom-mandatory">Mandatory</span>
                </div>
                <label className="custom-upload-file-button" onClick={handleOpenModal}>
                  Upload File
                </label>
              </div>
              <div className="custom-document-item">
                <div className="custom-document-text">
                  <span>Upload One Pager <span className="custom-star">*</span></span>
                  <span className="custom-mandatory">Mandatory</span>
                </div>
                <label className="custom-upload-file-button" onClick={handleOpenModal}>
                  Upload File
                </label>
              </div>

              <div className="custom-content-header">
                <h2>Additional Documents</h2>
              </div>
              {[
                { name: "CIN", mandatory: true },
                { name: "DIPP", mandatory: true },
                { name: "Current Corporate Structure", mandatory: true },
                { name: "List of Customers (if any)", mandatory: false },
                { name: "AOA", mandatory: true },
                { name: "Company PAN", mandatory: false },
                { name: "Granted Patent", mandatory: false },
                { name: "List of Investors (if any)", mandatory: false },
                { name: "MOA", mandatory: true },
                { name: "Current Shareholding Pattern", mandatory: true },
                { name: "Filed Patent", mandatory: false },
                { name: "Certifications (ISO/MSME/Udyam/CDSCO etc.)", mandatory: false },
              ].map((doc, index) => (
                <div className="custom-document-item" key={index}>
                  <div className="custom-document-text">
                    <span>Upload {doc.name} {doc.mandatory && <span className="custom-star">*</span>}</span>
                    {doc.mandatory && <span className="custom-mandatory">Mandatory</span>}
                  </div>
                  <label className="custom-upload-file-button" onClick={handleOpenModal}>
                    Upload File
                  </label>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h2>Upload Document</h2>
            <p>Supports Only PDF Format</p>
            <div className="custom-upload-area">
              <MdFileUpload className="custom-upload-icon" />
              <p>Drag and drop file here</p>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </div>
            <button className="custom-upload-button" onClick={handleUpload}>Upload</button>
            <button className="custom-cancel-button" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupLegal;








//////////bf pdf modal

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri"; 
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css"; 

// const StartupLegal = () => {
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

//       <main className="custom-main-content">
//         <header className="custom-header">
//           <span className="custom-founder">
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
//           </span>
//           <input type="text" placeholder="Search here" className="custom-search-bar" />
//           <div className="custom-profile-section">
//             <div>
//               <FaBell className="custom-notification-icon" />
//             </div>
//             <div className="custom-user-info">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="custom-user-initials" />
//               <div className="custom-user-details">
//                 <span className="custom-user-name">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="custom-drop" />
//                 </span>
//                 <br />
//                 <span className="custom-user-email">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="custom-content">
//           <div className="custom-documents-container">
//             <div className="custom-content-header">
//               <h2>Main Documents</h2>
//             </div>
//             <div className="custom-documents-list">
//               <div className="custom-document-item">
//                 <div className="custom-document-text">
//                   <span>Upload Pitch Deck <span className="custom-star">*</span></span>
//                   <span className="custom-mandatory">Mandatory</span>
//                 </div>
//                 <label className="custom-upload-file-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//               <div className="custom-document-item">
//                 <div className="custom-document-text">
//                   <span>Upload One Pager <span className="custom-star">*</span></span>
//                   <span className="custom-mandatory">Mandatory</span>
//                 </div>
//                 <label className="custom-upload-file-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>

//               <div className="custom-content-header">
//                 <h2>Additional Documents</h2>
//               </div>
//               {[
//                 { name: "CIN", mandatory: true },
//                 { name: "DIPP", mandatory: true },
//                 { name: "Current Corporate Structure", mandatory: true },
//                 { name: "List of Customers (if any)", mandatory: false },
//                 { name: "AOA", mandatory: true },
//                 { name: "Company PAN", mandatory: false },
//                 { name: "Granted Patent", mandatory: false },
//                 { name: "List of Investors (if any)", mandatory: false },
//                 { name: "MOA", mandatory: true },
//                 { name: "Current Shareholding Pattern", mandatory: true },
//                 { name: "Filed Patent", mandatory: false },
//                 { name: "Certifications (ISO/MSME/Udyam/CDSCO etc.)", mandatory: false },
//               ].map((doc, index) => (
//                 <div className="custom-document-item" key={index}>
//                   <div className="custom-document-text">
//                     <span>Upload {doc.name} {doc.mandatory && <span className="custom-star">*</span>}</span>
//                     {doc.mandatory && <span className="custom-mandatory">Mandatory</span>}
//                   </div>
//                   <label className="custom-upload-file-button">
//                     Upload File
//                     <input type="file" />
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;




// // /* /////good  work  no scrool */

// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css"; 
// const StartupLegal = () => {
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

//       <main className="custom-main-content">
//         <header className="custom-header">
//           <span className="custom-founder">
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
//           </span>
//           <input type="text" placeholder="Search here" className="custom-search-bar" />
//           <div className="custom-profile-section">
//             <div>
//               <FaBell className="custom-notification-icon" />
//             </div>
//             <div className="custom-user-info">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="custom-user-initials" />
//               <div className="custom-user-details">
//                 <span className="custom-user-name">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="custom-drop" />
//                 </span>
//                 <br />
//                 <span className="custom-user-email">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="custom-content">
//           <div className="custom-documents-container">
//             <div className="custom-content-header">
//               <h2>Main Documents</h2>
//             </div>
//             <div className="custom-documents-list">
//               <div className="custom-document-item">
//                 <div className="custom-document-text">
//                   <span>Upload Pitch Deck *</span>
//                   <span className="custom-mandatory">Mandatory</span>
//                 </div>
//                 <label className="custom-upload-file-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//               <div className="custom-document-item">
//                 <div className="custom-document-text">
//                   <span>Upload One Pager *</span>
//                   <span className="custom-mandatory">Mandatory</span>
//                 </div>
//                 <label className="custom-upload-file-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>

//               <div className="custom-content-header">
//                 <h2>Additional Documents</h2>
//               </div>
//               {[
//                 "CIN",
//                 "DIPP",
//                 "Current Corporate Structure",
//                 "List of Customers (if any)",
//                 "AOA",
//                 "Company PAN",
//                 "Granted Patent",
//                 "List of Investors (if any)",
//                 "MOA",
//                 "Current Shareholding Pattern",
//                 "Filed Patent",
//                 "Certifications (ISO/MSME/Udyam/CDSCO etc.)",
//               ].map((doc, index) => (
//                 <div className="custom-document-item" key={index}>
//                   <div className="custom-document-text">
//                     <span>Upload {doc} *</span>
//                     {index < 5 && <span className="custom-mandatory">Mandatory</span>}
//                   </div>
//                   <label className="custom-upload-file-button">
//                     Upload File
//                     <input type="file" />
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;













// ///////////responsive but scrool



// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css";

// const StartupLegal = () => {
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
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
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
//             <h2>Main Documents</h2>
//           </div>
//           <div className="documents-list">
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload Pitch Deck *</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="upload-file-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload One Pager *</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="upload-file-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//           </div>

//           <div className="content-header">
//             <h2>Additional Documents</h2>
//           </div>
//           <div className="documents-list">
//             {[
//               "CIN",
//               "DIPP",
//               "Current Corporate Structure",
//               "List of Customers (if any)",
//               "AOA",
//               "Company PAN",
//               "Granted Patent",
//               "List of Investors (if any)",
//               "MOA",
//               "Current Shareholding Pattern",
//               "Filed Patent",
//               "Certifications (ISO/MSME/Udyam/CDSCO etc.)",
//             ].map((doc, index) => (
//               <div className="document-item" key={index}>
//                 <div className="document-text">
//                   <span>Upload {doc} *</span>
//                   {index < 5 && <span className="mandatory">Mandatory</span>}
//                 </div>
//                 <label className="upload-file-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;


















//////////////////// not responsive
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css";

// const StartupLegal = () => {
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
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
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
//             <h2>Main Documents</h2>
//           </div>
//           <div className="documents-list">
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload Pitch Deck *</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="upload-file-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload One Pager *</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="upload-file-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//           </div>

//           <div className="content-header">
//             <h2>Additional Documents</h2>
//           </div>
//           <div className="documents-list">
//             {[
//               "CIN",
//               "DIPP",
//               "Current Corporate Structure",
//               "List of Customers (if any)",
//               "AOA",
//               "Company PAN",
//               "Granted Patent",
//               "List of Investors (if any)",
//               "MOA",
//               "Current Shareholding Pattern",
//               "Filed Patent",
//               "Certifications (ISO/MSME/Udyam/CDSCO etc.)",
//             ].map((doc, index) => (
//               <div className="document-item" key={index}>
//                 <div className="document-text">
//                   <span>Upload {doc} *</span>
//                   {index < 5 && <span className="mandatory">Mandatory</span>}
//                 </div>
//                 <label className="upload-file-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;








































// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css";

// const StartupLegal = () => {
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
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
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
//             <h2>Main Documents</h2>
//           </div>
//           <div className="documents-list">
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload Pitch Deck</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="custom-upload-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload One Pager</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="custom-upload-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//           </div>

//           <div className="content-header">
//             <h2>Additional Documents</h2>
//           </div>
//           <div className="documents-list">
//             {[
//               "CIN",
//               "DIPP",
//               "Current Corporate Structure",
//               "List of Customers (if any)",
//               "AOA",
//               "Company PAN",
//               "Granted Patent",
//               "List of Investors (if any)",
//               "MOA",
//               "Current Shareholding Pattern",
//               "Filed Patent",
//               "Certifications (ISO/MSME/Udyam/CDSCO etc.)",
//             ].map((doc, index) => (
//               <div className="document-item" key={index}>
//                 <div className="document-text">
//                   <span>Upload {doc}</span>
//                   {index < 5 && <span className="mandatory">Mandatory</span>}
//                 </div>
//                 <label className="custom-upload-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;





/////good form
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css";

// const StartupLegal = () => {
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
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
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
//             <h2>Main Documents</h2>
//           </div>
//           <div className="documents-list">
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload Pitch Deck</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="custom-upload-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload One Pager</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="custom-upload-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//           </div>

//           <div className="content-header">
//             <h2>Additional Documents</h2>
//           </div>
//           <div className="documents-list">
//             {[
//               "CIN",
//               "DIPP",
//               "Current Corporate Structure",
//               "List of Customers (if any)",
//               "AOA",
//               "Company PAN",
//               "Granted Patent",
//               "List of Investors (if any)",
//               "MOA",
//               "Current Shareholding Pattern",
//               "Filed Patent",
//               "Certifications (ISO/MSME/Udyam/CDSCO etc.)",
//             ].map((doc, index) => (
//               <div className="document-item" key={index}>
//                 <div className="document-text">
//                   <span>Upload {doc}</span>
//                   {index < 5 && <span className="mandatory">Mandatory</span>}
//                 </div>
//                 <label className="custom-upload-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;











// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaBell,
//   FaRocket,
//   FaTicketAlt,
//   FaUserCircle,
// } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";
// import "../Shared/Sidebar.css";

// const StartupLegal = () => {
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
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
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
//             <h2>Main Documents</h2>
//           </div>
//           <div className="documents-list">
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload Pitch Deck</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="upload-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//             <div className="document-item">
//               <div className="document-text">
//                 <span>Upload One Pager</span>
//                 <span className="mandatory">Mandatory</span>
//               </div>
//               <label className="upload-button">
//                 Upload File
//                 <input type="file" />
//               </label>
//             </div>
//           </div>

//           <div className="content-header">
//             <h2>Additional Documents</h2>
//           </div>
//           <div className="documents-list">
//             {[
//               "CIN",
//               "DIPP",
//               "Current Corporate Structure",
//               "List of Customers (if any)",
//               "AOA",
//               "Company PAN",
//               "Granted Patent",
//               "List of Investors (if any)",
//               "MOA",
//               "Current Shareholding Pattern",
//               "Filed Patent",
//               "Certifications (ISO/MSME/Udyam/CDSCO etc.)",
//             ].map((doc, index) => (
//               <div className="document-item" key={index}>
//                 <div className="document-text">
//                   <span>Upload {doc}</span>
//                   {index < 5 && <span className="mandatory">Mandatory</span>}
//                 </div>
//                 <label className="upload-button">
//                   Upload File
//                   <input type="file" />
//                 </label>
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupLegal;










////
///StartupLegal.jsx
// // src/components/StartupLegal/StartupLegal.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { FaBell, FaRocket, FaTicketAlt, FaUserCircle } from "react-icons/fa";
// import { FiMenu } from "react-icons/fi";
// import { IoDocumentLock } from "react-icons/io5";
// import { IoIosDocument } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./StartupLegal.css";

// const StartupLegal = () => {
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
//               <li >
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
//             <FiMenu style={{ color: "#909090" }} /> Startup Legal
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar" />
//           <div className="profile-section">
//             <div >
//               <FaBell className="notification-icon"/>
//             </div>
//             <div className="user-info">
//               {/* <span className="user-initials">Amit</span> */}
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
//             <h2>List of Legal Documents</h2>
//             <button className="add-legal-documunt-button">+ Add Legal Document</button>
//           </div>
//           <div className="founders-list">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Document Name</th>
//                   <th>Type</th>
//                   <th>Date Added</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td colSpan="4" className="no-founder">
//                     <div className="no-founder-content">
//                     <img src="/founders/nostartupadd.jpg" alt="Logo" style={{marginTop:"70px", width:"120px", height:"120px"}}/>
//                     <h4>No Legal Documents Added Yet</h4>
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

// export default StartupLegal;
