import React, { useState } from 'react';
import SearchBar from './SearchBar';
import AddSubjectModal from './AddSubjectModal';
import { Plus, BookOpen, Trash2 } from 'lucide-react';

export default function SubjectList({ subjects, onAddSubject, onDeleteSubject }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSubjects = subjects.filter((subj) =>
    subj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-3 position-relative min-vh-100 pb-5">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="list-group shadow-sm">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((subj) => (
            <div
              key={subj.id}
              className="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3"
            >
              <div className="d-flex align-items-center gap-3">
                <BookOpen size={20} className="text-primary" />
                <span className="fw-medium text-dark">{subj.name}</span>
              </div>
              {onDeleteSubject && (
                <button
                  className="btn btn-sm btn-outline-danger border-0"
                  onClick={() => onDeleteSubject(subj.id)}
                  title="Delete subject"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-5 border rounded bg-white">
            {searchTerm ? 'No subjects found matching search.' : 'No course subjects added yet.'}
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
        onClick={() => setIsModalOpen(true)}
        title="Add Subject"
      >
        <Plus size={28} />
      </button>

      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAddSubject}
      />
    </div>
  );
}
