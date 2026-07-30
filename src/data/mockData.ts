import { 
  Campus, AcademicYear, Term, GradeLevel, SchoolClass, Subject, 
  Student, Staff, StudentAttendance, TimetablePeriod, Assignment, 
  AssignmentSubmission, Exam, ExamMark, FeeInvoice, PaymentReceipt, 
  Application, LibraryBook, TransportRoute, ClinicVisit, Announcement, AuditLog 
} from '../types';

export const mockCampuses: Campus[] = [
  {
    id: 'camp-1',
    name: 'Main Campus - Mogadishu',
    code: 'MOG-01',
    city: 'Mogadishu',
    country: 'Somalia',
    address: 'K4 Km4 Square, Hodan District',
    phone: '+252 61 500 0111',
    email: 'main.mogadishu@globalschool.edu',
    isMain: true,
    studentCount: 850
  },
  {
    id: 'camp-2',
    name: 'East Campus - Hargeisa',
    code: 'HAR-02',
    city: 'Hargeisa',
    country: 'Somalia',
    address: 'Airport Road, 26 June Quarter',
    phone: '+252 63 400 0222',
    email: 'east.hargeisa@globalschool.edu',
    isMain: false,
    studentCount: 520
  },
  {
    id: 'camp-3',
    name: 'City Campus - Nairobi',
    code: 'NBO-03',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Kilimani Park Road, Nairobi',
    phone: '+254 700 123 456',
    email: 'nairobi@globalschool.edu',
    isMain: false,
    studentCount: 340
  }
];

export const mockAcademicYears: AcademicYear[] = [
  { id: 'ay-2025', name: '2025 - 2026 Academic Year', startDate: '2025-09-01', endDate: '2026-06-30', isCurrent: true },
  { id: 'ay-2024', name: '2024 - 2025 Academic Year', startDate: '2024-09-01', endDate: '2025-06-30', isCurrent: false }
];

export const mockTerms: Term[] = [
  { id: 't1-2025', yearId: 'ay-2025', name: 'Term 1 (Fall)', startDate: '2025-09-01', endDate: '2025-12-20', isCurrent: false },
  { id: 't2-2025', yearId: 'ay-2025', name: 'Term 2 (Winter/Spring)', startDate: '2026-01-05', endDate: '2026-04-10', isCurrent: true },
  { id: 't3-2025', yearId: 'ay-2025', name: 'Term 3 (Summer)', startDate: '2026-04-20', endDate: '2026-06-30', isCurrent: false }
];

export const mockGradeLevels: GradeLevel[] = [
  { id: 'g-kg', name: 'Kindergarten / Nursery', code: 'KG', levelOrder: 0, stage: 'nursery' },
  { id: 'g-primary-1', name: 'Grade 1 (Primary)', code: 'G01', levelOrder: 1, stage: 'primary' },
  { id: 'g-primary-5', name: 'Grade 5 (Primary)', code: 'G05', levelOrder: 5, stage: 'primary' },
  { id: 'g-middle-8', name: 'Grade 8 (Middle School)', code: 'G08', levelOrder: 8, stage: 'middle' },
  { id: 'g-sec-9', name: 'Grade 9 (Secondary)', code: 'G09', levelOrder: 9, stage: 'secondary' },
  { id: 'g-sec-10', name: 'Grade 10 (Secondary)', code: 'G10', levelOrder: 10, stage: 'secondary' },
  { id: 'g-sec-11', name: 'Grade 11 (High School)', code: 'G11', levelOrder: 11, stage: 'secondary' },
  { id: 'g-sec-12', name: 'Grade 12 (High School)', code: 'G12', levelOrder: 12, stage: 'secondary' }
];

