import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddStartupModal.css';

const AddStartupModal = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const initialValues = {
    stage: '',
    location: '',
    oneLiner: '',
    logo: '',
    socialMedia: '',
    domain: '',
    teamSize: '',
    description: '',
    website: '',
    service: '',
    incubated: '',
    support: '',
    address: ''
  };

  const validationSchemaStep1 = Yup.object({
    stage: Yup.string().required('Please select a startup stage'),
    location: Yup.string().required('Location is required'),
    oneLiner: Yup.string().required('One liner is required'),
    logo: Yup.mixed().required('Logo is required'),
    socialMedia: Yup.string().required('Social media link is required'),
    domain: Yup.string().required('Domain is required'),
    teamSize: Yup.string().required('Please select a team size'),
  });

  const validationSchemaStep2 = Yup.object({
    description: Yup.string().required('Description is required'),
    website: Yup.string().required('Website is required'),
    service: Yup.string().required('Please select a service type'),
    incubated: Yup.string().required('Please select incubation status'),
    support: Yup.string().required('Please select startup support status'),
    address: Yup.string().required('Address is required'),
  });

  const handleNext = (isValid, validateForm) => {
    setSubmitAttempted(true);
    validateForm().then(errors => {
      if (Object.keys(errors).length === 0) {
        setSubmitAttempted(false);
        setStep(2);
      }
    });
  };

  const handleSave = (values, isValid) => {
    setSubmitAttempted(true);
    if (isValid) {
      onSave(values);
      onClose();
      setStep(1); // Reset the step when modal is reopened
      setSubmitAttempted(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Startup</h2>
        <div className="step-indicator">
          <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
          <span className="dash"></span>
          <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={step === 1 ? validationSchemaStep1 : validationSchemaStep2}
          onSubmit={(values, { setSubmitting }) => handleSave(values, true)}
        >
          {({ isValid, setFieldValue, validateForm }) => (
            <Form className="modal-form">
              {step === 1 ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Startup Stage</label>
                      <Field as="select" name="stage" className="input">
                        <option value="">Select Stage</option>
                        <option value="Early-stage">Early-stage</option>
                        <option value="Growth-stage">Growth-stage</option>
                        <option value="Late-stage">Late-stage</option>
                      </Field>
                      <ErrorMessage name="stage" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Registered Office Location</label>
                      <Field type="text" name="location" placeholder="Enter Location" className="input" />
                      <ErrorMessage name="location" component="div" className="error" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>One Liner of your Startup (in 45 words)</label>
                    <Field as="textarea" name="oneLiner" placeholder="Enter description" className="input" />
                    <ErrorMessage name="oneLiner" component="div" className="error" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Logo (png, jpg or pdf)</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          id="file"
                          className="file-input"
                          name="logo"
                          onChange={(e) => setFieldValue('logo', e.target.files[0])}
                          accept=".png, .jpg, .jpeg, .pdf"
                        />
                        <label htmlFor="file" className="upload-button" style={{ fontWeight: '400' }}>
                          Upload the Logo <FaUpload className="upload-icon" />
                        </label>
                      </div>
                      <ErrorMessage name="logo" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Social Media Link</label>
                      <Field type="text" name="socialMedia" placeholder="Enter Link" className="input" />
                      <ErrorMessage name="socialMedia" component="div" className="error" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Domain of Startup</label>
                      <Field type="text" name="domain" placeholder="Enter Domain" className="input" />
                      <ErrorMessage name="domain" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Team Size</label>
                      <Field as="select" name="teamSize" className="input">
                        <option value="">Select Size</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="500+">500+</option>
                      </Field>
                      <ErrorMessage name="teamSize" component="div" className="error" />
                    </div>
                  </div>
                  <div className="modal-buttons">
                    <button type="button" onClick={() => handleNext(isValid, validateForm)} className="next-button">Next</button>
                    <button type="button" onClick={onClose} className="cancel-button-startup">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Brief Description (in 250 words)</label>
                    <Field as="textarea" name="description" placeholder="Enter description" className="input" />
                    <ErrorMessage name="description" component="div" className="error" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Website</label>
                      <Field type="text" name="website" placeholder="Enter Link" className="input" />
                      <ErrorMessage name="website" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Type of Service</label>
                      <Field as="select" name="service" className="input">
                        <option value="">Select Service</option>
                        <option value="Tech">Tech</option>
                        <option value="Health">Health</option>
                        <option value="Finance">Finance</option>
                      </Field>
                      <ErrorMessage name="service" component="div" className="error" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Incubated</label>
                      <Field as="select" name="incubated" className="input">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                      <ErrorMessage name="incubated" component="div" className="error" />
                    </div>
                    <div className="form-group">
                      <label>Looking for startup support?</label>
                      <Field as="select" name="support" className="input">
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                      <ErrorMessage name="support" component="div" className="error" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Startup Portal Address</label>
                    <Field type="text" name="address" placeholder="Enter Address" className="input" />
                    <ErrorMessage name="address" component="div" className="error" />
                  </div>
                  <div className="modal-buttons">
                    <button type="submit" className="next-button">Save</button>
                    <button type="button" onClick={onClose} className="cancel-button-startup">Cancel</button>
                  </div>
                </>
              )}
              {submitAttempted && !isValid && (
                <div className="submit-error-message">
                  Please fill out all required fields before submitting.
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStartupModal;


















////////bef formic
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose, onSave }) => {
//   const [step, setStep] = useState(1);
//   const [startupData, setStartupData] = useState({
//     stage: '',
//     location: '',
//     oneLiner: '',
//     logo: '',
//     socialMedia: '',
//     domain: '',
//     teamSize: '',
//     description: '',
//     website: '',
//     service: '',
//     incubated: '',
//     support: '',
//     address: ''
//   });

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setStartupData((prevData) => ({
//         ...prevData,
//         [name]: files[0]
//       }));
//     } else {
//       setStartupData((prevData) => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   const handleSave = () => {
//     onSave(startupData);
//     onClose();
//     setStep(1); // Reset the step when modal is reopened
//     setStartupData({
//       stage: '',
//       location: '',
//       oneLiner: '',
//       logo: '',
//       socialMedia: '',
//       domain: '',
//       teamSize: '',
//       description: '',
//       website: '',
//       service: '',
//       incubated: '',
//       support: '',
//       address: ''
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form className="modal-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select name="stage" value={startupData.stage} onChange={handleChange}>
//                   <option>Select Stage</option>
//                   <option value="Early-stage">Early-stage</option>
//                   <option value="Growth-stage">Growth-stage</option>
//                   <option value="Late-stage">Late-stage</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" name="location" placeholder="Enter Location" value={startupData.location} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea name="oneLiner" placeholder="Enter description" value={startupData.oneLiner} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png, jpg or pdf)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" name="logo" onChange={handleChange} accept=".png, .jpg, .jpeg, .pdf" />
//                   <label htmlFor="file" className="upload-button" style={{ fontWeight: '400' }}>
//                     Upload the Resume <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" name="socialMedia" placeholder="Enter Link" value={startupData.socialMedia} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" name="domain" placeholder="Enter Link" value={startupData.domain} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select name="teamSize" value={startupData.teamSize} onChange={handleChange}>
//                   <option>Select Size</option>
//                   <option value="1-10">1-10</option>
//                   <option value="11-50">11-50</option>
//                   <option value="51-200">51-200</option>
//                   <option value="201-500">201-500</option>
//                   <option value="500+">500+</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button-startup">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form className="modal-form">
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea name="description" placeholder="Enter description" value={startupData.description} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" name="website" placeholder="Enter Link" value={startupData.website} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select name="service" value={startupData.service} onChange={handleChange}>
//                   <option>Select Service</option>
//                   <option value="Tech">Tech</option>
//                   <option value="Health">Health</option>
//                   <option value="Finance">Finance</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select name="incubated" value={startupData.incubated} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select name="support" value={startupData.support} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" name="address" placeholder="Enter Address" value={startupData.address} onChange={handleChange} />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button-startup">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;









///end sweet
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import './AddStartupModal.css';
// import './customSweetAlert.css'; 

// const MySwal = withReactContent(Swal);

// const AddStartupModal = ({ isOpen, onClose, onSave }) => {
//   const [step, setStep] = useState(1);
//   const [startupData, setStartupData] = useState({ 
//     stage: '',
//     location: '',
//     oneLiner: '',
//     logo: '',
//     socialMedia: '',
//     domain: '',
//     teamSize: '',
//     description: '',
//     website: '',
//     service: '',
//     incubated: '',
//     support: '',
//     address: ''
//   });

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setStartupData((prevData) => ({
//         ...prevData,
//         [name]: files[0]
//       }));
//     } else {
//       setStartupData((prevData) => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   const handleSave = () => {
//     onSave(startupData);
//     onClose();
//     MySwal.fire({
//       icon: 'success',
//       title: 'Startup Added Successfully',
//       text: 'Startup details have been added successfully.',
//       confirmButtonText: 'Ok',
//       iconColor: '#1e88e5',
//       customClass: {
//         popup: 'popup-class',
//         title: 'title-class',
//         text: 'text-class',
//         confirmButton: 'confirm-button-class'
//       }
//     }).then(() => {
//       setStep(1); // Reset the step when modal is reopened
//       setStartupData({
//         stage: '',
//         location: '',
//         oneLiner: '',
//         logo: '',
//         socialMedia: '',
//         domain: '',
//         teamSize: '',
//         description: '',
//         website: '',
//         service: '',
//         incubated: '',
//         support: '',
//         address: ''
//       }); 
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form className="modal-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select name="stage" value={startupData.stage} onChange={handleChange}>
//                   <option>Select Stage</option>
//                   <option value="Early-stage">Early-stage</option>
//                   <option value="Growth-stage">Growth-stage</option>
//                   <option value="Late-stage">Late-stage</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" name="location" placeholder="Enter Location" value={startupData.location} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea name="oneLiner" placeholder="Enter description" value={startupData.oneLiner} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png, jpg or pdf)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" name="logo" onChange={handleChange} accept=".png, .jpg, .jpeg, .pdf"/>
//                   <label htmlFor="file" className="upload-button" style={{fontWeight:'400'}}>
//                     Upload the Resume <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" name="socialMedia" placeholder="Enter Link" value={startupData.socialMedia} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" name="domain" placeholder="Enter Link" value={startupData.domain} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select name="teamSize" value={startupData.teamSize} onChange={handleChange}>
//                   <option>Select Size</option>
//                   <option value="1-10">1-10</option>
//                   <option value="11-50">11-50</option>
//                   <option value="51-200">51-200</option>
//                   <option value="201-500">201-500</option>
//                   <option value="500+">500+</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button-startup">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form className="modal-form">
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea name="description" placeholder="Enter description" value={startupData.description} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" name="website" placeholder="Enter Link" value={startupData.website} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select name="service" value={startupData.service} onChange={handleChange}>
//                   <option>Select Service</option>
//                   <option value="Tech">Tech</option>
//                   <option value="Health">Health</option>
//                   <option value="Finance">Finance</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select name="incubated" value={startupData.incubated} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select name="support" value={startupData.support} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" name="address" placeholder="Enter Address" value={startupData.address} onChange={handleChange} />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button-startup">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;















// ok icon page
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import './AddStartupModal.css';
// import './customSweetAlert.css'; // Import the custom SweetAlert CSS

// const MySwal = withReactContent(Swal);

// const AddStartupModal = ({ isOpen, onClose, onSave }) => {
//   const [step, setStep] = useState(1);
//   const [startupData, setStartupData] = useState({
//     stage: '',
//     location: '',
//     oneLiner: '',
//     logo: '',
//     socialMedia: '',
//     domain: '',
//     teamSize: '',
//     description: '',
//     website: '',
//     service: '',
//     incubated: '',
//     support: '',
//     address: ''
//   });

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setStartupData((prevData) => ({
//         ...prevData,
//         [name]: files[0]
//       }));
//     } else {
//       setStartupData((prevData) => ({
//         ...prevData,
//         [name]: value
//       }));
//     }
//   };

//   const handleSave = () => {
//     onSave(startupData);
//     onClose();
//     MySwal.fire({
//       icon: 'success',
//       title: 'Startup Added Successfully',
//       text: 'Startup details have been added successfully.',
//       confirmButtonText: 'Ok',
//       iconColor: '#1e88e5',
//       customClass: {
//         popup: 'popup-class',
//         title: 'title-class',
//         text: 'text-class',
//         confirmButton: 'confirm-button-class'
//       }
//     }).then(() => {
//       setStep(1); // Reset the step when modal is reopened
//       setStartupData({
//         stage: '',
//         location: '',
//         oneLiner: '',
//         logo: '',
//         socialMedia: '',
//         domain: '',
//         teamSize: '',
//         description: '',
//         website: '',
//         service: '',
//         incubated: '',
//         support: '',
//         address: ''
//       }); // Reset the form data
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form className="modal-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select name="stage" value={startupData.stage} onChange={handleChange}>
//                   <option>Select Stage</option>
//                   <option value="Early-stage">Early-stage</option>
//                   <option value="Growth-stage">Growth-stage</option>
//                   <option value="Late-stage">Late-stage</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" name="location" placeholder="Enter Location" value={startupData.location} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea name="oneLiner" placeholder="Enter description" value={startupData.oneLiner} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png, jpg or pdf)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" name="logo" onChange={handleChange} accept=".png, .jpg, .jpeg, .pdf"/>
//                   <label htmlFor="file" className="upload-button">
//                     Upload the Resume <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" name="socialMedia" placeholder="Enter Link" value={startupData.socialMedia} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" name="domain" placeholder="Enter Link" value={startupData.domain} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select name="teamSize" value={startupData.teamSize} onChange={handleChange}>
//                   <option>Select Size</option>
//                   <option value="1-10">1-10</option>
//                   <option value="11-50">11-50</option>
//                   <option value="51-200">51-200</option>
//                   <option value="201-500">201-500</option>
//                   <option value="500+">500+</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form className="modal-form">
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea name="description" placeholder="Enter description" value={startupData.description} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" name="website" placeholder="Enter Link" value={startupData.website} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select name="service" value={startupData.service} onChange={handleChange}>
//                   <option>Select Service</option>
//                   <option value="Tech">Tech</option>
//                   <option value="Health">Health</option>
//                   <option value="Finance">Finance</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select name="incubated" value={startupData.incubated} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select name="support" value={startupData.support} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" name="address" placeholder="Enter Address" value={startupData.address} onChange={handleChange} />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;





// // src/components/Startup/AddStartupModal.jsx
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import './AddStartupModal.css';
// import './customSweetAlert.css'; // Import the custom SweetAlert CSS

// const MySwal = withReactContent(Swal);

// const AddStartupModal = ({ isOpen, onClose, onSave }) => {
//   const [step, setStep] = useState(1);
//   const [startupData, setStartupData] = useState({
//     stage: '',
//     location: '',
//     oneLiner: '',
//     logo: '',
//     socialMedia: '',
//     domain: '',
//     teamSize: '',
//     description: '',
//     website: '',
//     service: '',
//     incubated: '',
//     support: '',
//     address: ''
//   });

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStartupData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSave = () => {
//     onSave(startupData);
//     onClose();
//     MySwal.fire({
//       icon: 'success',
//       title: 'Startup Added Successfully',
//       text: 'Startup details have been added successfully.',
//       confirmButtonText: 'Ok',
//       iconColor: '#1e88e5',
//       customClass: {
//         popup: 'popup-class',
//         title: 'title-class',
//         text: 'text-class',
//         confirmButton: 'confirm-button-class'
//       }
//     }).then(() => {
//       setStep(1); // Reset the step when modal is reopened
//       setStartupData({
//         stage: '',
//         location: '',
//         oneLiner: '',
//         logo: '',
//         socialMedia: '',
//         domain: '',
//         teamSize: '',
//         description: '',
//         website: '',
//         service: '',
//         incubated: '',
//         support: '',
//         address: ''
//       }); // Reset the form data
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form className="modal-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select name="stage" value={startupData.stage} onChange={handleChange}>
//                   <option>Select Stage</option>
//                   <option value="Early-stage">Early-stage</option>
//                   <option value="Growth-stage">Growth-stage</option>
//                   <option value="Late-stage">Late-stage</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" name="location" placeholder="Enter Location" value={startupData.location} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea name="oneLiner" placeholder="Enter description" value={startupData.oneLiner} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png or jpg)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" />
//                   <label htmlFor="file" className="upload-button">
//                     Upload the Logo <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" name="socialMedia" placeholder="Enter Link" value={startupData.socialMedia} onChange={handleChange} />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" name="domain" placeholder="Enter Link" value={startupData.domain} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select name="teamSize" value={startupData.teamSize} onChange={handleChange}>
//                   <option>Select Size</option>
//                   <option value="1-10">1-10</option>
//                   <option value="11-50">11-50</option>
//                   <option value="51-200">51-200</option>
//                   <option value="201-500">201-500</option>
//                   <option value="500+">500+</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form className="modal-form">
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea name="description" placeholder="Enter description" value={startupData.description} onChange={handleChange}></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" name="website" placeholder="Enter Link" value={startupData.website} onChange={handleChange} />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select name="service" value={startupData.service} onChange={handleChange}>
//                   <option>Select Service</option>
//                   <option value="Tech">Tech</option>
//                   <option value="Health">Health</option>
//                   <option value="Finance">Finance</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select name="incubated" value={startupData.incubated} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select name="support" value={startupData.support} onChange={handleChange}>
//                   <option>Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" name="address" placeholder="Enter Address" value={startupData.address} onChange={handleChange} />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;







// bef save list12
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import './AddStartupModal.css';
// import './customSweetAlert.css'; // Import the custom SweetAlert CSS

// const AddStartupModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1);

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleSave = () => {
//     onClose();
//     Swal.fire({
//       icon: 'success',
//       title: 'Startup Added Successfully',
//       text: 'Startup details have been added successfully.',
//       confirmButtonText: 'Ok',
//       iconColor: '#1e88e5',
//       customClass: {
//         popup: 'popup-class',
//         title: 'title-class',
//         text: 'text-class',
//         confirmButton: 'confirm-button-class'
//       }
//     }).then(() => {
//       setStep(1); // Reset the step when modal is reopened
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form className="modal-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select>
//                   <option>Select Stage</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" placeholder="Enter Location" />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea placeholder="Enter description"></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png or jpg)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" />
//                   <label htmlFor="file" className="upload-button">
//                     Upload the Logo <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select>
//                   <option>Select Size</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form className="modal-form">
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea placeholder="Enter description"></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select>
//                   <option>Select Service</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select>
//                   <option>Select</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select>
//                   <option>Select</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" placeholder="Enter Address" />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;







// // src/components/Startup/AddStartupModal.jsx
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1);

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Form saved");
//     onClose();
//     setStep(1); // Reset step to 1 for next time the modal opens
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form className="modal-form">
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select>
//                   <option>Select Stage</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" placeholder="Enter Location" />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea placeholder="Enter description"></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png or jpg)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" />
//                   <label htmlFor="file" className="upload-button">
//                     Upload the Logo <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select>
//                   <option>Select Size</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form className="modal-form">
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea placeholder="Enter description"></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select>
//                   <option>Select Service</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select>
//                   <option>Select</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select>
//                   <option>Select</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" placeholder="Enter Address" />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;






// // src/components/Startup/AddStartupModal.jsx
// import React, { useState } from 'react';
// import { FaUpload } from 'react-icons/fa';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1);

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Form saved");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className={`step ${step === 1 ? 'active-step' : 'inactive-step'}`}>1</span>
//           <span className="dash"></span>
//           <span className={`step ${step === 2 ? 'active-step' : 'inactive-step'}`}>2</span>
//         </div>
//         {step === 1 ? (
//           <form>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Startup Stage</label>
//                 <select>
//                   <option>Select Stage</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Registered Office Location</label>
//                 <input type="text" placeholder="Enter Location" />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <textarea placeholder="Enter description"></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Logo (png or jpg)</label>
//                 <div className="file-upload">
//                   <input type="file" id="file" className="file-input" />
//                   <label htmlFor="file" className="upload-button">
//                     Upload the Logo <FaUpload className="upload-icon" />
//                   </label>
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label>Social Media Link</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Domain of Startup</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//               <div className="form-group">
//                 <label>Team Size</label>
//                 <select>
//                   <option>Select Size</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleNext} className="next-button">Next</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <form>
//             <div className="form-group">
//               <label>Brief Description (in 250 words)</label>
//               <textarea placeholder="Enter description"></textarea>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Website</label>
//                 <input type="text" placeholder="Enter Link" />
//               </div>
//               <div className="form-group">
//                 <label>Type of Service</label>
//                 <select>
//                   <option>Select Service</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Incubated</label>
//                 <select>
//                   <option>Select</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Looking for startup support?</label>
//                 <select>
//                   <option>Select</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Startup Portal Address</label>
//               <input type="text" placeholder="Enter Address" />
//             </div>
//             <div className="modal-buttons">
//               <button type="button" onClick={handleSave} className="next-button">Save</button>
//               <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;





////ok toll 1 model// // src/components/Startup/AddStartupModal.jsx
// import React from 'react';
// import { FaUpload } from 'react-icons/fa';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className="step active-step">1</span>
//           <span className="dash"></span>
//           <span className="step inactive-step">2</span>
//         </div>
//         <form>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Startup Stage</label>
//               <select>
//                 <option>Select Stage</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Registered Office Location</label>
//               <input type="text" placeholder="Enter Location" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>One Liner of your Startup (in 45 words)</label>
//             <textarea placeholder="Enter description"></textarea>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Logo (png or jpg)</label>
//               <div className="file-upload">
//                 <input type="file" id="file" className="file-input" />
//                 <label htmlFor="file" className="upload-button">
//                   Upload the Logo <FaUpload className="upload-icon" />
//                 </label>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="submit" className="next-button">Next</button>
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;




////ok file oooooooooooook// // src/components/Startup/AddStartupModal.jsx
// import React from 'react';
// import { FaUpload } from 'react-icons/fa';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className="active-step">1</span>
//           <span>2</span>
//         </div>
//         <form>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Startup Stage</label>
//               <select>
//                 <option>Select Stage</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Registered Office Location</label>
//               <input type="text" placeholder="Enter Location" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>One Liner of your Startup (in 45 words)</label>
//             <textarea placeholder="Enter description"></textarea>
//           </div>  
//           <div className="form-row">
//             <div className="form-group">
//               <label>Logo (png or jpg)</label>
//               <div className="file-upload">
//                 <input type="file" id="file" className="file-input" />
//                 <label htmlFor="file" className="upload-button">
//                   Upload the Logo <FaUpload className="upload-icon" />
//                 </label>
//               </div> 
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             <button type="submit" className="next-button">Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;







// // src/components/Startup/AddStartupModal.jsx
// import React from 'react';
// import { FaUpload } from 'react-icons/fa';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className="active-step">1</span>
//           <span>2</span>
//         </div>
//         <form>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Startup Stage</label>
//               <select>
//                 <option>Select Stage</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Registered Office Location</label>
//               <input type="text" placeholder="Enter Location" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>One Liner of your Startup (in 45 words)</label>
//             <textarea placeholder="Enter description"></textarea>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Logo (png or jpg)</label>
//               <div className="file-upload">
//                 <input type="file" id="file" className="file-input" />
//                 <label htmlFor="file" className="upload-button">
//                   Upload the Resume <FaUpload />
//                 </label>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             <button type="submit" className="next-button">Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;






















// ok456
// // src/components/Startup/AddStartupModal.jsx
// import React from 'react';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className="active-step">1</span>
//           <span>2</span>
//         </div>
//         <form>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Startup Stage</label>
//               <select>
//                 <option> Stage 1</option>
//                 <option> Stage 2</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Registered Office Location</label>
//               <input type="text" placeholder="Enter Location" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>One Liner of your Startup (in 45 words)</label>
//             <textarea placeholder="Enter description"></textarea>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Logo (png or jpg)</label>
//               <div className="file-upload">
//                 <input type="file" id="file" className="file-input" />
//                 <label htmlFor="file" className="upload-button">
//                   Upload the Resume <i className="fa fa-upload"></i>
//                 </label>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             <button type="submit" className="next-button">Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;





// import React from 'react';
// import './AddStartupModal.css';
// import { FaUpload } from 'react-icons/fa';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className="active-step">1</span> 
//           <h3 >- - - - -</h3>
//           <span>2</span>
//         </div>
//         <form>
//          <div style={{display:'flex',gap:'20px'}}>
//          <div className="form-group">
//             <label>Startup Stage</label>
//             <select>
//               <option>Select Stage</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Registered Office Location</label>
//             <input type="text" placeholder="Enter Location" />
//           </div>
//          </div>
//           <div className="form-groupone">
//             <label>One Liner of your Startup (in 45 words)</label>
//             <input type="text" placeholder="Enter description" />
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Logo (png or jpg)</label>
//               <div className="modal-form-item"> 
//               <div className="modal-form-item">
//               <div className="file-input-container">
//                 <input type="file" id="resume-upload" className="file-input" />
//                 <label htmlFor="resume-upload" className="file-input-label">
//                   Upload the Resume
//                   <FaUpload className="upload-icon" />
//                 </label>
//               </div>
//             </div>
//            </div>
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             <button type="submit" className="next-button">Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;




// mo0000000000000
// import React from 'react';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <div className="step-indicator">
//           <span className="active-step">1</span>
//           <span>2</span>
//         </div>
//         <form>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Startup Stage</label>
//               <select>
//                 <option>Select Stage</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Registered Office Location</label>
//               <input type="text" placeholder="Enter Location" />
//             </div>
//           </div>
//           <div className="form-group">
//             <label>One Liner of your Startup (in 45 words)</label>
//             <input type="text" placeholder="Enter description" />
//           </div>
//           <div className="form-row">
//             <div className="form-group file-group">
//               <label>Logo (png or jpg)</label>
//               <div className="file-input-container">
//                 <input type="file" className="file-input" />
//                 <button type="button" className="upload-button">
//                   Upload the Resume <i className="fa fa-upload" aria-hidden="true"></i>
//                 </button>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             <button type="submit" className="next-button">Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;





// // src/components/Startup/AddStartupModal.jsx
// import React from 'react';
// import './AddStartupModal.css';

// const AddStartupModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Startup</h2>
//         <form>
//           <div className="form-step">
//             <div className="step-indicator">
//               <span className="active-step">1</span>
//               <span>2</span>
//             </div>
//             <div className="form-group">
//               <label>Startup Stage</label>
//               <select>
//                 <option>Select Stage</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Registered Office Location</label>
//               <input type="text" placeholder="Enter Location" />
//             </div>
//             <div className="form-group">
//               <label>One Liner of your Startup (in 45 words)</label>
//               <input type="text" placeholder="Enter description" />
//             </div>
//             <div className="form-group">
//               <label>Logo (png or jpg)</label>
//               <input type="file" />
//             </div>
//             <div className="form-group">
//               <label>Social Media Link</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Domain of Startup</label>
//               <input type="text" placeholder="Enter Link" />
//             </div>
//             <div className="form-group">
//               <label>Team Size</label>
//               <select>
//                 <option>Select Size</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//           </div>
//           <div className="modal-buttons">
//             <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
//             <button type="submit" className="next-button">Next</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddStartupModal;
