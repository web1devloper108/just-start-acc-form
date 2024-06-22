import React from 'react';
import { useLocation, Link } from 'react-router-dom';
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
import './StartupDetail.css';
import '../Shared/Sidebar.css';

const StartupDetail = () => {
  const location = useLocation();
  const { startup } = location.state;

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
              <li className="active">
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
            <FiMenu style={{ color: "#909090" }} /> Startup General
          </span>
          <input type="text" placeholder="Search here" className="search-bar" />
          <div className="profile-section">
            <div >
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
            <h2>Startup Information</h2>
          </div>
          <div className="startup-detail">
            <div className="detail-card">
                <div style={{display:'flex', gap:'30px'}}>
              <div className="logo-container">
                <img src={URL.createObjectURL(startup.logo)} alt="logo" className="logo" />
              </div>
                    <div>
              <h2 className="company-name">DRISHTI CPS Foundation</h2>
                   </div>
                </div>
              <div className="info-row">
                <div className="info-item-first">
                  <p><span className="label">Startup:</span> <span className="value" style={{fontWeight:'400'}}>{startup.stage}</span></p>
                  <p><span className="label">Registered Office Location:</span> <span className="value" style={{fontWeight:'lighter'}}>{startup.location}</span></p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <p><span className="label" style={{width:'100px'}}>One liner of your startup (45 Words):</span> <span className="value">{startup.oneLiner}</span></p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <p><span className="label">Website:</span> <span className="value">{startup.website}</span></p>
                </div>
                <div className="info-item">
                  <p><span className="label">   Type of Service:</span> <span className="value">{startup.service}</span></p>
                </div>
                <div className="info-item">
                  <p><span className="label">Incubated:</span> <span className="value">{startup.incubated}</span></p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <p><span className="label">Brief Description (250 Words):</span> <span className="value">{startup.description}</span></p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <p><span className="label">Social Media Link:</span> <span className="value">{startup.socialMedia}</span></p>
                </div>
                <div className="info-item">
                  <p><span className="label">Domain of Startup:</span> <span className="value">{startup.domain}</span></p>
                </div>
                <div className="info-item">
                  <p><span className="label">Team Size:</span> <span className="value">{startup.teamSize}</span></p>
                </div>
              </div>
              <div className="info-row">
                <div className="info-item">
                  <p><span className="label">Startup support you are looking for?:</span> <span className="value">{startup.support}</span></p>
                </div>
                <div className="info-item">
                  <p><span className="label">Startup Postal Address:</span> <span className="value">{startup.address}</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StartupDetail;






























////ok mongooooooooooo
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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="startup-info">
//               <h3>{startup.name}</h3>
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="label">Startup:</span>
//                   <span className="value">{startup.stage}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Registered Office Location:</span>
//                   <span className="value">{startup.location}</span>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="label">One liner of your startup (45 Words):</span>
//                   <span className="value">{startup.oneLiner}</span>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="label">Website:</span>
//                   <span className="value">{startup.website}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Type of Service:</span>
//                   <span className="value">{startup.service}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Incubated:</span>
//                   <span className="value">{startup.incubated}</span>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="label">Brief Description (250 Words):</span>
//                   <span className="value">{startup.description}</span>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="label">Social Media Link:</span>
//                   <span className="value">{startup.socialMedia}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Domain of Startup:</span>
//                   <span className="value">{startup.domain}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Team Size:</span>
//                   <span className="value">{startup.teamSize}</span>
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <span className="label">Startup support you are looking for?:</span>
//                   <span className="value">{startup.support}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Startup Postal Address:</span>
//                   <span className="value">{startup.address}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;





// ok page format45
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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="startup-info">
//               <div className="info-header">
//                 <img src="drishtilogo.jpg" alt="logo" className="startup-logo" />
//                 <h3>Drishti CPS Foundation Pvt. Ltd.</h3>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <strong>Startup:</strong> Early-Stage
//                 </div>
//                 <div className="info-item">
//                   <strong>Registered Office Location:</strong> 1901 Thornridge Cir. Shiloh, Hawaii 81063
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <strong>One liner of your startup (45 Words):</strong> Lorem ipsum dolor sit amet consectetur. Eu in vel ullamcorper molestie. Mauris bibendum lectus tincidunt ut morbi nisi neque ornare feugiat. Dictum leo interdum arcu viverra rhoncus quis vitae dictum posuere. Facilisis massa iaculis scelerisque vestibulum id montes a et. Tellus viverra dictum id at.
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <strong>Website:</strong> http://website01.com
//                 </div>
//                 <div className="info-item">
//                   <strong>Type of Service:</strong> Service 01
//                 </div>
//                 <div className="info-item">
//                   <strong>Incubated:</strong> Yes
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <strong>Brief Description (250 Words):</strong> Lorem ipsum dolor sit amet consectetur. Id dignissim amet condimentum non erat in dolor euismod sit. Nunc massa egestas vitae euismod. Arcu amet diam sed habitasse vel cursus quam placerat. Varius hendrerit etiam varius sed pellentesque amet enim sit cursus. Augue cursus habitant cursus ornare auctor proin at ut. Bibendum nam mauris tortor faucibus venenatis varius porta nunc netus. Fames purus consequat massa quis tristique nibh sollicitudin orci egestas. At vestibulum sed convallis porta. Amet aliquam ultricies vel sagittis nullam eget. Facilisis molestie viverra orci at aliquam in adipiscing. Et vulputate at augue purus. Pretium velit sed est arcu pellentesque orci convallis. Lorem eget pellentesque tellus tellus ullamcorper nisi.
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <strong>Social Media Link:</strong> http://facebook.com/user 1
//                 </div>
//                 <div className="info-item">
//                   <strong>Domain of Startup:</strong> http://startup.com/user 1
//                 </div>
//                 <div className="info-item">
//                   <strong>Team Size:</strong> 20
//                 </div>
//               </div>
//               <div className="info-row">
//                 <div className="info-item">
//                   <strong>Startup support you are looking for?</strong> Yes
//                 </div>
//                 <div className="info-item">
//                   <strong>Startup Postal Address:</strong> 6391 Elgin St. Celina, Delaware 10299
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;



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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="detail-card">
//               <div className="logo-container">
//                 <img src={URL.createObjectURL(startup.logo)} alt="logo" className="logo" />
//               </div>
//               <h2 className="company-name">Drishti CPS Foundation Pvt. Ltd.</h2>
//               <div className="info-grid">
//                 <div className="info-item">
//                   <span className="label">Startup</span>
//                   <span className="value">{startup.stage}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Registered Office Location</span>
//                   <span className="value">{startup.location}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">One liner of your startup (45 Words)</span>
//                   <span className="value">{startup.oneLiner}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Website</span>
//                   <span className="value">{startup.website}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Type of Service</span>
//                   <span className="value">{startup.service}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Incubated</span>
//                   <span className="value">{startup.incubated}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Brief Description (250 Words)</span>
//                   <span className="value">{startup.description}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Social Media Link</span>
//                   <span className="value">{startup.socialMedia}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Domain of Startup</span>
//                   <span className="value">{startup.domain}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Team Size</span>
//                   <span className="value">{startup.teamSize}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Startup support you are looking for?</span>
//                   <span className="value">{startup.support}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Startup Postal Address</span>
//                   <span className="value">{startup.address}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;





/// //ok nav side info list
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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="detail-card">
//               <div className="logo-container">
//                 <img src={URL.createObjectURL(startup.logo)} alt="logo" className="logo" />
//               </div>
//               <h2 className="company-name">Drishti CPS Foundation Pvt. Ltd.</h2>
//               <div className="info-grid">
//                 <div className="info-item">
//                   <span className="label">Startup</span>
//                   <span className="value">{startup.stage}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Registered Office Location</span>
//                   <span className="value">{startup.location}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">One liner of your startup (45 Words)</span>
//                   <span className="value">{startup.oneLiner}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Website</span>
//                   <span className="value">{startup.website}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Type of Service</span>
//                   <span className="value">{startup.service}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Incubated</span>
//                   <span className="value">{startup.incubated}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Brief Description (250 Words)</span>
//                   <span className="value">{startup.description}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Social Media Link</span>
//                   <span className="value">{startup.socialMedia}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Domain of Startup</span>
//                   <span className="value">{startup.domain}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Team Size</span>
//                   <span className="value">{startup.teamSize}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Startup support you are looking for?</span>
//                   <span className="value">{startup.support}</span>
//                 </div>
//                 <div className="info-item">
//                   <span className="label">Startup Postal Address</span>
//                   <span className="value">{startup.address}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;






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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="startup-info">
//               <h3>{startup.name}</h3>
//               <p><strong>Startup Stage:</strong> {startup.stage}</p>
//               <p><strong>Registered Office Location:</strong> {startup.location}</p>
//               <p><strong>One Liner of Your Startup:</strong> {startup.oneLiner}</p>
//               <p><strong>Website:</strong> {startup.website}</p>
//               <p><strong>Brief Description:</strong> {startup.description}</p>
//               <p><strong>Type of Service:</strong> {startup.service}</p>
//               <p><strong>Incubated:</strong> {startup.incubated}</p>
//               <p><strong>Looking for startup support?:</strong> {startup.support}</p>
//               <p><strong>Social Media Link:</strong> {startup.socialMedia}</p>
//               <p><strong>Domain Of Startup:</strong> {startup.domain}</p>
//               <p><strong>Team Size:</strong> {startup.teamSize}</p>
//               <p><strong>Startup Postal Address:</strong> {startup.address}</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;


///only detail no nav   side
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './StartupDetail.css';

// const StartupDetail = () => {
//   const { state } = useLocation();
//   const { startup } = state;

//   return (
//     <div className="startup-detail">
//       <header className="header">
//         <span className="title">Startup Information</span>
//       </header>
//       <section className="content">
//         <div className="detail-card">
//           <div className="logo-container">
//             <img src={URL.createObjectURL(startup.logo)} alt="logo" className="logo" />
//           </div>
//           <h2 className="company-name">Drishti CPS Foundation Pvt. Ltd.</h2>
//           <div className="info-grid">
//             <div className="info-item">
//               <span className="label">Startup</span>
//               <span className="value">{startup.stage}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Registered Office Location</span>
//               <span className="value">{startup.location}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">One liner of your startup (45 Words)</span>
//               <span className="value">{startup.oneLiner}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Website</span>
//               <span className="value">{startup.website}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Type of Service</span>
//               <span className="value">{startup.service}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Incubated</span>
//               <span className="value">{startup.incubated}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Brief Description (250 Words)</span>
//               <span className="value">{startup.description}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Social Media Link</span>
//               <span className="value">{startup.socialMedia}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Domain of Startup</span>
//               <span className="value">{startup.domain}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Team Size</span>
//               <span className="value">{startup.teamSize}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Startup support you are looking for?</span>
//               <span className="value">{startup.support}</span>
//             </div>
//             <div className="info-item">
//               <span className="label">Startup Postal Address</span>
//               <span className="value">{startup.address}</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default StartupDetail;








//////full dash with detail
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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="startup-info">
//               <h3>{startup.name}</h3>
//               <p><strong>Startup Stage:</strong> {startup.stage}</p>
//               <p><strong>Registered Office Location:</strong> {startup.location}</p>
//               <p><strong>One Liner of Your Startup:</strong> {startup.oneLiner}</p>
//               <p><strong>Website:</strong> {startup.website}</p>
//               <p><strong>Brief Description:</strong> {startup.description}</p>
//               <p><strong>Type of Service:</strong> {startup.service}</p>
//               <p><strong>Incubated:</strong> {startup.incubated}</p>
//               <p><strong>Looking for startup support?:</strong> {startup.support}</p>
//               <p><strong>Social Media Link:</strong> {startup.socialMedia}</p>
//               <p><strong>Domain Of Startup:</strong> {startup.domain}</p>
//               <p><strong>Team Size:</strong> {startup.teamSize}</p>
//               <p><strong>Startup Postal Address:</strong> {startup.address}</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;




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
// import './StartupDetail.css';
// import '../Shared/Sidebar.css';

// const StartupDetail = () => {
//   const location = useLocation();
//   const { startup } = location.state;

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
//             <h2>Startup Information</h2>
//           </div>
//           <div className="startup-detail">
//             <div className="startup-info">
//               <h3>{startup.name}</h3>
//               <p><strong>Startup Stage:</strong> {startup.stage}</p>
//               <p><strong>Registered Office Location:</strong> {startup.location}</p>
//               <p><strong>One Liner of Your Startup:</strong> {startup.oneLiner}</p>
//               <p><strong>Website:</strong> {startup.website}</p>
//               <p><strong>Brief Description:</strong> {startup.description}</p>
//               <p><strong>Type of Service:</strong> {startup.service}</p>
//               <p><strong>Incubated:</strong> {startup.incubated}</p>
//               <p><strong>Looking for startup support?:</strong> {startup.support}</p>
//               <p><strong>Social Media Link:</strong> {startup.socialMedia}</p>
//               <p><strong>Domain Of Startup:</strong> {startup.domain}</p>
//               <p><strong>Team Size:</strong> {startup.teamSize}</p>
//               <p><strong>Startup Postal Address:</strong> {startup.address}</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;




// import React from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router";
// import "./StartupDetail.css"; // Import the CSS file

// const StartupDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const startup = location.state?.startup;

//   if (!startup) {
//     return <div>No startup details available.</div>;
//   }

//   return (
//     <div className="dashboard">
//       <main className="main-content">
//         <section className="content">
//           <div className="content-header">
//             <h2>Startup Information</h2>
//           </div>
//           <div className="founders-list">
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Startup</td>
//                   <td>{startup.stage}</td>
//                 </tr>
//                 <tr>
//                   <td>Registered Office Location</td>
//                   <td>{startup.location}</td>
//                 </tr>
//                 <tr>
//                   <td>One liner of your startup (45 Words)</td>
//                   <td>{startup.oneLiner}</td>
//                 </tr>
//                 <tr>
//                   <td>Logo</td>
//                   <td>
//                     {startup.logo.name.endsWith(".pdf") ? (
//                       <a href={URL.createObjectURL(startup.logo)} target="_blank" rel="noopener noreferrer">PDF</a>
//                     ) : (
//                       <img src={URL.createObjectURL(startup.logo)} alt="logo" style={{ width: "50px", height: "50px" }} />
//                     )}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Social Media Link</td>
//                   <td>{startup.socialMedia}</td>
//                 </tr>
//                 <tr>
//                   <td>Domain of Startup</td>
//                   <td>{startup.domain}</td>
//                 </tr>
//                 <tr>
//                   <td>Team Size</td>
//                   <td>{startup.teamSize}</td>
//                 </tr>
//                 <tr>
//                   <td>Website</td>
//                   <td>{startup.website}</td>
//                 </tr>
//                 <tr>
//                   <td>Brief Description (250 Words)</td>
//                   <td>{startup.description}</td>
//                 </tr>
//                 <tr>
//                   <td>Type of Service</td>
//                   <td>{startup.service}</td>
//                 </tr>
//                 <tr>
//                   <td>Incubated</td>
//                   <td>{startup.incubated}</td>
//                 </tr>
//                 <tr>
//                   <td>Startup support you are looking for?</td>
//                   <td>{startup.support}</td>
//                 </tr>
//                 <tr>
//                   <td>Startup Postal Address</td>
//                   <td>{startup.address}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;







// import React from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router";

// const StartupDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const startup = location.state?.startup;

//   if (!startup) {
//     return <div>No startup details available.</div>;
//   }

//   return (
//     <div className="dashboard">
//       <main className="main-content">
//         <section className="content">
//           <div className="content-header">
//             <h2>Startup Information</h2>
//           </div>
//           <div className="founders-list">
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Startup Stage</td>
//                   <td>{startup.stage}</td>
//                 </tr>
//                 <tr>
//                   <td>Registered Office Location</td>
//                   <td>{startup.location}</td>
//                 </tr>
//                 <tr>
//                   <td>One Line of Your Startup</td>
//                   <td>{startup.oneLiner}</td>
//                 </tr>
//                 <tr>
//                   <td>Logo</td>
//                   <td>
//                     {startup.logo.name.endsWith(".pdf") ? (
//                       <a href={URL.createObjectURL(startup.logo)} target="_blank" rel="noopener noreferrer">PDF</a>
//                     ) : (
//                       <img src={URL.createObjectURL(startup.logo)} alt="logo" style={{ width: "50px", height: "50px" }} />
//                     )}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Social Media Link</td>
//                   <td>{startup.socialMedia}</td>
//                 </tr>
//                 <tr>
//                   <td>Domain Of Startup</td>
//                   <td>{startup.domain}</td>
//                 </tr>
//                 <tr>
//                   <td>Team Size</td>
//                   <td>{startup.teamSize}</td>
//                 </tr>
//                 <tr>
//                   <td>Website</td>
//                   <td>{startup.website}</td>
//                 </tr>
//                 <tr>
//                   <td>Brief Description</td>
//                   <td>{startup.description}</td>
//                 </tr>
//                 <tr>
//                   <td>Type of Service</td>
//                   <td>{startup.service}</td>
//                 </tr>
//                 <tr>
//                   <td>Incubated</td>
//                   <td>{startup.incubated}</td>
//                 </tr>
//                 <tr>
//                   <td>Looking for startup support?</td>
//                   <td>{startup.support}</td>
//                 </tr>
//                 <tr>
//                   <td>Startup Portal Address</td>
//                   <td>{startup.address}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;




// import React from "react";
// import { useParams } from "react-router-dom";
// import { useLocation } from "react-router";

// const StartupDetail = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const startup = location.state?.startup;

//   if (!startup) {
//     return <div>No startup details available.</div>;
//   }

//   return (
//     <div className="dashboard">
//       <main className="main-content">
//         <section className="content">
//           <div className="content-header">
//             <h2>Startup Information</h2>
//           </div>
//           <div className="founders-list">
//             <table>
//               <tbody>
//                 <tr>
//                   <td>Startup Stage</td>
//                   <td>{startup.stage}</td>
//                 </tr>
//                 <tr>
//                   <td>Registered Office Location</td>
//                   <td>{startup.location}</td>
//                 </tr>
//                 <tr>
//                   <td>One Line of Your Startup</td>
//                   <td>{startup.oneLiner}</td>
//                 </tr>
//                 <tr>
//                   <td>Logo</td>
//                   <td>
//                     {startup.logo.name.endsWith(".pdf") ? (
//                       <a href={URL.createObjectURL(startup.logo)} target="_blank" rel="noopener noreferrer">PDF</a>
//                     ) : (
//                       <img src={URL.createObjectURL(startup.logo)} alt="logo" style={{ width: "50px", height: "50px" }} />
//                     )}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Social Media Link</td>
//                   <td>{startup.socialMedia}</td>
//                 </tr>
//                 <tr>
//                   <td>Domain Of Startup</td>
//                   <td>{startup.domain}</td>
//                 </tr>
//                 <tr>
//                   <td>Team Size</td>
//                   <td>{startup.teamSize}</td>
//                 </tr>
//                 <tr>
//                   <td>Website</td>
//                   <td>{startup.website}</td>
//                 </tr>
//                 <tr>
//                   <td>Brief Description</td>
//                   <td>{startup.description}</td>
//                 </tr>
//                 <tr>
//                   <td>Type of Service</td>
//                   <td>{startup.service}</td>
//                 </tr>
//                 <tr>
//                   <td>Incubated</td>
//                   <td>{startup.incubated}</td>
//                 </tr>
//                 <tr>
//                   <td>Looking for startup support?</td>
//                   <td>{startup.support}</td>
//                 </tr>
//                 <tr>
//                   <td>Startup Portal Address</td>
//                   <td>{startup.address}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StartupDetail;