export const mockClasses: SchoolClass[] = [
  { id: 'c-10a', campusId: 'camp-1', gradeLevelId: 'g-sec-10', name: 'Grade 10 - Section A', section: 'A', roomNumber: 'Bld A - Rm 101', capacity: 35, classTeacherId: 'st-teach-1', studentCount: 30 },
  { id: 'c-10b', campusId: 'camp-1', gradeLevelId: 'g-sec-10', name: 'Grade 10 - Section B', section: 'B', roomNumber: 'Bld A - Rm 102', capacity: 35, classTeacherId: 'st-teach-2', studentCount: 28 },
  { id: 'c-11a', campusId: 'camp-1', gradeLevelId: 'g-sec-11', name: 'Grade 11 - Science Stream', section: 'A', roomNumber: 'Sci Wing - Lab 2', capacity: 30, classTeacherId: 'st-teach-3', studentCount: 26 },
  { id: 'c-12a', campusId: 'camp-1', gradeLevelId: 'g-sec-12', name: 'Grade 12 - Senior Honors', section: 'A', roomNumber: 'Bld B - Rm 204', capacity: 30, classTeacherId: 'st-teach-1', studentCount: 25 },
  { id: 'c-8a-har', campusId: 'camp-2', gradeLevelId: 'g-middle-8', name: 'Grade 8 - Section Alpha', section: 'A', roomNumber: 'Hargeisa Main Rm 4', capacity: 40, classTeacherId: 'st-teach-4', studentCount: 32 }
];

export const mockSubjects: Subject[] = [
  { id: 'subj-math', code: 'MATH101', name: 'Advanced Mathematics', department: 'Mathematics & STEM', gradeLevelId: 'g-sec-10', isCompulsory: true, creditHours: 4, color: '#2563EB' },
  { id: 'subj-phy', code: 'PHYS201', name: 'Physics & Mechanics', department: 'Natural Sciences', gradeLevelId: 'g-sec-10', isCompulsory: true, creditHours: 3, color: '#7C3AED' },
  { id: 'subj-eng', code: 'ENG102', name: 'English Literature & Composition', department: 'Languages', gradeLevelId: 'g-sec-10', isCompulsory: true, creditHours: 3, color: '#059669' },
  { id: 'subj-som', code: 'SOM101', name: 'Af-Soomaali & suugaan', department: 'National Languages', gradeLevelId: 'g-sec-10', isCompulsory: true, creditHours: 3, color: '#D97706' },
  { id: 'subj-isl', code: 'ISL101', name: 'Islamic Studies & Tarbiya', department: 'Religious Education', gradeLevelId: 'g-sec-10', isCompulsory: true, creditHours: 2, color: '#047857' },
  { id: 'subj-ict', code: 'ICT301', name: 'Computer Science & AI', department: 'Technology', gradeLevelId: 'g-sec-10', isCompulsory: false, creditHours: 3, color: '#0284C7' },
  { id: 'subj-chem', code: 'CHEM202', name: 'Chemistry', department: 'Natural Sciences', gradeLevelId: 'g-sec-11', isCompulsory: true, creditHours: 3, color: '#DC2626' }
];

export const mockStaff: Staff[] = [
  {
    id: 'st-admin-1',
    employeeId: 'EMP-001',
    fullName: 'Dr. Hassan Ali Farah',
    role: 'principal',
    title: 'Director General & Executive Principal',
    department: 'School Leadership',
    email: 'hassan.farah@globalschool.edu',
    phone: '+252 61 555 1122',
    campusId: 'camp-1',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    employmentType: 'Full-time',
    joinDate: '2019-08-15',
    salary: 4500,
    status: 'Active'
  },
  {
    id: 'st-teach-1',
    employeeId: 'EMP-014',
    fullName: 'Ustadh Mohamed Nur Warsame',
    role: 'teacher',
    title: 'Head of Mathematics Department',
    department: 'Mathematics & STEM',
    email: 'm.warsame@globalschool.edu',
    phone: '+252 61 777 3344',
    campusId: 'camp-1',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    employmentType: 'Full-time',
    joinDate: '2021-01-10',
    salary: 2200,
    status: 'Active'
  },
  {
    id: 'st-teach-2',
    employeeId: 'EMP-018',
    fullName: 'Ms. Amina Dahir Duale',
    role: 'teacher',
    title: 'Senior Physics Teacher',
    department: 'Natural Sciences',
    email: 'a.duale@globalschool.edu',
    phone: '+252 61 888 4455',
    campusId: 'camp-1',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    employmentType: 'Full-time',
    joinDate: '2022-09-01',
    salary: 1950,
    status: 'Active'
  },
  {
    id: 'st-acct-1',
    employeeId: 'EMP-009',
    fullName: 'Ahmed Bashir Jama',
    role: 'accountant',
    title: 'Chief Financial Officer & Accountant',
    department: 'Finance & Accounts',
    email: 'a.jama@globalschool.edu',
    phone: '+252 61 222 9988',
    campusId: 'camp-1',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    employmentType: 'Full-time',
    joinDate: '2020-05-12',
    salary: 3100,
    status: 'Active'
  },
  {
    id: 'st-adm-1',
    employeeId: 'EMP-005',
    fullName: 'Sahra Osman Adan',
    role: 'admissions_officer',
    title: 'Admissions & Registrar Officer',
    department: 'Admissions Office',
    email: 'admissions@globalschool.edu',
    phone: '+252 61 333 4411',
    campusId: 'camp-1',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    employmentType: 'Full-time',
    joinDate: '2021-04-01',
    salary: 2100,
    status: 'Active'
  },
  {
    id: 'st-lib-1',
    employeeId: 'EMP-022',
    fullName: 'Fatima El-Sayed',
    role: 'librarian',
    title: 'Head Librarian',
    department: 'Library Services',
    email: 'f.elsayed@globalschool.edu',
    phone: '+252 61 444 7722',
    campusId: 'camp-1',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    employmentType: 'Full-time',
    joinDate: '2022-02-15',
    salary: 1750,
    status: 'Active'
  }
];

