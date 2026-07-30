import React, { useState } from 'react';
import { Search, X, User, BookOpen, DollarSign, School, FileText, ArrowRight } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (id: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  onNavigateTab
}) => {
  const { students, staff, invoices, classes, books, t } = useSchool();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchTrimmed = query.toLowerCase().trim();

  const filteredStudents = searchTrimmed
    ? students.filter(s => s.fullName.toLowerCase().includes(searchTrimmed) || s.admissionNo.toLowerCase().includes(searchTrimmed))
    : [];

  const filteredStaff = searchTrimmed
    ? staff.filter(s => s.fullName.toLowerCase().includes(searchTrimmed) || s.employeeId.toLowerCase().includes(searchTrimmed))
    : [];

  const filteredInvoices = searchTrimmed
    ? invoices.filter(i => i.invoiceNo.toLowerCase().includes(searchTrimmed) || i.studentName.toLowerCase().includes(searchTrimmed))
    : [];

  const filteredClasses = searchTrimmed
    ? classes.filter(c => c.name.toLowerCase().includes(searchTrimmed))
    : [];

  const filteredBooks = searchTrimmed
    ? books.filter(b => b.title.toLowerCase().includes(searchTrimmed) || b.author.toLowerCase().includes(searchTrimmed))
    : [];

  const totalResults = filteredStudents.length + filteredStaff.length + filteredInvoices.length + filteredClasses.length + filteredBooks.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            autoFocus
            className="w-full bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden text-base"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-md font-mono">
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-4 divide-y divide-slate-100 dark:divide-slate-700/50">
          {!query && (
            <div className="text-center py-8 text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Type to search across students, staff, classes, invoices, and library catalog...</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">Try: "Farah"</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">Try: "Grade 10"</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md">Try: "INV-2026"</span>
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm font-medium">No results found for "{query}"</p>
            </div>
          )}

          {/* Students */}
          {filteredStudents.length > 0 && (
            <div className="pt-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-500" /> Students ({filteredStudents.length})
              </div>
              <div className="space-y-1">
                {filteredStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => {
                      onSelectStudent(student.id);
                      onNavigateTab('sis');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={student.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600">{student.fullName}</div>
                        <div className="text-xs text-slate-500">{student.admissionNo} • Class {student.classId}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Staff */}
          {filteredStaff.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" /> Faculty & Staff ({filteredStaff.length})
              </div>
              <div className="space-y-1">
                {filteredStaff.map(s => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onNavigateTab('hr');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={s.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600">{s.fullName}</div>
                        <div className="text-xs text-slate-500">{s.title} • {s.department}</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invoices */}
          {filteredInvoices.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Fee Invoices ({filteredInvoices.length})
              </div>
              <div className="space-y-1">
                {filteredInvoices.map(inv => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      onNavigateTab('finance');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600">{inv.invoiceNo} - {inv.studentName}</div>
                      <div className="text-xs text-slate-500">Amount: ${inv.totalAmount} • Status: {inv.status}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Classes */}
          {filteredClasses.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-amber-500" /> Classes ({filteredClasses.length})
              </div>
              <div className="space-y-1">
                {filteredClasses.map(cls => (
                  <button
                    key={cls.id}
                    onClick={() => {
                      onNavigateTab('academics');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/40 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600">{cls.name}</div>
                      <div className="text-xs text-slate-500">Room: {cls.roomNumber} • Students: {cls.studentCount}/{cls.capacity}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
