import React from 'react';
import { X, Printer, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Student } from '../../types';

interface CertificateModalProps {
  student: Student;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider">
              Official Academic Certificate Studio
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Frame */}
        <div className="p-8 bg-amber-50/40 border-4 border-indigo-900/80 rounded-xl text-slate-900 relative space-y-6 shadow-md text-center">
          
          <div className="flex justify-between items-center border-b-2 border-indigo-900/20 pb-4">
            <div className="w-10 h-10 bg-indigo-950 rotate-45 flex items-center justify-center">
              <span className="-rotate-45 text-white font-black text-xs">GMS</span>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-indigo-950">
                GLOBAL MANAGEMENT SCHOOL
              </h2>
              <p className="text-[10px] font-bold text-indigo-800 uppercase tracking-widest">
                Office of Academic Affairs & Certification
              </p>
            </div>
            <ShieldCheck className="w-10 h-10 text-indigo-900" />
          </div>

          <div className="space-y-3 py-2">
            <span className="text-xs font-serif italic text-slate-600">This is to officially certify that</span>
            <h3 className="text-2xl font-black text-indigo-950 uppercase tracking-wide border-b-2 border-indigo-900/30 inline-block px-8 py-1">
              {student.fullName}
            </h3>
            <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed pt-2">
              has been duly enrolled in good standing in <span className="font-bold">{student.classId}</span> at Global Management School, having maintained exemplary conduct, academic compliance, and full school registration under Admission ID <span className="font-mono font-bold text-indigo-900">{student.admissionNo}</span>.
            </p>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 grid grid-cols-3 gap-4 items-end text-xs font-semibold text-slate-800">
            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold uppercase text-[10px] tracking-wider">Dr. Abdullahi Nur</p>
              <p className="text-[9px] text-slate-500">School Principal</p>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-amber-600 border-dashed flex items-center justify-center text-amber-700 bg-amber-100/80 shadow-2xs">
                <CheckCircle2 className="w-7 h-7 text-amber-600" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-800 mt-1">SEAL OF EXCELLENCE</span>
            </div>

            <div className="border-t border-slate-400 pt-1">
              <p className="font-bold uppercase text-[10px] tracking-wider">Academic Registrar</p>
              <p className="text-[9px] text-slate-500">Global Management School</p>
            </div>
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
            <Printer className="w-4 h-4" /> Print Certificate
          </button>
        </div>

      </div>
    </div>
  );
};