export const mockStudents: Student[] = [
  {
    id: 'stud-101',
    admissionNo: 'GS-2025-0101',
    studentUsername: 'farah.abdi',
    studentPassword: 'Farah@2026',
    parentUsername: 'ahmed.duale',
    parentPassword: 'Parent@2026',
    fullName: 'Farah Ahmed Abdi',
    preferredName: 'Farah',
    gender: 'Male',
    dob: '2009-04-12',
    nationality: 'Somali',
    language: 'Somali / English',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    campusId: 'camp-1',
    academicYearId: 'ay-2025',
    classId: 'c-10a',
    gradeLevelId: 'g-sec-10',
    enrollmentStatus: 'Active',
    houseGroup: 'Blue Nile House',
    parentId: 'prt-501',
    parentName: 'Ahmed Abdi Duale',
    parentPhone: '+252 61 999 0011',
    parentEmail: 'ahmed.duale@gmail.com',
    address: 'Zope Junction, Hodan District, Mogadishu',
    emergencyContact: {
      name: 'Maryam Hassan (Mother)',
      relation: 'Mother',
      phone: '+252 61 999 0022'
    },
    medicalAlerts: ['Mild Asthma (Inhaler in backpack)'],
    allergies: ['Peanuts'],
    transportRouteId: 'route-1',
    hostelRoomId: 'hst-102',
    joinedDate: '2023-09-01',
    feeBalance: 150
  },
  {
    id: 'stud-102',
    admissionNo: 'GS-2025-0102',
    studentUsername: 'amina.ibrahim',
    studentPassword: 'Amina@2026',
    parentUsername: 'dr.mohamed',
    parentPassword: 'Parent@2026',
    fullName: 'Amina Mohamed Ibrahim',
    preferredName: 'Amina',
    gender: 'Female',
    dob: '2009-08-25',
    nationality: 'Somali',
    language: 'Somali / Arabic / English',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    campusId: 'camp-1',
    academicYearId: 'ay-2025',
    classId: 'c-10a',
    gradeLevelId: 'g-sec-10',
    enrollmentStatus: 'Active',
    houseGroup: 'Red Sea House',
    parentId: 'prt-502',
    parentName: 'Dr. Mohamed Ibrahim Osman',
    parentPhone: '+252 61 888 1133',
    parentEmail: 'dr.mohamed.ibrahim@yahoo.com',
    address: 'Waberi District, Near Airport Gate',
    emergencyContact: {
      name: 'Hodan Jama',
      relation: 'Mother',
      phone: '+252 61 888 1144'
    },
    medicalAlerts: [],
    allergies: [],
    transportRouteId: 'route-1',
    joinedDate: '2023-09-01',
    feeBalance: 0
  },
  {
    id: 'stud-103',
    admissionNo: 'GS-2025-0103',
    studentUsername: 'bilal.tariq',
    studentPassword: 'Bilal@2026',
    parentUsername: 'tariq.mansoor',
    parentPassword: 'Parent@2026',
    fullName: 'Bilal Tariq Al-Mansoor',
    preferredName: 'Bilal',
    gender: 'Male',
    dob: '2008-11-05',
    nationality: 'Yemeni',
    language: 'Arabic / English',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    campusId: 'camp-1',
    academicYearId: 'ay-2025',
    classId: 'c-11a',
    gradeLevelId: 'g-sec-11',
    enrollmentStatus: 'Active',
    houseGroup: 'Equator House',
    parentId: 'prt-503',
    parentName: 'Tariq Al-Mansoor',
    parentPhone: '+252 61 777 6655',
    parentEmail: 'tariq.mansoor@gmail.com',
    address: 'Karan District, Mogadishu',
    emergencyContact: {
      name: 'Salma Al-Mansoor',
      relation: 'Mother',
      phone: '+252 61 777 6666'
    },
    medicalAlerts: [],
    allergies: ['Penicillin'],
    joinedDate: '2022-09-01',
    feeBalance: 320
  },
  {
    id: 'stud-104',
    admissionNo: 'GS-2025-0104',
    studentUsername: 'chloe.laurent',
    studentPassword: 'Chloe@2026',
    parentUsername: 'jean.paul',
    parentPassword: 'Parent@2026',
    fullName: 'Chloe Laurent',
    preferredName: 'Chloe',
    gender: 'Female',
    dob: '2009-01-18',
    nationality: 'French',
    language: 'French / English',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    campusId: 'camp-3',
    academicYearId: 'ay-2025',
    classId: 'c-10b',
    gradeLevelId: 'g-sec-10',
    enrollmentStatus: 'Active',
    parentId: 'prt-504',
    parentName: 'Jean-Paul Laurent',
    parentPhone: '+254 711 223 344',
    parentEmail: 'jp.laurent@diplomat.fr',
    address: 'Kilimani, Nairobi',
    emergencyContact: {
      name: 'Marie Laurent',
      relation: 'Mother',
      phone: '+254 711 223 355'
    },
    medicalAlerts: [],
    allergies: [],
    joinedDate: '2024-01-15',
    feeBalance: 0
  }
];

