import React from 'react';

export default function TopTabs({ activeTab, setActiveTab }) {
  return (
    <ul className="nav nav-tabs nav-justified bg-primary pt-1 border-0">
      <li className="nav-item">
        <button
          className={`nav-link fw-bold border-0 py-3 ${
            activeTab === 'subjects' ? 'active bg-white text-primary' : 'text-white'
          }`}
          onClick={() => setActiveTab('subjects')}
        >
          Subjects
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link fw-bold border-0 py-3 ${
            activeTab === 'students' ? 'active bg-white text-primary' : 'text-white'
          }`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
      </li>
    </ul>
  );
}
