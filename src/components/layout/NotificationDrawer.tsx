import React from 'react';
import { X, Bell, AlertTriangle, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { announcements, t } = useSchool();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white dark:bg-slate-800 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-700">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 dark:text-white text-base">System Notifications</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {announcements.map(ann => {
            let Icon = Info;
            let badgeBg = 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
            if (ann.priority === 'High') {
              Icon = AlertTriangle;
              badgeBg = 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
            } else if (ann.category === 'Exam') {
              Icon = Calendar;
              badgeBg = 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
            }

            return (
              <div
                key={ann.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/60 hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${badgeBg}`}>
                    {ann.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                  {ann.content}
                </p>
                <div className="text-[11px] text-slate-400 font-medium italic">
                  Posted by {ann.postedBy}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
