import React, { useState } from 'react';

export default function AddSubjectModal({ isOpen, onClose, onAdd }) {
  const [subjectName, setSubjectName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return;
    onAdd(subjectName.trim());
    setSubjectName('');
    onClose();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content border-primary border-2 shadow-lg">
          <div className="modal-header bg-light">
            <h5 className="modal-title text-primary fw-bold">New Subject:</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body py-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="......"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="modal-footer border-top-0 pt-0">
              <button type="button" className="btn btn-secondary px-3" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 fw-bold">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
