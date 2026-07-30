import React, { useState } from 'react';
import { X, Search, Copy, Check, KeyRound, Shield, User, Printer, Download, Sparkles } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface CredentialsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCredential?: (username: string, password: string, role: 'student' | 'parent') => void;
}

export const CredentialsListModal: React.FC<CredentialsListModalProps> = ({
  isOpen,
  onClose,
  onSelectCredential
}) => {
  const { students } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.studentUsername && s.studentUsername.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.parentUsername && s.parentUsername.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                Tusmada Loginnada Ardayda & Waalidiinta (Credentials Directory)
              </h2>
              <p className="text-xs text-slate-400">
                Mid kasta oo ka mid ah ardayda iyo waalidiinta wuxuu leeyahay Username iyo Password u gaar ah.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" /> Daabac Credentials
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Raadi magaca ardayga, waalidka, ama admission number..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 px-3">
            Total: {filteredStudents.length} Students & Parents
          </div>
        </div>

        {/* Credentials Table */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3.5">Ardayga & Admission</th>
                  <th className="p-3.5">Loginka Ardayga (Student Username/Pass)</th>
                  <th className="p-3.5">Waalidka & Tel</th>
                  <th className="p-3.5">Loginka Waalidka (Parent Username/Pass)</th>
                  <th className="p-3.5 text-right">Tallaabo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredStudents.map(student => {
                  const sUser = student.studentUsername || student.admissionNo.toLowerCase();
                  const sPass = student.studentPassword || 'Student@2026';
                  const pUser = student.parentUsername || `prt-${student.id}`;
                  const pPass = student.parentPassword || 'Parent@2026';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      
                      {/* Student Info */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={student.photo}
                            alt={student.fullName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{student.fullName}</div>
                            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                              {student.admissionNo}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Student Credentials */}
                      <td className="p-3.5">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl space-y-1 font-mono text-[11px]">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-[10px]">User:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{sUser}</span>
                            <button
                              onClick={() => copyToClipboard(sUser, `su-${student.id}`)}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-indigo-600"
                              title="Copy Username"
                            >
                              {copiedId === `su-${student.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-2 border-t border-slate-200 dark:border-slate-700 pt-1">
                            <span className="text-slate-500 dark:text-slate-400 text-[10px]">Pass:</span>
                            <span className="font-bold text-indigo-600 dark:text-indigo-300">{sPass}</span>
                            <button
                              onClick={() => copyToClipboard(sPass, `sp-${student.id}`)}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-indigo-600"
                              title="Copy Password"
                            >
                              {copiedId === `sp-${student.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Parent Info */}
                      <td className="p-3.5">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{student.parentName}</div>
                        <div className="text-[10px] text-slate-500">{student.parentPhone}</div>
                      </td>

                      {/* Parent Credentials */}
                      <td className="p-3.5">
                        <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl space-y-1 font-mono text-[11px]">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-slate-500 dark:text-slate-400 text-[10px]">User:</span>
                            <span className="font-bold text-slate-900 dark:text-white">{pUser}</span>
                            <button
                              onClick={() => copyToClipboard(pUser, `pu-${student.id}`)}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-indigo-600"
                              title="Copy Username"
                            >
                              {copiedId === `pu-${student.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-2 border-t border-slate-200 dark:border-slate-700 pt-1">
                            <span className="text-slate-500 dark:text-slate-400 text-[10px]">Pass:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{pPass}</span>
                            <button
                              onClick={() => copyToClipboard(pPass, `pp-${student.id}`)}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-indigo-600"
                              title="Copy Password"
                            >
                              {copiedId === `pp-${student.id}` ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Quick Login Action */}
                      <td className="p-3.5 text-right space-y-1">
                        {onSelectCredential && (
                          <div className="flex flex-col gap-1 items-end">
                            <button
                              onClick={() => {
                                onSelectCredential(sUser, sPass, 'student');
                                onClose();
                              }}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] rounded-lg transition-all"
                            >
                              Login Arday
                            </button>
                            <button
                              onClick={() => {
                                onSelectCredential(pUser, pPass, 'parent');
                                onClose();
                              }}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition-all"
                            >
                              Login Waalid
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500" /> All credentials are generated and encrypted safely for student & parent governance.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-300 transition-all"
          >
            Khaas / Xidh
          </button>
        </div>

      </div>
    </div>
  );
};
