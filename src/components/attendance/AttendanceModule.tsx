import React, { useState } from 'react';
import { CheckSquare, Calendar, Check, X, Clock, AlertCircle, Save } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { AttendanceStatus } from '../../types';

export const AttendanceModule: React.FC = () => {
  const { students, classes, attendance, recordAttendance, t } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c-10a');
  const [attendanceDate, setAttendanceDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Students in selected class
  const classStudents = students.filter(s => s.classId === selectedClassId);

  // Local state for current marking grid
  const [attendanceState, setAttendanceState] = useState<Record<string, { status: AttendanceStatus; note: string }>>(() => {
    const initialState: Record<string, { status: AttendanceStatus; note: string }> = {};
    classStudents.forEach(s => {
      const existing = attendance.find(a => a.studentId === s.id && a.date === attendanceDate);
      initialState[s.id] = {
        status: existing?.status || 'Present',
        note: existing?.note || ''
      };
    });
    return initialState;
  });

  const handleMarkAllPresent = () => {
    const updated = { ...attendanceState };
    classStudents.forEach(s => {
      updated[s.id] = { ...updated[s.id], status: 'Present' };
    });
    setAttendanceState(updated);
  };

  const handleSaveAttendance = () => {
    const records = classStudents.map(s => ({
      studentId: s.id,
      status: attendanceState[s.id]?.status || 'Present',
      note: attendanceState[s.id]?.note || ''
    }));

    recordAttendance(selectedClassId, attendanceDate, records);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-emerald-600" /> Daily & Period Attendance Register
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Record, verify, and lock daily class registers. Sends immediate absence alerts to linked parents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={attendanceDate}
            onChange={e => setAttendanceDate(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold"
          />

          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
          Marking Register for <span className="underline">{classStudents.length} Students</span> in {selectedClassId}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-lg border border-emerald-300 shadow-2xs hover:bg-emerald-100"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSaveAttendance}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Register
          </button>
        </div>
      </div>

      {/* Attendance Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                <th className="p-3">Student Name</th>
                <th className="p-3">Admission No</th>
                <th className="p-3">Attendance Status</th>
                <th className="p-3">Remarks / Lateness Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {classStudents.map(student => {
                const currentRecord = attendanceState[student.id] || { status: 'Present', note: '' };

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img src={student.photo} alt="" className="w-7 h-7 rounded-full object-cover" />
                        <span className="font-bold text-slate-900 dark:text-slate-100">{student.fullName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-400 font-mono">{student.admissionNo}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {(['Present', 'Absent', 'Late', 'Excused', 'Sick'] as AttendanceStatus[]).map(st => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setAttendanceState({
                              ...attendanceState,
                              [student.id]: { ...currentRecord, status: st }
                            })}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              currentRecord.status === st
                                ? st === 'Present' ? 'bg-emerald-600 text-white'
                                : st === 'Absent' ? 'bg-red-600 text-white'
                                : st === 'Late' ? 'bg-amber-500 text-white'
                                : 'bg-blue-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={currentRecord.note}
                        onChange={e => setAttendanceState({
                          ...attendanceState,
                          [student.id]: { ...currentRecord, note: e.target.value }
                        })}
                        placeholder="Add note if late/absent..."
                        className="w-full p-1.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-xs"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
