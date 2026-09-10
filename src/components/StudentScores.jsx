import React, { useState } from 'react';
import { calculateGrade } from '../utils/gradeCalculator';
import { Trash2, Plus, X } from 'lucide-react';

export default function StudentScores({
  student,
  subjects,
  scores,
  onAddScore,
  onDeleteScore
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [scoreVal, setScoreVal] = useState('');
  const [maxScoreVal, setMaxScoreVal] = useState('100');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedSubjectId) {
      alert('Please select a subject');
      return;
    }
    const subj = subjects.find((s) => s.id === selectedSubjectId);
    if (!subj) return;

    onAddScore({
      id: `sc-${Date.now()}`,
      subjectId: subj.id,
      subjectName: subj.name,
      score: parseFloat(scoreVal) || 0,
      maxScore: parseFloat(maxScoreVal) || 100
    });

    setSelectedSubjectId('');
    setScoreVal('');
    setMaxScoreVal('100');
    setIsAddModalOpen(false);
  };

  return (
    <div className="container py-3 position-relative min-vh-100 pb-5">
      <div className="d-flex flex-column gap-3">
        {scores && scores.length > 0 ? (
          scores.map((sc) => {
            const { percentageFormatted, gradeClass } = calculateGrade(
              sc.score,
              sc.maxScore
            );
            return (
              <div key={sc.id} className="card shadow-sm border rounded-3">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <button
                      className="btn btn-warning btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center text-danger border-danger flex-shrink-0"
                      style={{ width: '32px', height: '32px', backgroundColor: '#fef9c3', borderColor: '#fca5a5' }}
                      onClick={() => onDeleteScore(sc.id)}
                      title="Delete score"
                    >
                      <Trash2 size={16} />
                    </button>
                    <h6 className="card-title mb-0 fw-bold text-dark">{sc.subjectName}</h6>
                  </div>

                  <div className="row g-2 align-items-center small">
                    <div className="col-4 text-muted">Score</div>
                    <div className="col-3 fw-bold text-decoration-underline text-dark">{sc.score}</div>
                    <div className="col-5 fw-bold text-dark">{percentageFormatted}</div>

                    <div className="col-4 text-muted">Max Score</div>
                    <div className="col-3 fw-bold text-dark">{sc.maxScore}</div>
                    <div className="col-5 fw-bold text-dark">{gradeClass}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted py-5 border rounded bg-white">
            No subject scores recorded for this student yet. Click + to add.
          </div>
        )}
      </div>

      {/* FAB + Button */}
      <button
        className="btn btn-primary rounded-circle shadow-lg position-fixed d-flex align-items-center justify-content-center"
        style={{
          width: '56px',
          height: '56px',
          bottom: '24px',
          right: 'max(20px, calc(50vw - 290px))',
          zIndex: 10
        }}
        onClick={() => setIsAddModalOpen(true)}
        title="Add Subject Score"
      >
        <Plus size={28} />
      </button>

      {/* Add Score Modal */}
      {isAddModalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(2px)' }}
          onClick={() => setIsAddModalOpen(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Subject Score</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsAddModalOpen(false)}
                ></button>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">Subject</label>
                    <select
                      className="form-select"
                      value={selectedSubjectId}
                      onChange={(e) => setSelectedSubjectId(e.target.value)}
                      required
                    >
                      <option value="">-- Select Subject --</option>
                      {subjects.map((subj) => (
                        <option key={subj.id} value={subj.id}>
                          {subj.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">Score Obtained</label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      value={scoreVal}
                      onChange={(e) => setScoreVal(e.target.value)}
                      placeholder="e.g. 70"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small mb-1">Max Score</label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      value={maxScoreVal}
                      onChange={(e) => setMaxScoreVal(e.target.value)}
                      placeholder="e.g. 75"
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary px-3"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4 fw-bold">
                    Add Score
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
