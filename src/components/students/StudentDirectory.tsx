import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Eye, Edit, Trash2, X, Phone, 
  Mail, MapPin, AlertCircle, ShieldAlert, Award, FileText, Download, Bus, Home, Stethoscope, QrCode, Printer, KeyRound, Copy, Check 
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';
import { IDCardModal } from './IDCardModal';
import { CertificateModal } from './CertificateModal';
import { ProfilePhotoModal } from './ProfilePhotoModal';
import { CredentialsListModal } from '../auth/CredentialsListModal';
import { Camera } from 'lucide-react';

interface StudentDirectoryProps {
  selectedStudentId: string | null;
  onSelectStudent: (id: string | null) => void;
}

export const StudentDirectory: React.FC<StudentDirectoryProps> = ({
  selectedStudentId,
  onSelectStudent
}) => {
  const { students, classes, gradeLevels, addStudent, updateStudent, t } = useSchool();
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showIDCard, setShowIDCard] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [editingPhotoStudent, setEditingPhotoStudent] = useState<Student | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);


  // Profile modal active student
  const activeStudent = students.find(s => s.id === selectedStudentId);

  // Form state for new student
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '2010-01-01',
    nationality: 'Somali',
    language: 'Somali / English',
    classId: classes[0]?.id || 'c-10a',
    gradeLevelId: gradeLevels[0]?.id || 'g-sec-10',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalAlert: ''
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.admissionNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.gradeLevelId === gradeFilter;
    const matchesStatus = statusFilter === 'all' || student.enrollmentStatus === statusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.parentName) return;

    addStudent({
      fullName: formData.fullName,
      gender: formData.gender,
      dob: formData.dob,
      nationality: formData.nationality,
      language: formData.language,
      photo: formData.gender === 'Female' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      campusId: 'camp-1',
      academicYearId: 'ay-2025',
      classId: formData.classId,
      gradeLevelId: formData.gradeLevelId,
      enrollmentStatus: 'Active',
      parentId: `prt-${Date.now()}`,
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentEmail: formData.parentEmail,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyContactName || formData.parentName,
        relation: 'Parent',
        phone: formData.emergencyContactPhone || formData.parentPhone
      },
      medicalAlerts: formData.medicalAlert ? [formData.medicalAlert] : [],
      allergies: [],
      feeBalance: 450
    });

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-widest border border-indigo-200 dark:border-indigo-800 mb-1">
            SIS MODULE • REGISTRY
          </span>
          <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" /> Student Information System (SIS)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium uppercase tracking-wider">
            Searchable student records, 360-degree academic profiles, parent linkages, and health notes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowCredentialsModal(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <KeyRound className="w-4 h-4" /> Loginnada (Credentials)
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Register New Student
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-indigo-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search student name or admission ID..."
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider focus:outline-hidden focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <select
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider"
        >
          <option value="all">Filter Grade Level: All</option>
          {gradeLevels.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider"
        >
          <option value="all">Enrollment Status: All</option>
          <option value="Active">Active</option>
          <option value="Enrolled">Enrolled</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Student List Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <th className="p-3">Student Name & ID</th>
                <th className="p-3">Class & Section</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Parent / Guardian</th>
                <th className="p-3">Fee Balance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={student.photo} alt="" className="w-9 h-9 object-cover border border-slate-200 dark:border-slate-700" />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{student.fullName}</div>
                        <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">{student.admissionNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">
                    {student.classId}
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400 font-medium">{student.gender}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{student.parentName}</div>
                    <div className="text-[11px] text-slate-400">{student.parentPhone}</div>
                  </td>
                  <td className="p-3 font-bold">
                    {student.feeBalance > 0 ? (
                      <span className="text-red-600 dark:text-red-400">${student.feeBalance}</span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">Paid Cleared</span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {student.enrollmentStatus}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onSelectStudent(student.id)}
                      className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 ml-auto border border-indigo-200 dark:border-indigo-800 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360-Degree Profile Modal */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
            
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
              <div className="flex items-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => setEditingPhotoStudent(activeStudent)}>
                  <img src={activeStudent.photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600 shadow-md group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{activeStudent.fullName}</h3>
                    <button
                      onClick={() => setEditingPhotoStudent(activeStudent)}
                      className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-600 hover:text-white transition-colors"
                      title="Badal Sawirka Profile-ka"
                    >
                      Badal Sawirka
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">Admission No: {activeStudent.admissionNo} • Class: {activeStudent.classId}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {activeStudent.enrollmentStatus} Student
                  </span>
                </div>
              </div>
              <button onClick={() => onSelectStudent(null)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>


            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-blue-600">Personal & Academic Details</h4>
                <div><strong className="text-slate-500">Gender:</strong> {activeStudent.gender}</div>
                <div><strong className="text-slate-500">Date of Birth:</strong> {activeStudent.dob}</div>
                <div><strong className="text-slate-500">Nationality:</strong> {activeStudent.nationality}</div>
                <div><strong className="text-slate-500">Languages:</strong> {activeStudent.language}</div>
                <div><strong className="text-slate-500">House Group:</strong> {activeStudent.houseGroup || 'N/A'}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-indigo-600">Family & Guardian Info</h4>
                <div><strong className="text-slate-500">Parent Name:</strong> {activeStudent.parentName}</div>
                <div><strong className="text-slate-500">Phone:</strong> {activeStudent.parentPhone}</div>
                <div><strong className="text-slate-500">Email:</strong> {activeStudent.parentEmail}</div>
                <div><strong className="text-slate-500">Residential Address:</strong> {activeStudent.address}</div>
              </div>
            </div>

            {/* Medical Alerts & Transport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-amber-600" /> Medical & Health Alerts
                </h4>
                {activeStudent.medicalAlerts.length > 0 ? (
                  activeStudent.medicalAlerts.map((m, i) => <p key={i} className="text-amber-800 dark:text-amber-300">• {m}</p>)
                ) : (
                  <p className="text-slate-500 italic">No medical alerts logged.</p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1">
                <h4 className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Bus className="w-4 h-4 text-blue-600" /> Transport & Hostel Assignment
                </h4>
                <p className="text-blue-800 dark:text-blue-300">Route A - Hodan Express Bus</p>
                <p className="text-blue-800 dark:text-blue-300">Hostel Bed: Room 102 (Blue Nile Hall)</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowIDCard(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs"
                >
                  <QrCode className="w-4 h-4" /> Print ID Badge
                </button>
                <button
                  onClick={() => setShowCertificate(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-2xs border border-slate-700"
                >
                  <Award className="w-4 h-4 text-amber-400" /> Print Certificate
                </button>
              </div>

              <button onClick={() => onSelectStudent(null)} className="px-5 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider">
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Render ID Card Modal */}
      {showIDCard && activeStudent && (
        <IDCardModal student={activeStudent} onClose={() => setShowIDCard(false)} />
      )}

      {/* Render Certificate Modal */}
      {showCertificate && activeStudent && (
        <CertificateModal student={activeStudent} onClose={() => setShowCertificate(false)} />
      )}

      {/* Render Profile Photo Change Modal */}
      {editingPhotoStudent && (
        <ProfilePhotoModal
          student={editingPhotoStudent}
          onSave={newUrl => {
            updateStudent({ ...editingPhotoStudent, photo: newUrl });
            setEditingPhotoStudent(null);
          }}
          onClose={() => setEditingPhotoStudent(null)}
        />
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <form onSubmit={handleCreateStudent} className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Register New Student</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Student Name *</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sahra Hassan Ali"
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Gender</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Parent / Guardian Name *</label>
                <input
                  required
                  type="text"
                  value={formData.parentName}
                  onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Parent Name"
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Parent Phone Number *</label>
                <input
                  required
                  type="text"
                  value={formData.parentPhone}
                  onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
                  placeholder="+252 61 ..."
                  className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs">
                Save Registration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Render Credentials List Modal */}
      <CredentialsListModal
        isOpen={showCredentialsModal}
        onClose={() => setShowCredentialsModal(false)}
      />

    </div>
  );
};
