// FormDetails.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormDetails.css';

const FormDetails = () => {
  const location = useLocation();
  const { form } = location.state || {};
  const [formData, setFormData] = useState(form || {});
  const navigate = useNavigate();

  if (!form) {
    return <p>No form data available.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle saving the updated form data to localStorage or backend
    console.log('Form data saved:', formData);
  };

  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleClose = () => {
    navigate('/form');
  };

  return (
    <div className="form-details-container">
      <div className="form-details-header">
        <h2>Test Form DRISHTI</h2>
        <div className="form-details-buttons">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="edit-button" onClick={handleEdit}>Edit</button>
          <button className="close-button" onClick={handleClose}>Close</button>
        </div>
      </div>
      <div className="form-details-content">
        <form className="form-details-form">
          <div className="form-group">
            <label htmlFor="email">
              <span className="number-box">1</span> Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
              placeholder="Enter Your Email"
            />
            <small>This email will be used for further communications.</small>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              <span className="number-box">2</span> Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              placeholder="Enter Your Name"
            />
            <small>50 character(s) remaining</small>
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDetails;













// // FormDetails.jsx
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FormDetails.css';

// const FormDetails = () => {
//   const location = useLocation();
//   const { form } = location.state || {};
//   const [formData, setFormData] = useState(form || {});
//   const navigate = useNavigate();

//   if (!form) {
//     return <p>No form data available.</p>;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     // Handle saving the updated form data to localStorage or backend
//     console.log('Form data saved:', formData);
//   };

//   const handleEdit = () => {
//     console.log('Edit button clicked');
//   };

//   const handleClose = () => {
//     navigate('/form');
//   };

//   return (
//     <div className="form-details-container">
//       <div className="form-details-header">
//         <h2>Test Form DRISHTI</h2>
//         <div className="form-details-buttons">
//           <button className="save-button" onClick={handleSave}>Save</button>
//           <button className="edit-button" onClick={handleEdit}>Edit</button>
//           <button className="close-button" onClick={handleClose}>Close</button>
//         </div>
//       </div>
//       <form className="form-details-form">
//         <div className="form-group">
//           <label htmlFor="email">
//             <span className="number-box">1</span> Email *
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email || ''}
//             onChange={handleChange}
//             required
//             placeholder="Enter Your Email"
//           />
//           <small>This email will be used for further communications.</small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">
//             <span className="number-box">2</span> Name *
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name || ''}
//             onChange={handleChange}
//             required
//             placeholder="Enter Your Name"
//           />
//           <small>50 character(s) remaining</small>
//         </div>
//         <div className="form-buttons">
//           <button type="submit" className="submit-button">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormDetails;













// // FormDetails.jsx
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FormDetails.css';

// const FormDetails = () => {
//   const location = useLocation();
//   const { form } = location.state || {};
//   const [formData, setFormData] = useState(form || {});
//   const navigate = useNavigate();

//   if (!form) {
//     return <p>No form data available.</p>;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     // Handle saving the updated form data to localStorage or backend
//     console.log('Form data saved:', formData);
//   };

//   const handleEdit = () => {
//     console.log('Edit button clicked');
//   };

//   const handleClose = () => {
//     navigate('/form');
//   };

//   return (
//     <div className="form-details-container">
//       <div className="form-details-header">
//         <h2>Test Form DRISHTI</h2>
//         <div className="form-details-buttons">
//           <button className="save-button" onClick={handleSave}>Save</button>
//           <button className="edit-button" onClick={handleEdit}>Edit</button>
//           <button className="close-button" onClick={handleClose}>Close</button>
//         </div>
//       </div>
//       <form className="form-details-form">
//         <div className="form-group">
//           <label htmlFor="email">
//             <span className="number-box">1</span> Email *
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email || ''}
//             onChange={handleChange}
//             required
//           />
//           <small>This email will be used for further communications.</small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">
//             <span className="number-box">2</span> Name *
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name || ''}
//             onChange={handleChange}
//             required
//           />
//           <small>50 character(s) remaining</small>
//         </div>
//         <div className="form-buttons">
//           <button type="submit" className="submit-button">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormDetails;















// // FormDetails.jsx
// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FormDetails.css';

// const FormDetails = () => {
//   const location = useLocation();
//   const { form } = location.state || {};
//   const [formData, setFormData] = useState(form || {});
//   const navigate = useNavigate();