export const mockAttendanceRecords: StudentAttendance[] = [
  { id: 'att-1', studentId: 'stud-101', classId: 'c-10a', date: '2026-07-30', status: 'Present', recordedBy: 'st-teach-1' },
  { id: 'att-2', studentId: 'stud-102', classId: 'c-10a', date: '2026-07-30', status: 'Present', recordedBy: 'st-teach-1' },
  { id: 'att-3', studentId: 'stud-103', classId: 'c-11a', date: '2026-07-30', status: 'Late', note: 'Traffic delay at check-point', recordedBy: 'st-teach-2' },
  { id: 'att-4', studentId: 'stud-104', classId: 'c-10b', date: '2026-07-30', status: 'Excused', note: 'Doctor appointment', recordedBy: 'st-teach-2' }
];

export const mockTimetables: TimetablePeriod[] = [
  { id: 'tt-1', campusId: 'camp-1', classId: 'c-10a', dayOfWeek: 'Monday', periodNumber: 1, startTime: '08:00', endTime: '08:50', subjectId: 'subj-math', teacherId: 'st-teach-1', roomNumber: 'Bld A - Rm 101' },
  { id: 'tt-2', campusId: 'camp-1', classId: 'c-10a', dayOfWeek: 'Monday', periodNumber: 2, startTime: '08:55', endTime: '09:45', subjectId: 'subj-phy', teacherId: 'st-teach-2', roomNumber: 'Bld A - Lab 1' },
  { id: 'tt-3', campusId: 'camp-1', classId: 'c-10a', dayOfWeek: 'Monday', periodNumber: 3, startTime: '10:00', endTime: '10:50', subjectId: 'subj-eng', teacherId: 'st-teach-1', roomNumber: 'Bld A - Rm 101' },
  { id: 'tt-4', campusId: 'camp-1', classId: 'c-10a', dayOfWeek: 'Tuesday', periodNumber: 1, startTime: '08:00', endTime: '08:50', subjectId: 'subj-som', teacherId: 'st-teach-1', roomNumber: 'Bld A - Rm 101' },
  { id: 'tt-5', campusId: 'camp-1', classId: 'c-10a', dayOfWeek: 'Tuesday', periodNumber: 2, startTime: '08:55', endTime: '09:45', subjectId: 'subj-ict', teacherId: 'st-teach-3', roomNumber: 'IT Lab 3' }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asgn-1',
    classId: 'c-10a',
    subjectId: 'subj-math',
    teacherId: 'st-teach-1',
    title: 'Quadratic Equations & Polynomial Functions Problem Set',
    description: 'Solve exercises 1 to 15 on page 142. Make sure to show complete steps for algebraic simplification.',
    dueDate: '2026-08-05',
    totalPoints: 100,
    status: 'Published'
  },
  {
    id: 'asgn-2',
    classId: 'c-10a',
    subjectId: 'subj-phy',
    teacherId: 'st-teach-2',
    title: 'Laboratory Report: Newton\'s Laws of Motion Experiment',
    description: 'Submit your compiled analysis including acceleration graphs, error estimations, and conclusion.',
    dueDate: '2026-08-08',
    totalPoints: 50,
    status: 'Published'
  }
];

