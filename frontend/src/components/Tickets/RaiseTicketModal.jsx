import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./RaiseTicketModal.css";

const RaiseTicketModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) {
    return null;
  }

  const initialValues = {
    type: "",
    message: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Please select a ticket type"),
    message: Yup.string().required("Message cannot be empty"),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSave(values);
    resetForm();
    onClose();
  };

  return (
    <div className="raise-ticket-modal-overlay">
      <div className="raise-ticket-modal-content">
        {/* <span className="raise-ticket-close" onClick={onClose}>
          &times;
        </span> */}
        <h2>Raise New Ticket</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, touched, errors }) => (
            <Form>
              <div className="raise-ticket-form-group">
                <label>Ticket For</label>
                <Field as="select" name="type" className={`raise-ticket-input ${errors.type && touched.type ? 'input-error' : ''}`}>
                  <option value="">Select Type</option>
                  <option value="Founder Profile">Founder Profile</option>
                  <option value="Startup Genl">Startup Genl</option>
                  <option value="Startup Legal">Startup Legal</option>
                </Field>
                <ErrorMessage name="type" component="div" className="error" />
              </div>
              <div className="raise-ticket-form-group">
                <label>Message</label>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Type Message"
                  className={`raise-ticket-input ${errors.message && touched.message ? 'input-error' : ''}`}
                />
                <ErrorMessage name="message" component="div" className="error" />
              </div>
              <div className="raise-ticket-modal-buttons">
                <button
                  type="submit"
                  className="raise-ticket-next-button"
                  disabled={!isValid}
                >
                  Send
                </button>
                <button
                  type="button"
                  className="raise-ticket-cancel-button"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
              {!isValid && <div className="submit-error">Please fill out all required fields before submitting</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RaiseTicketModal;














// import React, { useState, useEffect } from "react";
// import "./RaiseTicketModal.css";

// const RaiseTicketModal = ({ isOpen, onClose, onSave }) => {
//   const [ticketDetails, setTicketDetails] = useState({
//     type: "",
//     message: "",
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setTicketDetails({ type: "", message: "" });
//     }
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTicketDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(ticketDetails);
//     onClose();
//   };

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="raise-ticket-modal-overlay">
//       <div className="raise-ticket-modal-content">
//         <span className="raise-ticket-close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Raise New Ticket</h2>
//         <form>
//           <div className="raise-ticket-form-group">
//             <label>Ticket For</label>
//             <select name="type" value={ticketDetails.type} onChange={handleChange}>
//               <option value="">Select Type</option>
//               <option value="Founder Profile">Founder Profile</option>
//               <option value="Startup Genl">Startup Genl</option>
//               <option value="Startup Legal">Startup Legal</option>
//             </select>
//           </div>
//           <div className="raise-ticket-form-group">
//             <label>Message</label>
//             <textarea
//               name="message"
//               value={ticketDetails.message}
//               onChange={handleChange}
//               placeholder="Type Message"
//             />
//           </div>
//           <div className="raise-ticket-modal-buttons">
//             <button type="button" className="raise-ticket-next-button" onClick={handleSave}>
//               Send
//             </button>
//             <button type="button" className="raise-ticket-cancel-button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RaiseTicketModal;











// /* good work123 */////be class name 

// import React, { useState, useEffect } from "react";
// import "./RaiseTicketModal.css";

// const RaiseTicketModal = ({ isOpen, onClose, onSave }) => {
//   const [ticketDetails, setTicketDetails] = useState({
//     type: "",
//     message: "",
//   });

//   useEffect(() => {
//     if (isOpen) {
//       setTicketDetails({ type: "", message: "" });
//     }
//   }, [isOpen]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTicketDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(ticketDetails);
//     onClose();
//   };

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Raise New Ticket</h2>
//         <form>
//           <div className="form-group">
//             <label>Ticket For</label>
//             <select name="type" value={ticketDetails.type} onChange={handleChange}>
//               <option value="">Select Type</option>
//               <option value="Founder Profile">Founder Profile</option>
//               <option value="Startup Genl">Startup Genl</option>
//               <option value="Startup Legal">Startup Legal</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Message</label>
//             <textarea
//               name="message"
//               value={ticketDetails.message}
//               onChange={handleChange}
//               placeholder="Type Message"
//             />
//           </div>
//           <div className="modal-buttons">
//             <button type="button" className="next-button" onClick={handleSave}>
//               Send
//             </button>
//             <button type="button" className="cancel-button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RaiseTicketModal;













////////////////////Hard core data 

// import React, { useState } from "react";
// import "./RaiseTicketModal.css";

// const RaiseTicketModal = ({ isOpen, onClose, onSave }) => {
//   const [ticketDetails, setTicketDetails] = useState({
//     type: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTicketDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(ticketDetails);
//     onClose();
//   };

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Raise New Ticket</h2>
//         <form>
//           <div className="form-group">
//             <label>Ticket For</label>
//             <select name="type" value={ticketDetails.type} onChange={handleChange}>
//               <option value="">Select Type</option>
//               <option value="Founder Profile">Founder Profile</option>
//               <option value="Startup Genl">Startup Genl</option>
//               <option value="Startup Legal">Startup Legal</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Message</label>
//             <textarea
//               name="message"
//               value={ticketDetails.message}
//               onChange={handleChange}
//               placeholder="Type Message"
//             />
//           </div>
//           <div className="modal-buttons">
//             <button type="button" className="next-button" onClick={handleSave}>
//               Send
//             </button>
//             <button type="button" className="cancel-button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RaiseTicketModal;
