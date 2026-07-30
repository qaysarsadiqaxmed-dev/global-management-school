import React, { useState } from 'react';
import { Briefcase, Users, DollarSign, Calendar, CheckCircle2, FileText, Plus } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { Staff } from '../../types';

export const HRModule: React.FC = () => {
  const { staff, t } = useSchool();
  const [activeStaff, setActiveStaff] = useState<Staff | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Human Resources & Staff Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Faculty directory, employment contracts, leave management, and monthly payroll processing.
          </p>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map(member => (
          <div key={member.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <div className="flex items-center gap-3">
              <img src={member.photo} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{member.fullName}</h3>
                <p className="text-xs text-indigo-600 font-semibold">{member.title}</p>
                <span className="text-[10px] text-slate-400 font-mono">{member.employeeId}</span>
              </div>
            </div>

            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700">
              <p><strong>Department:</strong> {member.department}</p>
              <p><strong>Joined:</strong> {member.joinDate}</p>
              <p><strong>Monthly Salary:</strong> <span className="font-bold text-emerald-600">${member.salary}</span></p>
            </div>

            <button
              onClick={() => setActiveStaff(member)}
              className="w-full py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold text-xs rounded-lg hover:bg-indigo-100"
            >
              View Contract & Payslip
            </button>
          </div>
        ))}
      </div>

      {/* Payslip Modal */}
      {activeStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-base">{activeStaff.fullName}</h3>
                <p className="text-xs text-slate-500 font-mono">Employee ID: {activeStaff.employeeId}</p>
              </div>
              <button onClick={() => setActiveStaff(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl space-y-1">
                <h4 className="font-bold text-indigo-600 uppercase text-[10px]">Salary Breakdown (July 2026)</h4>
                <div className="flex justify-between"><span>Base Salary:</span> <strong>${activeStaff.salary}</strong></div>
                <div className="flex justify-between"><span>Housing Allowance:</span> <strong>$200</strong></div>
                <div className="flex justify-between text-red-600"><span>Tax & Pension Deductions:</span> <strong>-$150</strong></div>
                <div className="flex justify-between pt-2 border-t font-black text-emerald-600 text-sm">
                  <span>Net Salary Payable:</span>
                  <span>${activeStaff.salary + 50}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => window.print()} className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs">Print Official Payslip</button>
              <button onClick={() => setActiveStaff(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
