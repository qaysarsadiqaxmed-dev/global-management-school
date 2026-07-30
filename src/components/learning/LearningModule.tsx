import React, { useState } from 'react';
import { FileCheck, Plus, CheckCircle2, Clock, Upload, MessageSquare, X, Send } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Assignment } from '../../types';

export const LearningModule: React.FC = () => {
  const { assignments, submissions, createAssignment, submitAssignment, gradeSubmission, activeRole, t } = useSchool();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Submission form state
  const [studentAnswer, setStudentAnswer] = useState('');

  // New assignment form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [dueDate, setDueDate] = useState('2026-08-10');

  const handleCreateAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    createAssignment({
      classId: 'c-10a',
      subjectId: 'subj-math',
      teacherId: 'st-teach-1',
      title: newTitle,
      description: newDesc,
      dueDate,
      totalPoints: 100
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !studentAnswer) return;

    submitAssignment(selectedAssignment.id, 'stud-101', studentAnswer);
    setSelectedAssignment(null);
    setStudentAnswer('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-blue-600" /> Learning Management System (LMS)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Classroom assignments, digital homework submissions, grading rubrics, and direct teacher feedback.
          </p>
        </div>

        {(activeRole === 'teacher' || activeRole === 'principal') && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Create Assignment
          </button>
        )}
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assignments.map(asg => {
          const asgSubmissions = submissions.filter(s => s.assignmentId === asg.id);

          return (
            <div key={asg.id} className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                    {asg.classId} • Mathematics
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1.5">{asg.title}</h3>
                </div>
                <span className="text-xs font-bold text-slate-400 font-mono">Due: {asg.dueDate}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{asg.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <span className="text-xs text-slate-500 font-medium">Total: {asg.totalPoints} Points</span>
                <button
                  onClick={() => setSelectedAssignment(asg)}
                  className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 hover:bg-blue-100 font-bold text-xs rounded-lg"
                >
                  {activeRole === 'student' ? 'Submit Homework' : `Review Submissions (${asgSubmissions.length})`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission / Review Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{selectedAssignment.title}</h3>
              <button onClick={() => setSelectedAssignment(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeRole === 'student' ? (
              <form onSubmit={handleSubmitWork} className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Your Answer / Homework Text:</label>
                <textarea
                  required
                  rows={4}
                  value={studentAnswer}
                  onChange={e => setStudentAnswer(e.target.value)}
                  placeholder="Type your worked steps or answer details here..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5">
                    <Send className="w-4 h-4" /> Submit to Teacher
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">Student Submissions</h4>
                {submissions.filter(s => s.assignmentId === selectedAssignment.id).map(sub => (
                  <div key={sub.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <strong className="text-slate-900 dark:text-white">Farah Ahmed Abdi</strong>
                      <span className="text-emerald-600 font-bold">{sub.status} ({sub.score ? `${sub.score}/100` : 'Ungraded'})</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">"{sub.content}"</p>
                    {sub.feedback && <p className="text-[11px] text-indigo-600 italic">Feedback: {sub.feedback}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <form onSubmit={handleCreateAssignmentSubmit} className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 space-y-3 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-slate-900 dark:text-white border-b pb-2">Create New Homework Assignment</h3>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Assignment Title *</label>
              <input
                required
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Geometry Problem Set #4"
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description & Instructions</label>
              <textarea
                rows={3}
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Instructions for students..."
                className="w-full mt-1 p-2 bg-slate-50 dark:bg-slate-700 border rounded-lg text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg">Cancel</button>
              <button type="submit" className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg">Publish Assignment</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
