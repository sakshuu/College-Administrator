import React, { useState, useEffect } from 'react';
import TopTabs from './components/TopTabs';
import SubjectList from './components/SubjectList';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import {
  getSubjects,
  saveSubjects,
  getStudents,
  saveStudents,
  getStudentScores,
  saveStudentScores
} from './utils/storage';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('subjects'); // 'subjects' | 'students'
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  
  // Selected student view
  const [selectedStudent, setSelectedStudent] = useState(null); // null when on list view
  const [isCreatingNewStudent, setIsCreatingNewStudent] = useState(false);
  const [currentStudentScores, setCurrentStudentScores] = useState([]);

  // // View frame toggle
  // const [isMobileFrame, setIsMobileFrame] = useState(true);
  // const [showRequirements, setShowRequirements] = useState(true);

  // Load state on mount
  useEffect(() => {
    const loadedSubjects = getSubjects();
    const loadedStudents = getStudents();
    setSubjects(loadedSubjects);
    setStudents(loadedStudents);
  }, []);

  // When a student is selected, load their scores
  useEffect(() => {
    if (selectedStudent && selectedStudent.studentId) {
      const scores = getStudentScores(selectedStudent.studentId);
      setCurrentStudentScores(scores);
    } else {
      setCurrentStudentScores([]);
    }
  }, [selectedStudent]);

  // Subject Actions
  const handleAddSubject = (subjectName) => {
    const newSubject = {
      id: `subj-${Date.now()}`,
      name: subjectName
    };
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveSubjects(updated);
  };

  const handleDeleteSubject = (subjectId) => {
    const updated = subjects.filter((s) => s.id !== subjectId);
    setSubjects(updated);
    saveSubjects(updated);
  };

  // Student Actions
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setIsCreatingNewStudent(false);
  };

  const handleStartAddStudent = () => {
    setSelectedStudent(null);
    setIsCreatingNewStudent(true);
  };

  const handleSaveStudent = (studentData) => {
    let updatedStudents;
    const existingIndex = students.findIndex((s) => s.id === studentData.id);

    if (existingIndex >= 0) {
      updatedStudents = [...students];
      updatedStudents[existingIndex] = studentData;
    } else {
      updatedStudents = [...students, studentData];
    }

    setStudents(updatedStudents);
    saveStudents(updatedStudents);
    setSelectedStudent(studentData);
    setIsCreatingNewStudent(false);
  };

  const handleBackFromDetail = () => {
    setSelectedStudent(null);
    setIsCreatingNewStudent(false);
  };

  // Score Actions for selected student
  const handleAddScore = (scoreData) => {
    if (!selectedStudent || !selectedStudent.studentId) return;

    const updatedScores = [...currentStudentScores, scoreData];
    setCurrentStudentScores(updatedScores);
    saveStudentScores(selectedStudent.studentId, updatedScores);
  };

  const handleDeleteScore = (scoreId) => {
    if (!selectedStudent || !selectedStudent.studentId) return;

    const updatedScores = currentStudentScores.filter((sc) => sc.id !== scoreId);
    setCurrentStudentScores(updatedScores);
    saveStudentScores(selectedStudent.studentId, updatedScores);
  };

  return (
    <div className="app-root-container">
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-brand">
          <h1 className="header-title">🎓 College Administrator</h1>
        </div>
      </header>

      {/* Top Tabs Navigation (Shown on main lists) */}
      {(!selectedStudent && !isCreatingNewStudent) && (
        <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Main Screen Body */}
      <main className="app-main-content">
        <div className="app-content-card">
          {selectedStudent || isCreatingNewStudent ? (
            <StudentDetail
              student={selectedStudent}
              subjects={subjects}
              scores={currentStudentScores}
              onSaveStudent={handleSaveStudent}
              onBack={handleBackFromDetail}
              onAddScore={handleAddScore}
              onDeleteScore={handleDeleteScore}
            />
          ) : activeTab === 'subjects' ? (
            <SubjectList
              subjects={subjects}
              onAddSubject={handleAddSubject}
              onDeleteSubject={handleDeleteSubject}
            />
          ) : (
            <StudentList
              students={students}
              onSelectStudent={handleSelectStudent}
              onAddStudentClick={handleStartAddStudent}
            />
          )}
        </div>
      </main>
    </div>
  );
}
