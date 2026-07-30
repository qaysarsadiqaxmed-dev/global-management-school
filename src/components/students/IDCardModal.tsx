import React from 'react';
import { X, Printer, QrCode, ShieldCheck, Award } from 'lucide-react';
import { Student } from '../../types';

interface IDCardModalProps {
  student: Student;
  onClose: () => void;
}

export const IDCardModal: React.FC<IDCardModalProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider">
              Student ID Card Generator
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable ID Card Container */}
        <div id="printable-id-card" className="mx-auto w-[340px] h-[215px] rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-4 shadow-xl border-2 border-indigo-500/30 relative overflow-hidden flex flex-col justify-between">
          
          {/* Subtle Background Geometric Overlay */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Bar: School Logo & Title */}
          <div className="flex items-center justify-between border-b border-indigo-400/20 pb-2 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rotate-45 flex items-center justify-center shadow-xs">
                <span className="-rotate-45 text-white font-black text-[9px] tracking-tighter">GMS</span>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-indigo-200 leading-tight">
                  Global Management School
                </h4>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Official Student Access Pass</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-[8px] uppercase tracking-widest rounded-full">
              ACTIVE
            </span>
          </div>

          {/* Body: Photo, Info & QR */}
          <div className="flex items-center justify-between gap-3 relative z-10 my-auto">
            <div className="relative shrink-0">
              <img
                src={student.photo}
                alt={student.fullName}
                className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-400/60 shadow-md"
              />
              <ShieldCheck className="w-4 h-4 text-indigo-400 absolute -bottom-1 -right-1 bg-slate-900 rounded-full" />
            </div>

            <div className="flex-1 space-y-1">
              <h5 className="text-xs font-extrabold text-white tracking-tight uppercase line-clamp-1">
                {student.fullName}
              </h5>
              <div className="text-[9px] text-indigo-200 font-mono space-y-0.5">
                <div>ID: <span className="font-bold text-white">{student.admissionNo}</span></div>
                <div>CLASS: <span className="font-bold text-slate-200">{student.classId}</span></div>
                <div>GENDER: <span className="font-bold text-slate-200">{student.gender}</span></div>
              </div>
            </div>

            {/* Simulated QR Code */}
            <div className="shrink-0 text-center bg-white p-1 rounded-lg shadow-sm">
              <QrCode className="w-10 h-10 text-slate-900" />
              <span className="text-[7px] font-mono text-slate-600 font-bold uppercase tracking-tighter block mt-0.5">VERIFIED</span>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="border-t border-indigo-400/20 pt-1.5 flex justify-between items-center text-[8px] font-medium text-slate-400 relative z-10">
            <span>GUARDIAN: {student.parentPhone}</span>
            <span className="font-mono text-indigo-300">EXP: 08/2026</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print ID Badge
          </button>
        </div>

      </div>
    </div>
  );
};
