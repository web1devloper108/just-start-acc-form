import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./SuccessModal.css";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-content">
        {/* <span className="success-modal-close" onClick={onClose}>
          &times;
        </span> */}
        <div className="success-modal-body">
          <FiCheckCircle className="success-icon" /> {/* Icon */}
          <h2>Ticket Raised Successfully</h2> {/* Title */}
          <p>You will receive an update regarding your request shortly.</p> {/* Message */}
          <button className="success-modal-button" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;







// import React from "react";
// import "./SuccessModal.css";

// const SuccessModal = ({ isOpen, onClose }) => {
//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="success-modal-overlay">
//       <div className="success-modal-content">
//         <span className="success-modal-close" onClick={onClose}>
//           &times;
//         </span>
//         <div className="success-modal-body">
//           <div className="success-icon">&#x2714;</div>
//           <h2>Ticket Raised Successfully</h2>
//           <p>You will receive an update regarding your request shortly.</p>
//           <button className="success-modal-button" onClick={onClose}>
//             Ok
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessModal;
