import React, { useState, useRef } from 'react';
import { Camera, Calendar, Upload, X, CheckCircle2 } from 'lucide-react';

export default function StudentForm({ student, onSave, onCancel }) {
  const [studentId, setStudentId] = useState(
    student?.studentId || `ADJ${Math.floor(100 + Math.random() * 900)}`
  );
  const [firstName, setFirstName] = useState(student?.firstName || '');
  const [lastName, setLastName] = useState(student?.lastName || '');
  const [dob, setDob] = useState(student?.dob || '2010-01-01');
  const [photo, setPhoto] = useState(student?.photo || null);
  
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        setShowPhotoPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access fallback avatar generator', err);
      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = 150;
      sampleCanvas.height = 150;
      const ctx = sampleCanvas.getContext('2d');
      ctx.fillStyle = '#0d6efd';
      ctx.fillRect(0, 0, 150, 150);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(firstName ? firstName[0].toUpperCase() : 'S', 75, 90);
      setPhoto(sampleCanvas.toDataURL());
      setIsCameraActive(false);
      setShowPhotoPicker(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 300;
      canvas.height = videoRef.current.videoHeight || 300;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setPhoto(canvas.toDataURL('image/jpeg'));
      stopCamera();
      setShowPhotoPicker(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      alert('Please enter First Name');
      return;
    }

    // Save student details
    onSave({
      id: student?.id || `st-${Date.now()}`,
      studentId: studentId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob,
      photo
    });

    // Show popup notification
    setShowSuccessModal(true);

    // Empty / reset form fields for next entry
    setStudentId(`ADJ${Math.floor(100 + Math.random() * 900)}`);
    setFirstName('');
    setLastName('');
    setDob('2010-01-01');
    setPhoto(null);
  };

  return (
    <div className="container py-3">
      {/* Sticky Yellow Callout */}
      <div className="alert alert-warning border-warning border-1 shadow-sm d-flex align-items-center gap-2 mb-4 text-dark">
        <small className="fw-semibold">💡 Allow to take a new photo or select photo from library</small>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Photo Box */}
        <div className="text-center mb-4">
          <div
            className="border border-2 border-dashed rounded-3 mx-auto d-flex align-items-center justify-content-center overflow-hidden bg-white shadow-sm"
            style={{ width: '120px', height: '120px', cursor: 'pointer' }}
            onClick={() => setShowPhotoPicker(true)}
          >
            {photo ? (
              <img src={photo} alt="Student Avatar" className="w-100 h-100 object-fit-cover" />
            ) : (
              <span className="text-muted fw-bold">Photo</span>
            )}
          </div>
          <button
            type="button"
            className="btn btn-link btn-sm text-decoration-none fw-bold mt-2"
            onClick={() => setShowPhotoPicker(true)}
          >
            {photo ? 'Change Photo' : 'Select Photo'}
          </button>
        </div>

        {/* Student ID */}
        <div className="mb-3">
          <label className="form-label fw-bold">Student ID:</label>
          <input
            type="text"
            className="form-control form-control-lg fw-bold"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="e.g. ADJ234"
            required
          />
        </div>

        {/* First Name */}
        <div className="mb-3">
          <label className="form-label text-muted small mb-1">First Name</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label text-muted small mb-1">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>

        {/* DOB Input */}
        <div className="mb-4">
          <label className="form-label text-muted small mb-1">Date of Birth</label>
          <div className="input-group">
            <input
              type="date"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <span className="input-group-text bg-white">
              <Calendar size={18} className="text-muted" />
            </span>
          </div>
        </div>

        {/* Actions: Cancel | Save */}
        <div className="d-flex justify-content-end gap-2 pt-2">
          <button
            type="button"
            className="btn btn-outline-secondary px-4 fw-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary px-4 fw-bold">
            Save
          </button>
        </div>
      </form>

      {/* Success Popup Modal */}
      {showSuccessModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(2px)' }}
          onClick={() => setShowSuccessModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content shadow-lg text-center p-4 border-success border-2">
              <div className="mx-auto mb-3 text-success bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                <CheckCircle2 size={38} />
              </div>
              <h4 className="fw-bold text-dark mb-2">Data Saved Successfully!</h4>
              <p className="text-muted mb-4">Student details have been saved to local storage.</p>
              <button
                type="button"
                className="btn btn-success px-4 py-2 fw-bold w-100"
                onClick={() => setShowSuccessModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Picker Modal */}
      {showPhotoPicker && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(2px)' }}
          onClick={() => { stopCamera(); setShowPhotoPicker(false); }}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Choose Photo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => { stopCamera(); setShowPhotoPicker(false); }}
                ></button>
              </div>
              <div className="modal-body p-4">
                {isCameraActive ? (
                  <div className="text-center">
                    <video ref={videoRef} autoPlay playsInline className="w-100 rounded mb-3 bg-dark" style={{ maxHeight: '220px', objectFit: 'cover' }} />
                    <div className="d-flex justify-content-center gap-2">
                      <button type="button" className="btn btn-primary" onClick={capturePhoto}>
                        📸 Snap Photo
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={stopCamera}>
                        Cancel Camera
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-grid gap-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary py-3 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={20} />
                      Choose from Library
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary py-3 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                      onClick={startCamera}
                    >
                      <Camera size={20} />
                      Take New Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
