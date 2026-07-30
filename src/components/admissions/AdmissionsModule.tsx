import React, { useState } from 'react';
import { UserPlus, Clock, CheckCircle2, XCircle, ArrowRight, UserCheck, Search, Filter } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Application } from '../../types';

export const AdmissionsModule: React.FC = () => {
  const { applications, updateApplicationStatus, convertApplicationToStudent, classes, t } = useSchool();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c-10a');

  const statuses: Application['status'][] = [
    'Submitted', 'Under Review', 'Assessment Scheduled', 'Offered', 'Enrolled', 'Rejected'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-indigo-600" /> Admissions & Enrollment Pipeline
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage online applications, schedule assessments, issue admission offers, and convert candidates into enrolled students.
          </p>
        </div>
      </div>

      {/* Kanban / Pipeline Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statuses.map(st => {
          const appsInStatus = applications.filter(a => a.status === st);

          return (
            <div key={st} className="bg-slate-100/70 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col min-h-[350px]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{st}</span>
                <span className="px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-2xs">
                  {appsInStatus.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {appsInStatus.map(app => (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{app.applicantNo}</span>
                      <span>{app.appliedDate}</span>
                    </div>

                    <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-indigo-600">
                      {app.studentName}
                    </h4>

                    <p className="text-[11px] text-slate-500">
                      Parent: {app.parentName} ({app.parentPhone})
                    </p>

                    {app.notes && (
                      <p className="text-[10px] text-slate-400 italic line-clamp-2">"{app.notes}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail & Action Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{selectedApp.studentName}</h3>
                <p className="text-xs text-slate-500 font-mono">Application #{selectedApp.applicantNo} • Grade 9</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Parent Contact:</strong> {selectedApp.parentName} ({selectedApp.parentPhone})</p>
              <p><strong>Email:</strong> {selectedApp.parentEmail}</p>
              <p><strong>Current Status:</strong> <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">{selectedApp.status}</span></p>
              <p><strong>Officer Notes:</strong> {selectedApp.notes || 'None recorded'}</p>
            </div>

            {/* Workflow Action Controls */}
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Update Application Status:</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApp.id, 'Under Review');
                    setSelectedApp(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs"
                >
                  Mark Under Review
                </button>
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApp.id, 'Assessment Scheduled');
                    setSelectedApp(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs"
                >
                  Schedule Assessment
                </button>
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApp.id, 'Offered');
                    setSelectedApp(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs"
                >
                  Issue Offer Letter
                </button>
              </div>

              {/* Conversion to Student */}
              {selectedApp.status === 'Offered' && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-200">Convert to Official Enrolled Student</h5>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedClassId}
                      onChange={e => setSelectedClassId(e.target.value)}
                      className="px-2 py-1 bg-white dark:bg-slate-800 border rounded text-xs"
                    >
                      {classes.map(c => <option key={c.id} value={c.id}>Assign to: {c.name}</option>)}
                    </select>
                    <button
                      onClick={() => {
                        convertApplicationToStudent(selectedApp.id, selectedClassId);
                        setSelectedApp(null);
                      }}
                      className="px-3 py-1 bg-emerald-600 text-white font-bold rounded text-xs"
                    >
                      Finalize Enrollment
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
