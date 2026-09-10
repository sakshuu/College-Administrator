import React, { useState } from 'react';
import StudentForm from './StudentForm';
import StudentScores from './StudentScores';
import { ArrowLeft } from 'lucide-react';

export default function StudentDetail({
  student,
  subjects,
  scores,
  onSaveStudent,
  onBack,
  onAddScore,
  onDeleteScore,
  initialSubTab = 'details'
}) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  const studentNameTitle = student
    ? `${student.firstName} ${student.lastName}`.trim() || student.studentId
    : 'New Student';

  return (
    <div className="bg-white min-vh-100">
      {/* Back Header */}
      <div className="d-flex align-items-center gap-3 p-3 bg-white border-bottom">
        <button className="btn btn-link text-primary p-0 border-0" onClick={onBack} title="Back to Students">
          <ArrowLeft size={22} />
        </button>
        <h5 className="mb-0 fw-bold text-dark">{studentNameTitle}</h5>
      </div>

      {/* Sub Tabs: Details | Subjects */}
      <ul className="nav nav-tabs nav-justified bg-primary border-0 pt-1">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold border-0 py-3 ${
              activeSubTab === 'details' ? 'active bg-white text-primary' : 'text-white'
            }`}
            onClick={() => setActiveSubTab('details')}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold border-0 py-3 ${
              activeSubTab === 'subjects' ? 'active bg-white text-primary' : 'text-white'
            }`}
            onClick={() => setActiveSubTab('subjects')}
          >
            Subjects
          </button>
        </li>
      </ul>

      {/* Sub Tab Content */}
      <div>
        {activeSubTab === 'details' ? (
          <StudentForm
            student={student}
            onSave={onSaveStudent}
            onCancel={onBack}
          />
        ) : (
          <StudentScores
            student={student}
            subjects={subjects}
            scores={scores}
            onAddScore={onAddScore}
            onDeleteScore={onDeleteScore}
          />
        )}
      </div>
    </div>
  );
}
