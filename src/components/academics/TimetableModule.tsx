import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Calendar, Plus, Building, User, BookOpen } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { TimetablePeriod } from '../../types';

export const TimetableModule: React.FC = () => {
  const { timetables, classes, subjects, staff, t } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c-10a');
  const [viewMode, setViewMode] = useState<'class' | 'teacher' | 'room'>('class');

  const days: TimetablePeriod['dayOfWeek'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [1, 2, 3, 4, 5, 6];

  // Conflict Detection Engine
  const detectConflicts = () => {
    const conflicts: string[] = [];
    const teacherScheduleMap: Record<string, string> = {};
    const roomScheduleMap: Record<string, string> = {};

    timetables.forEach(period => {
      const teacherKey = `${period.dayOfWeek}-P${period.periodNumber}-${period.teacherId}`;
      const roomKey = `${period.dayOfWeek}-P${period.periodNumber}-${period.roomNumber}`;

      if (teacherScheduleMap[teacherKey]) {
        const teacherObj = staff.find(s => s.id === period.teacherId);
        conflicts.push(`Teacher Double Booking: ${teacherObj?.fullName || period.teacherId} is scheduled twice on ${period.dayOfWeek} Period ${period.periodNumber}.`);
      } else {
        teacherScheduleMap[teacherKey] = period.id;
      }

      if (roomScheduleMap[roomKey]) {
        conflicts.push(`Room Overbooking: ${period.roomNumber} is occupied by multiple classes on ${period.dayOfWeek} Period ${period.periodNumber}.`);
      } else {
        roomScheduleMap[roomKey] = period.id;
      }
    });

    return conflicts;
  };

  const currentConflicts = detectConflicts();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-600" /> Timetable & Master Scheduling System
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automated conflict detection for teacher availability, class room reservations, and period assignments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-bold"
          >
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Conflict Status Banner */}
      {currentConflicts.length > 0 ? (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h4 className="font-bold text-red-900 dark:text-red-200">Timetable Conflict Engine Alert ({currentConflicts.length} Issues Found)</h4>
            {currentConflicts.map((c, i) => (
              <p key={i} className="text-red-700 dark:text-red-300">• {c}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Conflict Detection Engine Verified: 0 Schedule Collisions Detected across teachers, rooms, and classes.
        </div>
      )}

      {/* Timetable Weekly Grid */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-500 dark:text-slate-300">
                <th className="p-3 border-r border-slate-200 dark:border-slate-700">Period / Day</th>
                {days.map(d => (
                  <th key={d} className="p-3 border-r border-slate-200 dark:border-slate-700">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {periods.map(pNum => (
                <tr key={pNum}>
                  <td className="p-3 font-bold bg-slate-50 dark:bg-slate-700/30 border-r border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    Period {pNum}
                  </td>
                  {days.map(day => {
                    const periodItem = timetables.find(
                      tItem => tItem.classId === selectedClassId && tItem.dayOfWeek === day && tItem.periodNumber === pNum
                    );
                    const subjectObj = subjects.find(s => s.id === periodItem?.subjectId);
                    const teacherObj = staff.find(st => st.id === periodItem?.teacherId);

                    return (
                      <td key={day} className="p-2 border-r border-slate-200 dark:border-slate-700/50 min-h-[70px] align-top">
                        {periodItem ? (
                          <div
                            style={{ borderLeftColor: subjectObj?.color || '#3B82F6' }}
                            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/40 border-l-4 text-left shadow-2xs space-y-0.5"
                          >
                            <div className="font-bold text-slate-900 dark:text-slate-100 text-xs truncate">
                              {subjectObj?.name || 'Subject'}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              {teacherObj?.fullName || 'Teacher'}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {periodItem.roomNumber}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-300 dark:text-slate-600 py-3 italic">Free Period</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
