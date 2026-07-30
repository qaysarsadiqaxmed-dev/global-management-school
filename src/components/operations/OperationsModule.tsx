import React, { useState } from 'react';
import { Bookmark, Bus, Home, Stethoscope, ShieldAlert, CheckCircle2, Search, BookOpen } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const OperationsModule: React.FC = () => {
  const { books, transportRoutes, clinicVisits, t } = useSchool();
  const [activeSubTab, setActiveSubTab] = useState<'library' | 'transport' | 'hostel' | 'clinic' | 'discipline'>('library');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Sub-Tab Selector */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        {[
          { id: 'library', label: 'Library Catalog', icon: Bookmark },
          { id: 'transport', label: 'Transport & Bus Routes', icon: Bus },
          { id: 'hostel', label: 'Hostel & Boarding', icon: Home },
          { id: 'clinic', label: 'School Clinic', icon: Stethoscope },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Library View */}
      {activeSubTab === 'library' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-blue-600" /> Library Catalog & Borrowing Records
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {books.map(bk => (
              <div key={bk.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase">
                  {bk.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{bk.title}</h4>
                <p className="text-xs text-slate-500">Author: {bk.author} • ISBN: {bk.isbn}</p>
                <div className="flex justify-between items-center pt-2 border-t text-xs">
                  <span className="text-slate-500 font-mono">{bk.shelfLocation}</span>
                  <span className="font-bold text-emerald-600">{bk.availableCopies} / {bk.totalCopies} Available</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transport View */}
      {activeSubTab === 'transport' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Bus className="w-5 h-5 text-indigo-600" /> School Transport & Bus Routes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transportRoutes.map(rt => (
              <div key={rt.id} className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rt.routeName}</h4>
                    <p className="text-xs text-indigo-600 font-semibold">Vehicle: {rt.vehicleNo}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-indigo-100 text-indigo-800 font-bold text-xs">
                    {rt.assignedStudents} / {rt.capacity} Seats
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <p><strong>Driver Name:</strong> {rt.driverName} ({rt.driverPhone})</p>
                  <p><strong>Designated Route Stops:</strong> {rt.stops.join(' → ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clinic View */}
      {activeSubTab === 'clinic' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-amber-500" /> School Clinic & Health Visit Logs
            </h3>
          </div>

          <div className="space-y-3">
            {clinicVisits.map(cv => (
              <div key={cv.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{cv.studentName}</span>
                  <span className="text-slate-400 font-mono">{cv.visitDate}</span>
                </div>
                <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold">Symptoms: {cv.symptoms}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300">Treatment: {cv.treatmentNotes}</p>
                <div className="text-[11px] text-slate-400">Administered by: {cv.administeredBy} • Parent Notified: Yes</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hostel View */}
      {activeSubTab === 'hostel' && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
          <Home className="w-10 h-10 mx-auto text-blue-600" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Hostel & Boarding Allocation</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">Blue Nile Hall & Jubba House bed allocations are managed with 100% real-time room capacity tracking.</p>
        </div>
      )}

    </div>
  );
};