//   if (!form) {
//     return <p>No form data available.</p>;
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     // Handle saving the updated form data to localStorage or backend
//     console.log('Form data saved:', formData);
//   };

//   const handleEdit = () => {
//     console.log('Edit button clicked');
//   };

//   const handleClose = () => {
//     navigate('/form');
//   };

//   return (
//     <div className="form-details-container">
//       <div className="form-details-header">
//         <h2>Test Form DRISHTI</h2>
//         <div className="form-details-buttons">
//           <button className="save-button" onClick={handleSave}>Save</button>
//           <button className="edit-button" onClick={handleEdit}>Edit</button>
//           <button className="close-button" onClick={handleClose}>Close</button>
//         </div>
//       </div>
//       <form className="form-details-form">
//         <div className="form-group">
//           <label htmlFor="email">1. Email *</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email || ''}
//             onChange={handleChange}
//             required
//           />
//           <small>This email will be used for further communications.</small>
//         </div>
//         <div className="form-group">
//           <label htmlFor="name">2. Name *</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name || ''}
//             onChange={handleChange}
//             required
//           />
//           <small>50 character(s) remaining</small>
//         </div>
//         <div className="form-buttons">
//           <button type="submit" className="submit-button">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormDetails;











// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './FormDetails.css';

// const FormDetails = () => {
//   const location = useLocation();
//   const { form } = location.state;

//   return (
//     <div className="form-details">
//       <header className="header-form-details">
//         <h1>{form.title}</h1>
//       </header>
//       <section className="form-content-details">
//         <form className="form-content-details">
//           <div className="form-group">
//             <label htmlFor="email">Email *</label>
//             <input type="email" id="email" name="email" placeholder="Enter Your Email" required />
//             <small>This email will be used for further communications.</small>
//           </div>
//           <div className="form-group">
//             <label htmlFor="name">Name *</label>
//             <input type="text" id="name" name="name" placeholder="Enter Your Name" required />
//             <small>50 character(s) remaining</small>
//           </div>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default FormDetails;














// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './FormDetails.css'; // Assuming you have CSS for the form details

// const FormDetails = () => {
//   const { id } = useParams();
//   const forms = JSON.parse(localStorage.getItem('forms'));
//   const form = forms[id];

//   return (
//     <div className="form-details-page">
//       <header className="form-header">
//         <h2>{form.title}</h2>
//       </header>
//       <div className="form-content">
//         <div className="form-element">
//           <label>Email *</label>
//           <input type="email" placeholder="Enter Your Email" />
//           <p>This email will be used for further communications.</p>
//         </div>
//         <div className="form-element">
//           <label>Name *</label>
//           <input type="text" placeholder="Enter Your Name" />
//         </div>
//         <button type="submit">Submit</button>
//       </div>
//     </div>
//   );
// };

// export default FormDetails;








// import React from 'react';
// import './FormDetails.css';

// const FormDetails = () => {
//   const form = {
//     title: "test",
//     questions: [
//       {
//         id: 1,
//         type: "email",
//         label: "Email",
//       },
//       {
//         id: 2,
//         type: "text",
//         label: "Name",
//       },
//     ],
//   };

//   return (
//     <div className="form-details-page">
//       <header className="form-header">
//         <h2>{form.title}</h2>
//       </header>
//       <div className="form-builder">
//         <div className="question-type">
//           <h3>Question Type</h3>
//           <ul>
//             <li>Short Answer</li>
//             <li>Long Answer</li>
//             <li>Single Select</li>
//             <li>Multiple Select</li>
//             <li>File Upload</li>
//             <li>Switch (True/False)</li>
//             <li>Slider (Marks/Ratings)</li>
//             <li>Date</li>
//             <li>Multiple Rows</li>
//           </ul>
//         </div>
//         <div className="form-area">
//           <div className="hints">
//             <h3>Hints</h3>
//             <p>Drop your question type below</p>
//             <p>'Name' & 'Email' fields are compulsory</p>
//             <p>Include 'Startup Name' field to capture startup names</p>
//           </div>
//           <div className="questions-list">
//             {form.questions.map((question, index) => (
//               <div key={question.id} className="question-item">
//                 <span className="question-number">{index + 1}</span>
//                 <span className="question-label">{question.label}</span>
//                 <span className="question-type">{question.type}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormDetails;
