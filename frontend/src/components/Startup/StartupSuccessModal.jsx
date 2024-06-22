import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./StartupSuccessModal.css";

const StartupSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="startup-success-modal-overlay">
      <div className="startup-success-modal-content">
        <div className="startup-success-modal-body">
          <FiCheckCircle className="startup-success-icon" /> 
          <h2>Startup Added Successfully</h2> 
          <p>Startup details have been added successfully.</p> 
          <button className="startup-success-modal-button" onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartupSuccessModal; 