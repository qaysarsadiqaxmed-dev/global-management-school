import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, Language, Campus, AcademicYear, Term, GradeLevel, SchoolClass, Subject, 
  Student, Staff, StudentAttendance, TimetablePeriod, Assignment, AssignmentSubmission, 
  Exam, ExamMark, FeeInvoice, PaymentReceipt, Application, LibraryBook, TransportRoute, 
  ClinicVisit, Announcement, AuditLog 
} from '../types';
import { 
  mockCampuses, mockAcademicYears, mockTerms, mockGradeLevels, mockClasses, mockSubjects, 
  mockStaff, mockStudents, mockAttendanceRecords, mockTimetables, mockAssignments, 
  mockSubmissions, mockExams, mockExamMarks, mockInvoices, mockReceipts, mockApplications, 
  mockBooks, mockTransportRoutes, mockClinicVisits, mockAnnouncements, mockAuditLogs 
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface SchoolContextType {
  // Config & Role
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  currentCampusId: string;
  setCurrentCampusId: (id: string) => void;
  currentYearId: string;
  setCurrentYearId: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  activeChildId: string;
  setActiveChildId: (id: string) => void;
  
  // Translation helper
  t: (key: string) => string;
  isRTL: boolean;
  
  // Data Collections
  campuses: Campus[];
  academicYears: AcademicYear[];
  terms: Term[];
  gradeLevels: GradeLevel[];
  classes: SchoolClass[];
  subjects: Subject[];
  staff: Staff[];
  students: Student[];
  attendance: StudentAttendance[];
  timetables: TimetablePeriod[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  exams: Exam[];
  examMarks: ExamMark[];
  invoices: FeeInvoice[];
  receipts: PaymentReceipt[];
  applications: Application[];
  books: LibraryBook[];
  transportRoutes: TransportRoute[];
  clinicVisits: ClinicVisit[];
  announcements: Announcement[];
  auditLogs: AuditLog[];
  
  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Action Handlers
  addStudent: (student: Omit<Student, 'id' | 'admissionNo' | 'joinedDate'>) => void;
  updateStudent: (student: Student) => void;
  recordAttendance: (classId: string, date: string, records: { studentId: string; status: StudentAttendance['status']; note?: string }[]) => void;
  createAssignment: (assignment: Omit<Assignment, 'id' | 'status'>) => void;
  submitAssignment: (assignmentId: string, studentId: string, content: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;
  submitExamMarks: (examId: string, marks: { studentId: string; score: number; remarks?: string }[]) => void;
  approveExamResults: (examId: string) => void;
  createInvoice: (invoice: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'paidAmount' | 'status'>) => void;
  recordPayment: (invoiceId: string, amount: number, method: PaymentReceipt['paymentMethod'], referenceNo: string) => void;
  updateApplicationStatus: (appId: string, status: Application['status'], notes?: string) => void;
  convertApplicationToStudent: (appId: string, classId: string) => void;
  postAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  addAuditLog: (action: string, details: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('principal');
  const [currentCampusId, setCurrentCampusId] = useState<string>('camp-1');
  const [currentYearId, setCurrentYearId] = useState<string>('ay-2025');
  const [language, setLanguage] = useState<Language>('en');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('gms_dark_mode');
    return saved !== null ? saved === 'true' : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gms_dark_mode', String(isDarkMode));
  }, [isDarkMode]);
  const [activeChildId, setActiveChildId] = useState<string>('stud-101');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // State collections
  const [campuses] = useState<Campus[]>(mockCampuses);
  const [academicYears] = useState<AcademicYear[]>(mockAcademicYears);
  const [terms] = useState<Term[]>(mockTerms);
  const [gradeLevels] = useState<GradeLevel[]>(mockGradeLevels);
  const [classes, setClasses] = useState<SchoolClass[]>(mockClasses);
  const [subjects] = useState<Subject[]>(mockSubjects);
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [attendance, setAttendance] = useState<StudentAttendance[]>(mockAttendanceRecords);
  const [timetables, setTimetables] = useState<TimetablePeriod[]>(mockTimetables);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(mockSubmissions);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [examMarks, setExamMarks] = useState<ExamMark[]>(mockExamMarks);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(mockInvoices);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>(mockReceipts);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [books, setBooks] = useState<LibraryBook[]>(mockBooks);
  const [transportRoutes] = useState<TransportRoute[]>(mockTransportRoutes);
  const [clinicVisits] = useState<ClinicVisit[]>(mockClinicVisits);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const isRTL = language === 'ar';

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Helper audit logger
  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userName: activeRole.toUpperCase(),
      userRole: activeRole,
      action,
      details,
      ipAddress: '197.220.89.50'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // 1. Add Student
  const addStudent = (studentData: Omit<Student, 'id' | 'admissionNo' | 'joinedDate'>) => {
    const newId = `stud-${Date.now()}`;
    const admissionNo = `GS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent: Student = {
      ...studentData,
      id: newId,
      admissionNo,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [newStudent, ...prev]);
    
    // Update class count
    setClasses(prev => prev.map(c => c.id === studentData.classId ? { ...c, studentCount: c.studentCount + 1 } : c));
    addAuditLog('STUDENT_ADMITTED', `Enrolled new student ${studentData.fullName} (${admissionNo})`);
  };

  // 2. Update Student
  const updateStudent = (updated: Student) => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    addAuditLog('STUDENT_UPDATED', `Updated record for student ${updated.fullName}`);
  };

  // 3. Attendance Marking
  const recordAttendance = (
    classId: string, 
    date: string, 
    records: { studentId: string; status: StudentAttendance['status']; note?: string }[]
  ) => {
    setAttendance(prev => {
      // Remove previous records for this class & date
      const filtered = prev.filter(a => !(a.classId === classId && a.date === date));
      const newEntries: StudentAttendance[] = records.map((r, idx) => ({
        id: `att-${Date.now()}-${idx}`,
        studentId: r.studentId,
        classId,
        date,
        status: r.status,
        note: r.note,
        recordedBy: activeRole
      }));
      return [...filtered, ...newEntries];
    });
    addAuditLog('ATTENDANCE_SUBMITTED', `Recorded attendance for class ${classId} on ${date}`);
  };

  // 4. Create Assignment
  const createAssignment = (data: Omit<Assignment, 'id' | 'status'>) => {
    const newAsgn: Assignment = {
      ...data,
      id: `asgn-${Date.now()}`,
      status: 'Published'
    };
    setAssignments(prev => [newAsgn, ...prev]);
    addAuditLog('ASSIGNMENT_CREATED', `Created assignment "${data.title}"`);
  };

  // 5. Submit Assignment
  const submitAssignment = (assignmentId: string, studentId: string, content: string) => {
    const newSub: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      studentId,
      submittedAt: new Date().toISOString(),
      content,
      status: 'Submitted'
    };
    setSubmissions(prev => [newSub, ...prev]);
    addAuditLog('ASSIGNMENT_SUBMITTED', `Student ${studentId} submitted work for assignment ${assignmentId}`);
  };

  // 6. Grade Submission
  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, score, feedback, status: 'Graded' } : s));
    addAuditLog('ASSIGNMENT_GRADED', `Graded submission ${submissionId} with score ${score}`);
  };

  // 7. Exam Marks
  const submitExamMarks = (examId: string, marks: { studentId: string; score: number; remarks?: string }[]) => {
    const newMarks: ExamMark[] = marks.map((m, idx) => {
      let gradeLetter = 'F';
      if (m.score >= 90) gradeLetter = 'A+';
      else if (m.score >= 80) gradeLetter = 'A';
      else if (m.score >= 70) gradeLetter = 'B';
      else if (m.score >= 60) gradeLetter = 'C';
      else if (m.score >= 50) gradeLetter = 'D';

      return {
        id: `em-${Date.now()}-${idx}`,
        examId,
        studentId: m.studentId,
        marksObtained: m.score,
        gradeLetter,
        enteredBy: activeRole,
        remarks: m.remarks
      };
    });

    setExamMarks(prev => {
      const filtered = prev.filter(e => e.examId !== examId);
      return [...filtered, ...newMarks];
    });

    setExams(prev => prev.map(e => e.id === examId ? { ...e, status: 'Under Review' } : e));
    addAuditLog('EXAM_MARKS_SUBMITTED', `Entered exam marks for exam ${examId}`);
  };

  // 8. Approve Exam Results
  const approveExamResults = (examId: string) => {
    setExams(prev => prev.map(e => e.id === examId ? { ...e, status: 'Published' } : e));
    setExamMarks(prev => prev.map(m => m.examId === examId ? { ...m, approvedBy: activeRole } : m));
    addAuditLog('EXAM_RESULTS_APPROVED', `Approved and published exam results for exam ${examId}`);
  };

  // 9. Create Invoice
  const createInvoice = (data: Omit<FeeInvoice, 'id' | 'invoiceNo' | 'paidAmount' | 'status'>) => {
    const newInv: FeeInvoice = {
      ...data,
      id: `inv-${Date.now()}`,
      invoiceNo: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      paidAmount: 0,
      status: 'Unpaid'
    };
    setInvoices(prev => [newInv, ...prev]);
    addAuditLog('INVOICE_GENERATED', `Generated invoice ${newInv.invoiceNo} for student ${data.studentName}`);
  };

  // 10. Record Payment
  const recordPayment = (invoiceId: string, amount: number, method: PaymentReceipt['paymentMethod'], referenceNo: string) => {
    const targetInv = invoices.find(i => i.id === invoiceId);
    if (!targetInv) return;

    const newPaid = targetInv.paidAmount + amount;
    const newStatus = newPaid >= targetInv.totalAmount - targetInv.discountAmount ? 'Paid' : 'Partially Paid';

    const receipt: PaymentReceipt = {
      id: `rec-${Date.now()}`,
      receiptNo: `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceId,
      studentId: targetInv.studentId,
      amount,
      paymentMethod: method,
      paymentDate: new Date().toISOString().split('T')[0],
      referenceNo,
      receivedBy: activeRole
    };

    setReceipts(prev => [receipt, ...prev]);
    setInvoices(prev => prev.map(i => i.id === invoiceId ? { ...i, paidAmount: newPaid, status: newStatus } : i));

    // Update student fee balance
    setStudents(prev => prev.map(s => s.id === targetInv.studentId ? { ...s, feeBalance: Math.max(0, s.feeBalance - amount) } : s));

    addAuditLog('PAYMENT_RECEIVED', `Recorded payment of $${amount} via ${method} for invoice ${targetInv.invoiceNo}`);
  };

  // 11. Applications Pipeline
  const updateApplicationStatus = (appId: string, status: Application['status'], notes?: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status, notes: notes || a.notes } : a));
    addAuditLog('ADMISSION_STATUS_UPDATED', `Updated applicant ${appId} status to ${status}`);
  };

  const convertApplicationToStudent = (appId: string, classId: string) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    addStudent({
      fullName: app.studentName,
      gender: app.gender,
      dob: app.dob,
      nationality: 'Somali',
      language: 'Somali / English',
      photo: app.gender === 'Female' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      campusId: app.campusId,
      academicYearId: app.academicYearId,
      classId,
      gradeLevelId: app.gradeLevelId,
      enrollmentStatus: 'Active',
      parentId: `prt-${Date.now()}`,
      parentName: app.parentName,
      parentPhone: app.parentPhone,
      parentEmail: app.parentEmail,
      address: 'Mogadishu Central',
      emergencyContact: {
        name: app.parentName,
        relation: 'Parent',
        phone: app.parentPhone
      },
      medicalAlerts: [],
      allergies: [],
      feeBalance: 500
    });

    updateApplicationStatus(appId, 'Enrolled');
  };

  // 12. Announcements
  const postAnnouncement = (data: Omit<Announcement, 'id' | 'date'>) => {
    const newAnc: Announcement = {
      ...data,
      id: `anc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    addAuditLog('ANNOUNCEMENT_POSTED', `Posted announcement "${data.title}"`);
  };

  return (
    <SchoolContext.Provider value={{
      activeRole, setActiveRole,
      currentCampusId, setCurrentCampusId,
      currentYearId, setCurrentYearId,
      language, setLanguage,
      isDarkMode, setIsDarkMode,
      activeChildId, setActiveChildId,
      t, isRTL,
      campuses, academicYears, terms, gradeLevels, classes, subjects, staff, students,
      attendance, timetables, assignments, submissions, exams, examMarks, invoices,
      receipts, applications, books, transportRoutes, clinicVisits, announcements, auditLogs,
      isSearchOpen, setIsSearchOpen,
      addStudent, updateStudent, recordAttendance, createAssignment, submitAssignment,
      gradeSubmission, submitExamMarks, approveExamResults, createInvoice, recordPayment,
      updateApplicationStatus, convertApplicationToStudent, postAnnouncement, addAuditLog
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}>
        {children}
      </div>
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
