const STORAGE_KEYS = {
  SUBJECTS: 'college_admin_subjects',
  STUDENTS: 'college_admin_students',
  SCORES: 'college_admin_scores'
};

const DEFAULT_SUBJECTS = [
  { id: 'subj-1', name: 'Engineering Drawing - I' },
  { id: 'subj-2', name: 'Object Oriented Programming' },
  { id: 'subj-3', name: 'Mathematics - III' }
];

const DEFAULT_STUDENTS = [
  { id: 'st-1', studentId: 'ADJ234', firstName: 'Student A', lastName: '', dob: '2010-01-01', photo: null },
  { id: 'st-2', studentId: 'ADJ235', firstName: 'Student B', lastName: '', dob: '2010-02-15', photo: null },
  { id: 'st-3', studentId: 'ADJ236', firstName: 'Student C', lastName: '', dob: '2010-03-20', photo: null }
];

const DEFAULT_SCORES = {
  'ADJ234': [
    { id: 'sc-1', subjectId: 'subj-1', subjectName: 'Engineering Drawing - I', score: 70, maxScore: 75 },
    { id: 'sc-2', subjectId: 'subj-2', subjectName: 'Object Oriented Programming', score: 50, maxScore: 100 }
  ]
};

export function getSubjects() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
      return DEFAULT_SUBJECTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error loading subjects', e);
    return DEFAULT_SUBJECTS;
  }
}

export function saveSubjects(subjects) {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  } catch (e) {
    console.error('Error saving subjects', e);
  }
}

export function getStudents() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(DEFAULT_STUDENTS));
      return DEFAULT_STUDENTS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error loading students', e);
    return DEFAULT_STUDENTS;
  }
}

export function saveStudents(students) {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students', e);
  }
}

export function getStudentScores(studentId) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCORES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(DEFAULT_SCORES));
      return DEFAULT_SCORES[studentId] || [];
    }
    const allScores = JSON.parse(data);
    return allScores[studentId] || [];
  } catch (e) {
    console.error('Error loading scores', e);
    return DEFAULT_SCORES[studentId] || [];
  }
}

export function saveStudentScores(studentId, scores) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCORES);
    const allScores = data ? JSON.parse(data) : { ...DEFAULT_SCORES };
    allScores[studentId] = scores;
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(allScores));
  } catch (e) {
    console.error('Error saving scores', e);
  }
}
