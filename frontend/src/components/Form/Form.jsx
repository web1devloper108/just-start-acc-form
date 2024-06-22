// Form.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import AddNewFormModal from './AddNewFormModal';
import EditFormModal from './EditFormModal';
import './Form.css';
import '../Shared/Sidebar.css';

const Form = () => {
  const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [forms, setForms] = useState(() => {
    const savedForms = localStorage.getItem('forms');
    return savedForms ? JSON.parse(savedForms) : [];
  });
  const [currentForm, setCurrentForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('forms', JSON.stringify(forms));
  }, [forms]);

  const toggleStartupGeneral = () => {
    setIsStartupGeneralOpen(!isStartupGeneralOpen);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openEditModal = (form) => {
    setCurrentForm(form);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentForm(null);
  };

  const addForm = (formData) => {
    setForms([...forms, formData]);
  };

  const updateForm = (updatedForm) => {
    setForms(forms.map(form => form.title === updatedForm.title ? updatedForm : form));
  };

  const duplicateForm = (formToDuplicate) => {
    const duplicatedForm = { ...formToDuplicate, title: `${formToDuplicate.title} (Copy)` };
    setForms([...forms, duplicatedForm]);
  };

  const deleteForm = (formToDelete) => {
    setForms(forms.filter(form => form.title !== formToDelete.title));
  };

  const handleFormClick = (form) => {
    navigate(`/form/${form.title}`, { state: { form } });
  };

  return (
    <div className="dashboard-form">
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

      <main className="main-content-form">
        <header className="header-form">
          <span className="founder-form">
            <FiMenu style={{ color: '#909090' }} /> Form
          </span>
          <input type="text" placeholder="Search here" className="search-bar-form" />
          <div className="profile-section-form">
            <div>
              <FaBell className="notification-icon-form" />
            </div>
            <div className="user-info-form">
              <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials-form" />
              <div className="user-details-form">
                <span className="user-name-form">
                  Mr. Amit Rathod <RiArrowDropDownLine className="drop-form" />
                </span>
                <br />
                <span className="user-email-form">Amit@mail.com</span>
              </div>
            </div>
          </div>
        </header>

        <section className="content-form">
          <div className="content-header-form">
            <h2>Forms</h2>
            <button className="add-form-button" onClick={openAddModal}>+ Add New</button>
          </div>
          <div className="form-list-form">
            <div className="form-filters-form">
              <button className="filter-button-form">Filters</button>
              <input type="text" placeholder="Search Form" className="search-form-input" />
            </div>
            <table className="form-table-form">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Last Modified</th>
                  <th>Category</th>
                  <th>Label</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, index) => (
                  <tr key={index}>
                    <td onClick={() => handleFormClick(form)} className="form-title">{form.title}</td>
                    <td>{form.lastModified}</td>
                    <td>{form.category}</td>
                    <td>{form.label}</td>
                    <td>{form.status}</td>
                    <td>
                      <button className="action-button-form edit" onClick={() => openEditModal(form)}>Edit</button>
                      <button className="action-button-form duplicate" onClick={() => duplicateForm(form)}>Duplicate</button>
                      <button className="action-button-form delete" onClick={() => deleteForm(form)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-form">
              <span>Showing 1 - {forms.length} of {forms.length} Results</span>
              <select className="view-select-form">
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </section>
        {isAddModalOpen && <AddNewFormModal closeModal={closeAddModal} addForm={addForm} />}
        {isEditModalOpen && <EditFormModal closeModal={closeEditModal} form={currentForm} updateForm={updateForm} />}
      </main>
    </div>
  );
};

export default Form;




















// // Form.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
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
// import AddNewFormModal from './AddNewFormModal';
// import EditFormModal from './EditFormModal';
// import './Form.css';
// import '../Shared/Sidebar.css';

// const Form = () => {
//   const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [forms, setForms] = useState(() => {
//     const savedForms = localStorage.getItem('forms');
//     return savedForms ? JSON.parse(savedForms) : [];
//   });
//   const [currentForm, setCurrentForm] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('forms', JSON.stringify(forms));
//   }, [forms]);

//   const toggleStartupGeneral = () => {
//     setIsStartupGeneralOpen(!isStartupGeneralOpen);
//   };

//   const openAddModal = () => {
//     setIsAddModalOpen(true);
//   };

//   const closeAddModal = () => {
//     setIsAddModalOpen(false);
//   };

//   const openEditModal = (form) => {
//     setCurrentForm(form);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setCurrentForm(null);
//   };

//   const addForm = (formData) => {
//     setForms([...forms, formData]);
//   };

//   const updateForm = (updatedForm) => {
//     setForms(forms.map(form => form.title === updatedForm.title ? updatedForm : form));
//   };

//   const duplicateForm = (formToDuplicate) => {
//     const duplicatedForm = { ...formToDuplicate, title: `${formToDuplicate.title} (Copy)` };
//     setForms([...forms, duplicatedForm]);
//   };

//   const deleteForm = (formToDelete) => {
//     setForms(forms.filter(form => form.title !== formToDelete.title));
//   };

//   const handleFormClick = (form) => {
//     navigate(`/form/${form.title}`, { state: { form } });
//   };

//   return (
//     <div className="dashboard-form">
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
//               <li onClick={toggleStartupGeneral}>
//                 <div className="dropdown-header-new">
//                   <FaRocket className="nav-icon" /> Startup General <RiArrowDropDownLine className="drop" />
//                 </div>
//                 {isStartupGeneralOpen && (
//                   <ul className="dropdown-menu-new">
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/startup-general" className="dropdown-menu-link-new">Startup</Link>
//                     </li>
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/form" className="dropdown-menu-link-new">Form</Link>
//                     </li>
//                   </ul>
//                 )}
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

//       <main className="main-content-form">
//         <header className="header-form">
//           <span className="founder-form">
//             <FiMenu style={{ color: '#909090' }} /> Form
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar-form" />
//           <div className="profile-section-form">
//             <div>
//               <FaBell className="notification-icon-form" />
//             </div>
//             <div className="user-info-form">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials-form" />
//               <div className="user-details-form">
//                 <span className="user-name-form">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop-form" />
//                 </span>
//                 <br />
//                 <span className="user-email-form">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content-form">
//           <div className="content-header-form">
//             <h2>Forms</h2>
//             <button className="add-form-button" onClick={openAddModal}>+ Add New</button>
//           </div>
//           <div className="form-list-form">
//             <div className="form-filters-form">
//               <button className="filter-button-form">Filters</button>
//               <input type="text" placeholder="Search Form" className="search-form-input" />
//             </div>
//             <table className="form-table-form">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Last Modified</th>
//                   <th>Category</th>
//                   <th>Label</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {forms.map((form, index) => (
//                   <tr key={index}>
//                     <td onClick={() => handleFormClick(form)} className="form-title">{form.title}</td>
//                     <td>{form.lastModified}</td>
//                     <td>{form.category}</td>
//                     <td>{form.label}</td>
//                     <td>{form.status}</td>
//                     <td>
//                       <button className="action-button-form edit" onClick={() => openEditModal(form)}>Edit</button>
//                       <button className="action-button-form duplicate" onClick={() => duplicateForm(form)}>Duplicate</button>
//                       <button className="action-button-form delete" onClick={() => deleteForm(form)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination-form">
//               <span>Showing 1 - {forms.length} of {forms.length} Results</span>
//               <select className="view-select-form">
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//               </select>
//             </div>
//           </div>
//         </section>
//         {isAddModalOpen && <AddNewFormModal closeModal={closeAddModal} addForm={addForm} />}
//         {isEditModalOpen && <EditFormModal closeModal={closeEditModal} form={currentForm} updateForm={updateForm} />}
//       </main>
//     </div>
//   );
// };

// export default Form;












// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
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
// import AddNewFormModal from './AddNewFormModal';
// import EditFormModal from './EditFormModal';
// import './Form.css';
// import '../Shared/Sidebar.css';

// const Form = () => {
//   const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false); // State for dropdown
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
//   const [forms, setForms] = useState(() => {
//     const savedForms = localStorage.getItem('forms');
//     return savedForms ? JSON.parse(savedForms) : [];
//   }); // State to manage form data
//   const [currentForm, setCurrentForm] = useState(null); // State for the form being edited
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('forms', JSON.stringify(forms));
//   }, [forms]);

//   const toggleStartupGeneral = () => {
//     setIsStartupGeneralOpen(!isStartupGeneralOpen);
//   };

//   const openAddModal = () => {
//     setIsAddModalOpen(true);
//   };

//   const closeAddModal = () => {
//     setIsAddModalOpen(false);
//   };

//   const openEditModal = (form) => {
//     setCurrentForm(form);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setCurrentForm(null);
//   };

//   const addForm = (formData) => {
//     setForms([...forms, formData]);
//   };

//   const updateForm = (updatedForm) => {
//     setForms(forms.map(form => form.title === updatedForm.title ? updatedForm : form));
//   };

//   const duplicateForm = (formToDuplicate) => {
//     const duplicatedForm = { ...formToDuplicate, title: `${formToDuplicate.title} (Copy)` };
//     setForms([...forms, duplicatedForm]);
//   };

//   const deleteForm = (formToDelete) => {
//     setForms(forms.filter(form => form.title !== formToDelete.title));
//   };

//   const handleFormClick = (form) => {
//     navigate(`/form/${form.title}`, { state: { form } });
//   };

//   return (
//     <div className="dashboard-form">
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
//               <li onClick={toggleStartupGeneral}>
//                 <div className="dropdown-header-new">
//                   <FaRocket className="nav-icon" /> Startup General <RiArrowDropDownLine className="drop" />
//                 </div>
//                 {isStartupGeneralOpen && (
//                   <ul className="dropdown-menu-new">
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/startup-general" className="dropdown-menu-link-new">Startup</Link>
//                     </li>
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/form" className="dropdown-menu-link-new">Form</Link>
//                     </li>
//                   </ul>
//                 )}
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

//       <main className="main-content-form">
//         <header className="header-form">
//           <span className="founder-form">
//             <FiMenu style={{ color: '#909090' }} /> Form
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar-form" />
//           <div className="profile-section-form">
//             <div>
//               <FaBell className="notification-icon-form" />
//             </div>
//             <div className="user-info-form">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials-form" />
//               <div className="user-details-form">
//                 <span className="user-name-form">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop-form" />
//                 </span>
//                 <br />
//                 <span className="user-email-form">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content-form">
//           <div className="content-header-form">
//             <h2>Forms</h2>
//             <button className="add-form-button" onClick={openAddModal}>+ Add New</button>
//           </div>
//           <div className="form-list-form">
//             <div className="form-filters-form">
//               <button className="filter-button-form">Filters</button>
//               <input type="text" placeholder="Search Form" className="search-form-input" />
//             </div>
//             <table className="form-table-form">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Last Modified</th>
//                   <th>Category</th>
//                   <th>Label</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {forms.map((form, index) => (
//                   <tr key={index}>
//                     <td onClick={() => handleFormClick(form)} className="form-title">{form.title}</td>
//                     <td>{form.lastModified}</td>
//                     <td>{form.category}</td>
//                     <td>{form.label}</td>
//                     <td>{form.status}</td>
//                     <td>
//                       <button className="action-button-form edit" onClick={() => openEditModal(form)}>Edit</button>
//                       <button className="action-button-form duplicate" onClick={() => duplicateForm(form)}>Duplicate</button>
//                       <button className="action-button-form delete" onClick={() => deleteForm(form)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination-form">
//               <span>Showing 1 - {forms.length} of {forms.length} Results</span>
//               <select className="view-select-form">
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//               </select>
//             </div>
//           </div>
//         </section>
//         {isAddModalOpen && <AddNewFormModal closeModal={closeAddModal} addForm={addForm} />}
//         {isEditModalOpen && <EditFormModal closeModal={closeEditModal} form={currentForm} updateForm={updateForm} />}
//       </main>
//     </div>
//   );
// };

// export default Form;










// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AddNewFormModal from './AddNewFormModal';
// import './Form.css'; // Assuming you have CSS for the table

// const Form = () => {
//   const [forms, setForms] = useState(() => {
//     const savedForms = localStorage.getItem('forms');
//     return savedForms ? JSON.parse(savedForms) : [];
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('forms', JSON.stringify(forms));
//   }, [forms]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const addForm = (form) => {
//     setForms([...forms, form]);
//     closeModal();
//   };

//   const handleEdit = (index, updatedForm) => {
//     const updatedForms = [...forms];
//     updatedForms[index] = updatedForm;
//     setForms(updatedForms);
//   };

//   const handleDuplicate = (form) => {
//     setForms([...forms, form]);
//   };

//   const handleDelete = (index) => {
//     const updatedForms = forms.filter((_, i) => i !== index);
//     setForms(updatedForms);
//   };

//   return (
//     <div className="form-page">
//       <div className="form-header">
//         <h2>Forms</h2>
//         <button className="add-new-button" onClick={openModal}>+ Add New</button>
//       </div>
//       <table className="forms-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Last Modified</th>
//             <th>Category</th>
//             <th>Label</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {forms.map((form, index) => (
//             <tr key={index}>
//               <td><Link to={`/form-details/${index}`}>{form.title}</Link></td>
//               <td>{form.lastModified}</td>
//               <td>{form.category}</td>
//               <td>{form.label}</td>
//               <td>{form.status}</td>
//               <td>
//                 <button onClick={() => handleEdit(index, form)}>Edit</button>
//                 <button onClick={() => handleDuplicate(form)}>Duplicate</button>
//                 <button onClick={() => handleDelete(index)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isModalOpen && <AddNewFormModal closeModal={closeModal} addForm={addForm} />}
//     </div>
//   );
// };

// export default Form;











// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
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
// import AddNewFormModal from './AddNewFormModal';
// import EditFormModal from './EditFormModal';
// import './Form.css';
// import '../Shared/Sidebar.css';

// const Form = () => {
//   const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false); // State for dropdown
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
//   const [forms, setForms] = useState(() => {
//     const savedForms = localStorage.getItem('forms');
//     return savedForms ? JSON.parse(savedForms) : [];
//   }); // State to manage form data
//   const [currentForm, setCurrentForm] = useState(null); // State for the form being edited
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem('forms', JSON.stringify(forms));
//   }, [forms]);

//   const toggleStartupGeneral = () => {
//     setIsStartupGeneralOpen(!isStartupGeneralOpen);
//   };

//   const openAddModal = () => {
//     setIsAddModalOpen(true);
//   };

//   const closeAddModal = () => {
//     setIsAddModalOpen(false);
//   };

//   const openEditModal = (form) => {
//     setCurrentForm(form);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setCurrentForm(null);
//   };

//   const addForm = (formData) => {
//     setForms([...forms, formData]);
//   };

//   const updateForm = (updatedForm) => {
//     setForms(forms.map(form => form.title === updatedForm.title ? updatedForm : form));
//   };

//   const duplicateForm = (formToDuplicate) => {
//     const duplicatedForm = { ...formToDuplicate, title: `${formToDuplicate.title} (Copy)` };
//     setForms([...forms, duplicatedForm]);
//   };

//   const deleteForm = (formToDelete) => {
//     setForms(forms.filter(form => form.title !== formToDelete.title));
//   };

//   const handleFormClick = (form) => {
//     navigate(`/form/${form.title}`, { state: { form } });
//   };

//   return (
//     <div className="dashboard-form">
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
//               <li onClick={toggleStartupGeneral}>
//                 <div className="dropdown-header-new">
//                   <FaRocket className="nav-icon" /> Startup General <RiArrowDropDownLine className="drop" />
//                 </div>
//                 {isStartupGeneralOpen && (
//                   <ul className="dropdown-menu-new">
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/startup-general" className="dropdown-menu-link-new">Startup</Link>
//                     </li>
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/form" className="dropdown-menu-link-new">Form</Link>
//                     </li>
//                   </ul>
//                 )}
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

//       <main className="main-content-form">
//         <header className="header-form">
//           <span className="founder-form">
//             <FiMenu style={{ color: '#909090' }} /> Form
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar-form" />
//           <div className="profile-section-form">
//             <div>
//               <FaBell className="notification-icon-form" />
//             </div>
//             <div className="user-info-form">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials-form" />
//               <div className="user-details-form">
//                 <span className="user-name-form">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop-form" />
//                 </span>
//                 <br />
//                 <span className="user-email-form">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content-form">
//           <div className="content-header-form">
//             <h2>Forms</h2>
//             <button className="add-form-button" onClick={openAddModal}>+ Add New</button>
//           </div>
//           <div className="form-list-form">
//             <div className="form-filters-form">
//               <button className="filter-button-form">Filters</button>
//               <input type="text" placeholder="Search Form" className="search-form-input" />
//             </div>
//             <table className="form-table-form">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Last Modified</th>
//                   <th>Category</th>
//                   <th>Label</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {forms.map((form, index) => (
//                   <tr key={index}>
//                     <td onClick={() => handleFormClick(form)} className="form-title">{form.title}</td>
//                     <td>{form.lastModified}</td>
//                     <td>{form.category}</td>
//                     <td>{form.label}</td>
//                     <td>{form.status}</td>
//                     <td>
//                       <button className="action-button-form edit" onClick={() => openEditModal(form)}>Edit</button>
//                       <button className="action-button-form duplicate" onClick={() => duplicateForm(form)}>Duplicate</button>
//                       <button className="action-button-form delete" onClick={() => deleteForm(form)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination-form">
//               <span>Showing 1 - {forms.length} of {forms.length} Results</span>
//               <select className="view-select-form">
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//               </select>
//             </div>
//           </div>
//         </section>
//         {isAddModalOpen && <AddNewFormModal closeModal={closeAddModal} addForm={addForm} />}
//         {isEditModalOpen && <EditFormModal closeModal={closeEditModal} form={currentForm} updateForm={updateForm} />}
//       </main>
//     </div>
//   );
// };

// export default Form;







// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
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
// import AddNewFormModal from './AddNewFormModal';
// import EditFormModal from './EditFormModal';
// import './Form.css';
// import '../Shared/Sidebar.css';

// const Form = () => {
//   const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false); // State for dropdown
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for add modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
//   const [forms, setForms] = useState(() => {
//     const savedForms = localStorage.getItem('forms');
//     return savedForms ? JSON.parse(savedForms) : [];
//   }); // State to manage form data
//   const [currentForm, setCurrentForm] = useState(null); // State for the form being edited

//   useEffect(() => {
//     localStorage.setItem('forms', JSON.stringify(forms));
//   }, [forms]);

//   const toggleStartupGeneral = () => {
//     setIsStartupGeneralOpen(!isStartupGeneralOpen);
//   };

//   const openAddModal = () => {
//     setIsAddModalOpen(true);
//   };

//   const closeAddModal = () => {
//     setIsAddModalOpen(false);
//   };

//   const openEditModal = (form) => {
//     setCurrentForm(form);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setIsEditModalOpen(false);
//     setCurrentForm(null);
//   };

//   const addForm = (formData) => {
//     setForms([...forms, formData]);
//   };

//   const updateForm = (updatedForm) => {
//     setForms(forms.map(form => form.title === updatedForm.title ? updatedForm : form));
//   };

//   const duplicateForm = (formToDuplicate) => {
//     const duplicatedForm = { ...formToDuplicate, title: `${formToDuplicate.title} (Copy)` };
//     setForms([...forms, duplicatedForm]);
//   };

//   const deleteForm = (formToDelete) => {
//     setForms(forms.filter(form => form.title !== formToDelete.title));
//   };

//   return (
//     <div className="dashboard-form">
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
//               <li onClick={toggleStartupGeneral}>
//                 <div className="dropdown-header-new">
//                   <FaRocket className="nav-icon" /> Startup General <RiArrowDropDownLine className="drop" />
//                 </div>
//                 {isStartupGeneralOpen && (
//                   <ul className="dropdown-menu-new">
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/startup-general" className="dropdown-menu-link-new">Startup</Link>
//                     </li>
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/form" className="dropdown-menu-link-new">Form</Link>
//                     </li>
//                   </ul>
//                 )}
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

//       <main className="main-content-form">
//         <header className="header-form">
//           <span className="founder-form">
//             <FiMenu style={{ color: '#909090' }} /> Form
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar-form" />
//           <div className="profile-section-form">
//             <div>
//               <FaBell className="notification-icon-form" />
//             </div>
//             <div className="user-info-form">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials-form" />
//               <div className="user-details-form">
//                 <span className="user-name-form">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop-form" />
//                 </span>
//                 <br />
//                 <span className="user-email-form">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content-form">
//           <div className="content-header-form">
//             <h2>Forms</h2>
//             <button className="add-form-button" onClick={openAddModal}>+ Add New</button>
//           </div>
//           <div className="form-list-form">
//             <div className="form-filters-form">
//               <button className="filter-button-form">Filters</button>
//               <input type="text" placeholder="Search Form" className="search-form-input" />
//             </div>
//             <table className="form-table-form">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Last Modified</th>
//                   <th>Category</th>
//                   <th>Label</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {forms.map((form, index) => (
//                   <tr key={index}>
//                     <td>{form.title}</td>
//                     <td>{form.lastModified}</td>
//                     <td>{form.category}</td>
//                     <td>{form.label}</td>
//                     <td>{form.status}</td>
//                     <td>
//                       <button className="action-button-form edit" onClick={() => openEditModal(form)}>Edit</button>
//                       <button className="action-button-form duplicate" onClick={() => duplicateForm(form)}>Duplicate</button>
//                       <button className="action-button-form delete" onClick={() => deleteForm(form)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination-form">
//               <span>Showing 1 - {forms.length} of {forms.length} Results</span>
//               <select className="view-select-form">
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//               </select>
//             </div>
//           </div>
//         </section>
//         {isAddModalOpen && <AddNewFormModal closeModal={closeAddModal} addForm={addForm} />}
//         {isEditModalOpen && <EditFormModal closeModal={closeEditModal} form={currentForm} updateForm={updateForm} />}
//       </main>
//     </div>
//   );
// };

// export default Form;












// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
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
// import AddNewFormModal from './AddNewFormModal';
// import './Form.css';
// import '../Shared/Sidebar.css';

// const Form = () => {
//   const [isStartupGeneralOpen, setIsStartupGeneralOpen] = useState(false); // State for dropdown
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
//   const [forms, setForms] = useState([]); // State to manage form data

//   const toggleStartupGeneral = () => {
//     setIsStartupGeneralOpen(!isStartupGeneralOpen);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const addForm = (formData) => {
//     setForms([...forms, formData]);
//   };

//   return (
//     <div className="dashboard-form">
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
//               <li onClick={toggleStartupGeneral}>
//                 <div className="dropdown-header-new">
//                   <FaRocket className="nav-icon" /> Startup General <RiArrowDropDownLine className="drop" />
//                 </div>
//                 {isStartupGeneralOpen && (
//                   <ul className="dropdown-menu-new">
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/startup-general" className="dropdown-menu-link-new">Startup</Link>
//                     </li>
//                     <li className="dropdown-menu-item-new">
//                       <Link to="/form" className="dropdown-menu-link-new">Form</Link>
//                     </li>
//                   </ul>
//                 )}
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

//       <main className="main-content-form">
//         <header className="header-form">
//           <span className="founder-form">
//             <FiMenu style={{ color: '#909090' }} /> Form
//           </span>
//           <input type="text" placeholder="Search here" className="search-bar-form" />
//           <div className="profile-section-form">
//             <div>
//               <FaBell className="notification-icon-form" />
//             </div>
//             <div className="user-info-form">
//               <img src="/navbar/profilepicture.png" alt="User Avatar" className="user-initials-form" />
//               <div className="user-details-form">
//                 <span className="user-name-form">
//                   Mr. Amit Rathod <RiArrowDropDownLine className="drop-form" />
//                 </span>
//                 <br />
//                 <span className="user-email-form">Amit@mail.com</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         <section className="content-form">
//           <div className="content-header-form">
//             <h2>Forms</h2>
//             <button className="add-form-button" onClick={openModal}>+ Add New</button>
//           </div>
//           <div className="form-list-form">
//             <div className="form-filters-form">
//               <button className="filter-button-form">Filters</button>
//               <input type="text" placeholder="Search Form" className="search-form-input" />
//             </div>
//             <table className="form-table-form">
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Last Modified</th>
//                   <th>Category</th>
//                   <th>Label</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {forms.map((form, index) => (
//                   <tr key={index}>
//                     <td>{form.title}</td>
//                     <td>{form.lastModified}</td>
//                     <td>{form.category}</td>
//                     <td>{form.label}</td>
//                     <td>{form.status}</td>
//                     <td>
//                       <button className="action-button-form edit">Edit</button>
//                       <button className="action-button-form duplicate">Duplicate</button>
//                       <button className="action-button-form delete">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination-form">
//               <span>Showing 1 - {forms.length} of {forms.length} Results</span>
//               <select className="view-select-form">
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//               </select>
//             </div>
//           </div>
//         </section>
//         {isModalOpen && <AddNewFormModal closeModal={closeModal} addForm={addForm} />}
//       </main>
//     </div>
//   );
// };

// export default Form;

