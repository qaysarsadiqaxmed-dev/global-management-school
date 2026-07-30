import React, { useState } from 'react';
import { Award, CheckCircle2, Clock, Printer, Download, Eye, Edit3, X, ShieldCheck, FileSpreadsheet, Sparkles } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Exam, Student } from '../../types';

export const ExamsModule: React.FC = () => {
  const { exams, examMarks, students, classes, subjects, submitExamMarks, approveExamResults, activeRole, t } = useSchool();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [reportStudent, setReportStudent] = useState<Student | null>(null);

  // Local grid state for marks entry
  const [marksGrid, setMarksGrid] = useState<Record<string, number>>({});

  const handleOpenMarkEntry = (exam: Exam) => {
    setSelectedExam(exam);
    const initial: Record<string, number> = {};
    const examClassStudents = students.filter(s => s.classId === exam.classId);
    examClassStudents.forEach(s => {
      const existing = examMarks.find(m => m.examId === exam.id && m.studentId === s.id);
      initial[s.id] = existing ? existing.marksObtained : 85;
    });
    setMarksGrid(initial);
  };

  const handleSaveMarks = () => {
    if (!selectedExam) return;
    const entries = Object.entries(marksGrid).map(([studentId, score]) => {
      const scoreNum = Number(score);
      return {
        studentId,
        score: scoreNum,
        remarks: scoreNum >= 90 ? 'Excellent performance' : scoreNum >= 75 ? 'Good effort' : 'Requires review'
      };
    });

    submitExamMarks(selectedExam.id, entries);
    setSelectedExam(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" /> Examinations & Report Card Publishing
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure assessments, record raw marks, validate weighted calculations, approve results, and issue official report cards.
          </p>
        </div>
      </div>

      {/* Scheduled Examinations Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
          <span>Active Examination Schedules & Workflows</span>
          <span className="text-xs text-slate-400 font-normal">Academic Year 2025-2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                <th className="p-3">Exam Title</th>
                <th className="p-3">Class</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Exam Date</th>
                <th className="p-3">Total Marks / Weight</th>
                <th className="p-3">Workflow Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {exams.map(exam => {
                const subjectObj = subjects.find(s => s.id === exam.subjectId);

                return (
                  <tr key={exam.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{exam.title}</td>
                    <td className="p-3 font-medium text-slate-600 dark:text-slate-300">{exam.classId}</td>
                    <td className="p-3 font-semibold text-indigo-600">{subjectObj?.name || exam.subjectId}</td>
                    <td className="p-3 text-slate-500 font-mono">{exam.examDate} ({exam.startTime})</td>
                    <td className="p-3 font-medium">{exam.totalMarks} Marks ({exam.weightage}%)</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        exam.status === 'Published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        exam.status === 'Under Review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {exam.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenMarkEntry(exam)}
                          className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold rounded-lg text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 inline mr-1" /> Enter Marks
                        </button>
                        {(activeRole === 'principal' || activeRole === 'academic_admin') && exam.status === 'Under Review' && (
                          <button
                            onClick={() => approveExamResults(exam.id)}
                            className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 inline mr-1" /> Approve & Publish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Report Cards Preview Selector */}
      <div className="p-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Issue Official Student Report Cards
          </h3>
          <p className="text-xs text-purple-200 mt-0.5">Generate, preview, print, or download term transcripts with principal verification seal.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            onChange={e => {
              const s = students.find(stud => stud.id === e.target.value);
              if (s) setReportStudent(s);
            }}
            className="px-3 py-2 bg-white/10 text-white border border-white/20 rounded-xl text-xs font-bold cursor-pointer"
          >
            <option value="" className="text-slate-900">Select Student for Report Card Preview...</option>
            {students.map(s => <option key={s.id} value={s.id} className="text-slate-900">{s.fullName} ({s.admissionNo})</option>)}
          </select>
        </div>
      </div>

      {/* Mark Entry Modal */}
      {selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedExam.title}</h3>
                <p className="text-xs text-slate-500 font-mono">Class: {selectedExam.classId} • Total Score: {selectedExam.totalMarks}</p>
              </div>
              <button onClick={() => setSelectedExam(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {students.filter(s => s.classId === selectedExam.classId).map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <img src={student.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{student.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{student.admissionNo}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Score / 100:</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={marksGrid[student.id] ?? 85}
                      onChange={e => setMarksGrid({ ...marksGrid, [student.id]: Number(e.target.value) })}
                      className="w-20 p-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-bold text-center"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button onClick={() => setSelectedExam(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs">
                Cancel
              </button>
              <button onClick={handleSaveMarks} className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl text-xs">
                Submit Marks for Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Report Card Printable Modal */}
      {reportStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-2xl max-w-3xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            
            {/* Report Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-900 rotate-45 flex items-center justify-center font-black text-white shrink-0">
                  <span className="-rotate-45 text-sm font-black">GMS</span>
                </div>
                <div>
                  <h1 className="text-xl font-black uppercase tracking-wide text-slate-900">Global Management School</h1>
                  <p className="text-xs font-bold text-slate-600 uppercase">Official Academic Transcript & Term Report Card</p>
                  <p className="text-[11px] text-slate-500 font-medium">Main Campus - Mogadishu • Accredited Educational Institution</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded bg-blue-100 text-blue-900 font-bold text-xs">TERM 2 (2025-2026)</span>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">Doc ID: TR-2026-9942</p>
              </div>
            </div>

            {/* Student Info Box */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <p><strong>Student Name:</strong> {reportStudent.fullName}</p>
                <p><strong>Admission No:</strong> {reportStudent.admissionNo}</p>
                <p><strong>Class & Section:</strong> {reportStudent.classId}</p>
              </div>
              <div>
                <p><strong>Parent Name:</strong> {reportStudent.parentName}</p>
                <p><strong>Overall Attendance:</strong> 98% (Present)</p>
                <p><strong>Conduct & Discipline:</strong> Exemplary (A)</p>
              </div>
            </div>

            {/* Subject Marks Table */}
            <table className="w-full text-left text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px]">
                  <th className="p-2 border-r">Subject Name</th>
                  <th className="p-2 border-r">Credit Hours</th>
                  <th className="p-2 border-r">Continuous (60%)</th>
                  <th className="p-2 border-r">Final Exam (40%)</th>
                  <th className="p-2 border-r">Total Score</th>
                  <th className="p-2">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                <tr>
                  <td className="p-2 border-r font-bold">Advanced Mathematics</td>
                  <td className="p-2 border-r">4</td>
                  <td className="p-2 border-r">54 / 60</td>
                  <td className="p-2 border-r">36 / 40</td>
                  <td className="p-2 border-r font-bold">90 / 100</td>
                  <td className="p-2 font-bold text-emerald-700">A+</td>
                </tr>
                <tr>
                  <td className="p-2 border-r font-bold">Physics & Mechanics</td>
                  <td className="p-2 border-r">3</td>
                  <td className="p-2 border-r">50 / 60</td>
                  <td className="p-2 border-r">38 / 40</td>
                  <td className="p-2 border-r font-bold">88 / 100</td>
                  <td className="p-2 font-bold text-emerald-700">A</td>
                </tr>
                <tr>
                  <td className="p-2 border-r font-bold">English Literature</td>
                  <td className="p-2 border-r">3</td>
                  <td className="p-2 border-r">52 / 60</td>
                  <td className="p-2 border-r">35 / 40</td>
                  <td className="p-2 border-r font-bold">87 / 100</td>
                  <td className="p-2 font-bold text-emerald-700">A</td>
                </tr>
                <tr>
                  <td className="p-2 border-r font-bold">Af-Soomaali & Suugaan</td>
                  <td className="p-2 border-r">3</td>
                  <td className="p-2 border-r">56 / 60</td>
                  <td className="p-2 border-r">39 / 40</td>
                  <td className="p-2 border-r font-bold">95 / 100</td>
                  <td className="p-2 font-bold text-emerald-700">A+</td>
                </tr>
              </tbody>
            </table>

            {/* GPA Summary & Signatures */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-300 text-xs">
              <div>
                <p className="font-bold text-sm text-slate-900">Term GPA: 3.92 / 4.00 (Class Rank: 1st)</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Promotion Decision: PROMOTED TO GRADE 11</p>
              </div>

              {/* Signatures */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="h-8 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-slate-600">Ustadh Warsame</div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Class Teacher Signature</span>
                </div>
                <div className="text-center">
                  <div className="h-8 border-b border-slate-400 mb-1 flex items-end justify-center font-serif italic text-blue-900 font-bold">Dr. Hassan Ali Farah</div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Principal Verification Seal</span>
                </div>
              </div>
            </div>

            {/* Print Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                <Printer className="w-4 h-4" /> Print Official Report
              </button>
              <button onClick={() => setReportStudent(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