export const mockSubmissions: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asgn-1',
    studentId: 'stud-101',
    submittedAt: '2026-07-29T14:30:00Z',
    content: 'Attached are my worked solutions for Quadratic Equations Set A & B.',
    status: 'Graded',
    score: 94,
    feedback: 'Excellent work on step 12 factorization! Keep it up.'
  },
  {
    id: 'sub-2',
    assignmentId: 'asgn-1',
    studentId: 'stud-102',
    submittedAt: '2026-07-29T16:15:00Z',
    content: 'Completed problem set online submission.',
    status: 'Submitted'
  }
];

export const mockExams: Exam[] = [
  {
    id: 'ex-101',
    title: 'Midterm Assessment - Mathematics',
    termId: 't2-2025',
    classId: 'c-10a',
    subjectId: 'subj-math',
    examDate: '2026-08-15',
    startTime: '09:00',
    endTime: '11:00',
    totalMarks: 100,
    weightage: 30,
    status: 'Marks Entry'
  },
  {
    id: 'ex-102',
    title: 'Physics Term 1 Final Exam',
    termId: 't1-2025',
    classId: 'c-10a',
    subjectId: 'subj-phy',
    examDate: '2025-12-15',
    startTime: '10:00',
    endTime: '12:00',
    totalMarks: 100,
    weightage: 40,
    status: 'Published'
  }
];

export const mockExamMarks: ExamMark[] = [
  { id: 'em-1', examId: 'ex-102', studentId: 'stud-101', marksObtained: 88, gradeLetter: 'A', enteredBy: 'st-teach-2', approvedBy: 'st-admin-1', remarks: 'Outstanding analytical skills' },
  { id: 'em-2', examId: 'ex-102', studentId: 'stud-102', marksObtained: 95, gradeLetter: 'A+', enteredBy: 'st-teach-2', approvedBy: 'st-admin-1', remarks: 'Top class performer' }
];

export const mockInvoices: FeeInvoice[] = [
  {
    id: 'inv-1001',
    invoiceNo: 'INV-2026-0089',
    studentId: 'stud-101',
    studentName: 'Farah Ahmed Abdi',
    classId: 'c-10a',
    termId: 't2-2025',
    issueDate: '2026-01-10',
    dueDate: '2026-02-15',
    items: [
      { description: 'Tuition Fee - Term 2', amount: 450 },
      { description: 'Lab & STEM Material Fee', amount: 50 },
      { description: 'Transport Fee (Zone 1)', amount: 100 }
    ],
    totalAmount: 600,
    paidAmount: 450,
    discountAmount: 0,
    status: 'Partially Paid'
  },
  {
    id: 'inv-1002',
    invoiceNo: 'INV-2026-0090',
    studentId: 'stud-102',
    studentName: 'Amina Mohamed Ibrahim',
    classId: 'c-10a',
    termId: 't2-2025',
    issueDate: '2026-01-10',
    dueDate: '2026-02-15',
    items: [
      { description: 'Tuition Fee - Term 2', amount: 450 },
      { description: 'Library & Tech Access', amount: 50 }
    ],
    totalAmount: 500,
    paidAmount: 500,
    discountAmount: 0,
    status: 'Paid'
  }
];

export const mockReceipts: PaymentReceipt[] = [
  {
    id: 'rec-1',
    receiptNo: 'REC-2026-0045',
    invoiceId: 'inv-1001',
    studentId: 'stud-101',
    amount: 450,
    paymentMethod: 'Mobile Money (EVC/Zaad)',
    paymentDate: '2026-01-15',
    referenceNo: 'EVC-99884433',
    receivedBy: 'st-acct-1'
  }
];

