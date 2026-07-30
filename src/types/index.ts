export type UserRole = 
  | 'super_admin'
  | 'principal'
  | 'academic_admin'
  | 'admissions_officer'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'accountant'
  | 'hr_officer'
  | 'librarian'
  | 'transport_manager'
  | 'clinic_officer';

export type Language = 'en' | 'so' | 'ar' | 'fr';

export interface Campus {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  isMain: boolean;
  studentCount: number;
}

export interface AcademicYear {
  id: string;
  name: string; // e.g. "2025-2026"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Term {
  id: string;
  yearId: string;
  name: string; // e.g. "Term 1"
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface GradeLevel {
  id: string;
  name: string; // e.g. "Grade 10"
  code: string; // e.g. "G10"
  levelOrder: number;
  stage: 'nursery' | 'primary' | 'middle' | 'secondary';
}

export interface SchoolClass {
  id: string;
  campusId: string;
  gradeLevelId: string;
  name: string; // e.g. "Grade 10-A"
  section: string; // "A"
  roomNumber: string;
  capacity: number;
  classTeacherId: string;
  studentCount: number;
}

export interface Subject {
  id: string;
  code: string; // e.g. "MATH101"
  name: string;
  department: string;
  gradeLevelId: string;
  isCompulsory: boolean;
  creditHours: number;
  color: string;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  subjectId: string;
  classId: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  studentUsername?: string;
  studentPassword?: string;
  parentUsername?: string;
  parentPassword?: string;
  fullName: string;
  preferredName?: string;
  gender: 'Male' | 'Female';
  dob: string;
  nationality: string;
  language: string;
  photo: string;
  campusId: string;
  academicYearId: string;
  classId: string;
  gradeLevelId: string;
  enrollmentStatus: 'Active' | 'Applicant' | 'Enrolled' | 'Suspended' | 'Withdrawn' | 'Graduated';
  houseGroup?: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  medicalAlerts: string[];
  allergies: string[];
  transportRouteId?: string;
  hostelRoomId?: string;
  joinedDate: string;
  feeBalance: number;
}

export interface Staff {
  id: string;
  employeeId: string;
  fullName: string;
  role: UserRole;
  title: string;
  department: string;
  email: string;
  phone: string;
  campusId: string;
  photo: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  joinDate: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Resigned';
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused' | 'Sick';

export interface StudentAttendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
  recordedBy: string;
}

export interface TimetablePeriod {
  id: string;
  campusId: string;
  classId: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectId: string;
  teacherId: string;
  roomNumber: string;
}

export interface Assignment {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  attachments?: string[];
  status: 'Published' | 'Draft' | 'Closed';
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content: string;
  fileUrl?: string;
  status: 'Submitted' | 'Graded' | 'Late';
  score?: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  title: string;
  termId: string;
  classId: string;
  subjectId: string;
  examDate: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  weightage: number; // e.g. 40%
  status: 'Scheduled' | 'Marks Entry' | 'Under Review' | 'Published';
}

export interface ExamMark {
  id: string;
  examId: string;
  studentId: string;
  marksObtained: number;
  gradeLetter: string;
  isAbsent?: boolean;
  remarks?: string;
  enteredBy: string;
  approvedBy?: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  classId: string;
  termId: string;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    amount: number;
  }[];
  totalAmount: number;
  paidAmount: number;
  discountAmount: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid' | 'Overdue';
}

export interface PaymentReceipt {
  id: string;
  receiptNo: string;
  invoiceId: string;
  studentId: string;
  amount: number;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Mobile Money (EVC/Zaad)' | 'Credit Card';
  paymentDate: string;
  referenceNo: string;
  receivedBy: string;
}

export interface Application {
  id: string;
  applicantNo: string;
  studentName: string;
  gender: 'Male' | 'Female';
  dob: string;
  campusId: string;
  gradeLevelId: string;
  academicYearId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  status: 'Submitted' | 'Under Review' | 'Assessment Scheduled' | 'Offered' | 'Enrolled' | 'Rejected';
  appliedDate: string;
  notes?: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  coverUrl?: string;
}

export interface TransportRoute {
  id: string;
  routeName: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  assignedStudents: number;
  stops: string[];
}

export interface ClinicVisit {
  id: string;
  studentId: string;
  studentName: string;
  visitDate: string;
  symptoms: string;
  treatmentNotes: string;
  administeredBy: string;
  parentNotified: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'School-Wide' | 'Academic' | 'Exam' | 'Emergency' | 'Event';
  targetRole?: UserRole | 'all';
  campusId?: string;
  postedBy: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  category: 'Sports & Games' | 'Cultural Festivals' | 'Talent Showcase' | 'Ceremonies & Awards' | 'Science & Tech';
  description: string;
  uploadedBy: string;
  uploadDate: string;
  likes: number;
  commentsCount: number;
  views: number;
  tags: string[];
}

