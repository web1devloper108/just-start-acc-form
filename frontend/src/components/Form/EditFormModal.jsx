import React, { useState } from 'react';
import './AddNewFormModal.css'; // Reuse the same CSS as AddNewFormModal

const EditFormModal = ({ closeModal, form, updateForm }) => {
  const [formData, setFormData] = useState(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateForm({ ...formData, lastModified: new Date().toLocaleDateString() });
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit the Form</h2>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="modal-label">Title *</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="modal-label">Category *</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required>
              <option value="Application">Application</option>
              <option value="Evaluation">Evaluation</option>
              <option value="Mentoring">Mentoring</option>
              <option value="Startup">Startup</option>
              <option value="Fellowship">Fellowship</option>
              <option value="Survey">Survey</option>
              <option value="Learning">Learning</option>
              <option value="Funding">Funding</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="label" className="modal-label">Label *</label>
            <select id="label" name="label" value={formData.label} onChange={handleChange} required>
              <option value="REGULAR">REGULAR</option>
              <option value="URGENT">URGENT</option>
              <option value="IMPORTANT">IMPORTANT</option>
            </select>
          </div>
          <div className="form-group">
            <label className="modal-label">Status *</label>
            <div className="status-options">
              <label className="modal-label">
                <input type="radio" name="status" value="Draft" checked={formData.status === 'Draft'} onChange={handleChange} /> Save as Draft
              </label>
              <label className="modal-label">
                <input type="radio" name="status" value="Published" checked={formData.status === 'Published'} onChange={handleChange} /> Published
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="submit-button">Update</button>
            <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFormModal;