export const mockApplications: Application[] = [
  {
    id: 'app-501',
    applicantNo: 'APP-2026-034',
    studentName: 'Yasin Osman Warsame',
    gender: 'Male',
    dob: '2010-06-14',
    campusId: 'camp-1',
    gradeLevelId: 'g-sec-9',
    academicYearId: 'ay-2025',
    parentName: 'Osman Warsame',
    parentPhone: '+252 61 555 7788',
    parentEmail: 'o.warsame@gmail.com',
    status: 'Submitted',
    appliedDate: '2026-07-28',
    notes: 'Transferred from Mogadishu Academy. High marks in Science.'
  },
  {
    id: 'app-502',
    applicantNo: 'APP-2026-035',
    studentName: 'Layla Mohamed Ali',
    gender: 'Female',
    dob: '2011-02-20',
    campusId: 'camp-2',
    gradeLevelId: 'g-middle-8',
    academicYearId: 'ay-2025',
    parentName: 'Mohamed Ali Liban',
    parentPhone: '+252 63 999 4433',
    parentEmail: 'm.liban@gmail.com',
    status: 'Assessment Scheduled',
    appliedDate: '2026-07-25',
    notes: 'Assessment set for Aug 2, 2026 at Hargeisa Campus.'
  }
];

export const mockBooks: LibraryBook[] = [
  { id: 'bk-1', title: 'Calculus & Analytical Geometry', author: 'George B. Thomas', isbn: '978-0134684147', category: 'Mathematics', totalCopies: 10, availableCopies: 7, shelfLocation: 'Shelf M-04' },
  { id: 'bk-2', title: 'Fundamentals of Physics', author: 'Halliday & Resnick', isbn: '978-1118230718', category: 'Science', totalCopies: 8, availableCopies: 2, shelfLocation: 'Shelf P-02' },
  { id: 'bk-3', title: 'Somali Grammar & Classical Poetry', author: 'Prof. Cabdalla Omar Mansur', isbn: '978-8889890123', category: 'National Heritage', totalCopies: 15, availableCopies: 12, shelfLocation: 'Shelf S-01' }
];

export const mockTransportRoutes: TransportRoute[] = [
  { id: 'route-1', routeName: 'Route A - Hodan & Km4 Express', vehicleNo: 'MOG-BUS-01', driverName: 'Abdirahman Ali', driverPhone: '+252 61 444 0011', capacity: 30, assignedStudents: 24, stops: ['Km4 Square', 'Zope Junction', 'Digfer Hospital', 'Main Campus Gate'] },
  { id: 'route-2', routeName: 'Route B - Waberi & Airport Circle', vehicleNo: 'MOG-BUS-02', driverName: 'Dahir Hassan', driverPhone: '+252 61 444 0022', capacity: 30, assignedStudents: 28, stops: ['Airport Hotel Stop', 'Waberi Market', 'Bula Hubey', 'Main Campus Gate'] }
];

export const mockClinicVisits: ClinicVisit[] = [
  { id: 'cv-1', studentId: 'stud-101', studentName: 'Farah Ahmed Abdi', visitDate: '2026-07-28 10:30', symptoms: 'Mild headache during physical education class', treatmentNotes: 'Rested in clinic for 30 mins with hydration and paracetamol 500mg. Returned to class.', administeredBy: 'Nurse Hodan', parentNotified: true }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Midterm Examination Schedule Announcement',
    content: 'All Grade 10 and Grade 11 midterm examination schedules for Term 2 are now finalized and published on student and parent portals.',
    category: 'Exam',
    postedBy: 'Dr. Hassan Ali Farah (Principal)',
    date: '2026-07-29',
    priority: 'High'
  },
  {
    id: 'anc-2',
    title: 'Annual STEM & Innovation Fair 2026',
    content: 'Registration is now open for students wishing to showcase science projects, robotics prototypes, and software solutions.',
    category: 'Event',
    postedBy: 'Ustadh Mohamed Nur Warsame',
    date: '2026-07-27',
    priority: 'Medium'
  }
];

export const mockAuditLogs: AuditLog[] = [
  { id: 'log-1', timestamp: '2026-07-30 08:15:22', userName: 'Dr. Hassan Ali Farah', userRole: 'Principal', action: 'RESULT_APPROVED', details: 'Approved Grade 10 Term 1 Physics exam results', ipAddress: '197.220.89.12' },
  { id: 'log-2', timestamp: '2026-07-29 14:02:10', userName: 'Ahmed Bashir Jama', userRole: 'Accountant', action: 'PAYMENT_RECORDED', details: 'Recorded payment of $450 for Invoice INV-2026-0089', ipAddress: '197.220.89.14' }
];
