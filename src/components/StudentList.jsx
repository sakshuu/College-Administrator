import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { Plus, User, ChevronRight } from 'lucide-react';

export default function StudentList({ students, onSelectStudent, onAddStudentClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.trim().toLowerCase();
    const studentId = (s.studentId || '').toLowerCase();
    const query = searchTerm.toLowerCase();
    return fullName.includes(query) || studentId.includes(query);
  });

  return (
    <div className="container py-3 position-relative min-vh-100 pb-5">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="list-group shadow-sm">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <button
              key={student.id}
              className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
              onClick={() => onSelectStudent(student)}
            >
              <div
                className="rounded-circle bg-light border d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
                style={{ width: '48px', height: '48px' }}
              >
                {student.photo ? (
                  <img
                    src={student.photo}
                    alt={student.firstName}
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <User size={22} className="text-secondary" />
                )}
              </div>

              <div className="flex-grow-1 text-start">
                <div className="fw-bold text-dark">{student.firstName} {student.lastName}</div>
                <small className="text-muted">{student.studentId || 'Student ID'}</small>
              </div>

              <ChevronRight className="text-muted" size={20} />
            </button>
          ))
        ) : (
          <div className="text-center text-muted py-5 border rounded bg-white">
            {searchTerm ? 'No students found.' : 'No students added yet.'}
          </div>
        )}
      </div>

      {/* FAB Button */}
      <button
        className="btn btn-primary rounded-circle shadow-lg position-fixed d-flex align-items-center justify-content-center"
        style={{
          width: '56px',
          height: '56px',
          bottom: '24px',
          right: 'max(20px, calc(50vw - 290px))',
          zIndex: 10
        }}
        onClick={onAddStudentClick}
        title="Add Student"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}
