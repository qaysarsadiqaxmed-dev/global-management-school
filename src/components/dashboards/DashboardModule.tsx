import React from 'react';
import { 
  Users, UserCheck, DollarSign, AlertCircle, TrendingUp, Calendar, 
  BookOpen, Award, FileText, CheckCircle2, Clock, Plus, ArrowUpRight, 
  Building2, ShieldAlert, Sparkles, Download, MessageSquare 
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface DashboardModuleProps {
  onNavigateTab: (tab: string) => void;
  onSelectStudent: (id: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({ onNavigateTab, onSelectStudent }) => {
  const { 
    activeRole, students, staff, invoices, classes, attendance, 
    assignments, exams, announcements, activeChildId, t 
  } = useSchool();

  // Selected child for Parent Role
  const currentChild = students.find(s => s.id === activeChildId) || students[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Principal / Executive Dashboard */}
      {(activeRole === 'principal' || activeRole === 'super_admin' || activeRole === 'academic_admin') && (
        <>
          {/* Welcome Banner - Geometric Balance Theme */}
          <div className="relative overflow-hidden border border-slate-800 bg-slate-900 p-6 text-white shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-3">
                  <div className="w-2 h-2 bg-indigo-400 rotate-45" /> DHISIDDA MUSTAQBALKA • LEADERSHIP CONSOLE
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  GlobalSchool OS Leadership Console
                </h1>
                <p className="text-slate-300 text-xs mt-1 max-w-2xl uppercase tracking-wider font-medium">
                  Real-time academic performance, multi-campus attendance, fee collection metrics, and administrative governance.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigateTab('sis')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> {t('addStudent')}
                </button>
                <button
                  onClick={() => onNavigateTab('announcements')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> {t('newAnnouncement')}
                </button>
              </div>
            </div>
          </div>

          {/* Metric Cards - Geometric Balance Symmetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-600 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('totalStudents')}</span>
                <div className="w-9 h-9 border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 font-bold">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">1,710</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Across 3 campuses & 8 grades</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-600 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('attendanceToday')}</span>
                <div className="w-9 h-9 border-2 border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">96.4%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Optimal</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">1,648 students present today</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-600 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('feeCollected')}</span>
                <div className="w-9 h-9 border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 font-bold">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">$84,500</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Term 2</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">88% of target achieved</p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-indigo-600 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('pendingApprovals')}</span>
                <div className="w-9 h-9 border-2 border-amber-600 bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 font-bold">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-600 dark:text-amber-400 tracking-tighter">4</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">Action</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Exam marks & admissions review</p>
            </div>

          </div>

          {/* Quick Operations & Multi-Campus Health */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Campus Overview Table */}
            <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" /> Multi-Campus Performance Summary
                </h2>
                <button onClick={() => onNavigateTab('academics')} className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:underline">
                  View All Campuses
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-widest">
                      <th className="py-2.5">Campus Name</th>
                      <th className="py-2.5">Enrolled</th>
                      <th className="py-2.5">Attendance</th>
                      <th className="py-2.5">Fee Clearance</th>
                      <th className="py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-slate-100">Main Campus - Mogadishu</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">850 Students</td>
                      <td className="py-3 text-emerald-600 font-bold">97.2%</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">$48,200 (92%)</td>
                      <td className="py-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">Normal</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-slate-100">East Campus - Hargeisa</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">520 Students</td>
                      <td className="py-3 text-emerald-600 font-bold">95.8%</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">$24,100 (84%)</td>
                      <td className="py-3"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] uppercase tracking-wider">Normal</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-bold text-slate-900 dark:text-slate-100">City Campus - Nairobi</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">340 Students</td>
                      <td className="py-3 text-amber-600 font-bold">94.1%</td>
                      <td className="py-3 text-slate-600 dark:text-slate-300">$12,200 (79%)</td>
                      <td className="py-3"><span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px] uppercase tracking-wider">Review Fees</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* At-Risk & Pending Approvals */}
            <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" /> Pending Approvals & Alerts
              </h2>

              <div className="space-y-3">
                <div className="p-3 border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/30 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">Exam Results Review</span>
                    <p className="text-[11px] text-amber-700 dark:text-amber-300">Grade 10 Physics Midterm submitted by Ms. Amina</p>
                  </div>
                  <button 
                    onClick={() => onNavigateTab('exams')}
                    className="px-3 py-1 bg-amber-600 text-white font-bold text-[10px] uppercase tracking-widest"
                  >
                    Review
                  </button>
                </div>

                <div className="p-3 border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200">Admissions Candidate</span>
                    <p className="text-[11px] text-indigo-700 dark:text-indigo-300">Yasin Osman Warsame (Grade 9) ready for offer</p>
                  </div>
                  <button 
                    onClick={() => onNavigateTab('admissions')}
                    className="px-3 py-1 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest"
                  >
                    Process
                  </button>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

      {/* Teacher Dashboard */}
      {activeRole === 'teacher' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white shadow-xl">
            <h1 className="text-2xl font-extrabold">Teacher Classroom Command Center</h1>
            <p className="text-indigo-200 text-sm mt-1">Ustadh Mohamed Nur Warsame • Head of Mathematics Department</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" /> Today's Teaching Schedule (Monday)
              </h2>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Period 1 (08:00 - 08:50 AM)</span>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Advanced Mathematics - Grade 10-A</h3>
                    <p className="text-xs text-slate-500">Room: Bld A - Rm 101 • 30 Students</p>
                  </div>
                  <button onClick={() => onNavigateTab('attendance')} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">
                    Mark Attendance
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400">Period 3 (10:00 - 10:50 AM)</span>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">English Composition - Grade 10-A</h3>
                    <p className="text-xs text-slate-500">Room: Bld A - Rm 101</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">Upcoming</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Tasks</h2>
              <button onClick={() => onNavigateTab('learning')} className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-between">
                <span>Create New Homework Assignment</span>
                <Plus className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigateTab('exams')} className="w-full p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-xs flex items-center justify-between">
                <span>Enter Midterm Exam Marks</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Dashboard */}
      {activeRole === 'student' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-xl">
            <h1 className="text-2xl font-extrabold">Student Portal: Farah Ahmed Abdi</h1>
            <p className="text-emerald-200 text-sm mt-1">Grade 10 - Section A • Admission No: GS-2025-0101 • House: Blue Nile</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" /> Pending Assignments
              </h2>
              {assignments.map(asg => (
                <div key={asg.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{asg.title}</h3>
                    <p className="text-xs text-slate-500">Due: {asg.dueDate} • Total Points: {asg.totalPoints}</p>
                  </div>
                  <button onClick={() => onNavigateTab('learning')} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                    Submit Work
                  </button>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Academic Results
              </h2>
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-300">Physics Term 1 Final</div>
                <div className="text-2xl font-extrabold text-amber-900 dark:text-amber-100 mt-1">88 / 100 (Grade A)</div>
                <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1">Remarks: Outstanding analytical skills</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Parent Dashboard */}
      {activeRole === 'parent' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-xl">
            <h1 className="text-2xl font-extrabold">Parent Portal - Child Overview</h1>
            <p className="text-purple-200 text-sm mt-1">Viewing child: <strong className="text-white">{currentChild.fullName}</strong> ({currentChild.admissionNo})</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Child Attendance</span>
              <div className="text-2xl font-black text-emerald-600 mt-2">Present Today</div>
              <p className="text-xs text-slate-500 mt-1">100% attendance rate for Term 2</p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Fee Account Balance</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">${currentChild.feeBalance}</div>
              <button onClick={() => onNavigateTab('finance')} className="mt-3 w-full py-2 rounded-lg bg-purple-600 text-white font-bold text-xs">
                Pay Fee Online
              </button>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Official Report Card</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">Term 1 Final Transcript</div>
              <button onClick={() => onNavigateTab('exams')} className="mt-3 w-full py-2 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                <Download className="w-4 h-4" /> Download PDF Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accountant Dashboard */}
      {activeRole === 'accountant' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-xl">
            <h1 className="text-2xl font-extrabold">Finance & Financial Accounting Desk</h1>
            <p className="text-emerald-200 text-sm mt-1">Ahmed Bashir Jama • Chief Financial Officer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Term 2 Total Collections</span>
              <div className="text-3xl font-black text-emerald-600 mt-2">$84,500</div>
              <button onClick={() => onNavigateTab('finance')} className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                {t('generateInvoice')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
