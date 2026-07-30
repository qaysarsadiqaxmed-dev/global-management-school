import React from 'react';
import { History, Settings, ShieldCheck, Globe, Building2, Lock, Moon, Sun, Monitor } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const SettingsModule: React.FC = () => {
  const { auditLogs, campuses, isDarkMode, setIsDarkMode, language, setLanguage, t } = useSchool();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <h2 className="text-xl font-black uppercase text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
            <Settings className="w-6 h-6 text-indigo-600" /> School Governance, Appearance & Audit Logs
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
            Theme preference (Light & Dark mode), audit logs, role permissions matrix, and multi-campus configuration.
          </p>
        </div>
      </div>

      {/* Theme & Display Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Dark & Light Mode Card */}
        <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-sm uppercase text-slate-900 dark:text-white tracking-wider">
                System Theme (Light & Dark Mode)
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase">
              {isDarkMode ? 'Dark Active' : 'Light Active'}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Dooro muuqaalka aad doorbideyso (Choose your preferred visual theme for Global Management School):
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setIsDarkMode(false)}
              className={`p-3 border text-left flex items-center gap-3 transition-all ${
                !isDarkMode
                  ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 font-bold ring-2 ring-indigo-600/30'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-400'
              }`}
            >
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase">Light Mode</div>
                <div className="text-[10px] opacity-75">Clean High Contrast Light</div>
              </div>
            </button>

            <button
              onClick={() => setIsDarkMode(true)}
              className={`p-3 border text-left flex items-center gap-3 transition-all ${
                isDarkMode
                  ? 'border-indigo-600 bg-slate-900 text-white font-bold ring-2 ring-indigo-600/30'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-400'
              }`}
            >
              <div className="p-2 bg-slate-800 text-amber-400 rounded-lg">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase">Dark Mode</div>
                <div className="text-[10px] opacity-75">Night & Low Light Theme</div>
              </div>
            </button>
          </div>
        </div>

        {/* Multi-Language & Region Card */}
        <div className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm uppercase text-slate-900 dark:text-white tracking-wider">
              System Language & Localization
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Khasaasiyaadka luqadaha loo beddeli karo Nidaamka Global Management School OS:
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-bold">
            <button
              onClick={() => setLanguage('so')}
              className={`p-2.5 border uppercase text-left transition-all ${
                language === 'so' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Somali (🇸🇴 Af-Soomaali)
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`p-2.5 border uppercase text-left transition-all ${
                language === 'en' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              English (🇬🇧 International)
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`p-2.5 border uppercase text-left transition-all ${
                language === 'ar' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              Arabic (🇸🇦 العربية)
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`p-2.5 border uppercase text-left transition-all ${
                language === 'fr' ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              French (🇫🇷 Français)
            </button>
          </div>
        </div>

      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs space-y-3 p-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-tight">
          <History className="w-5 h-5 text-indigo-600" /> Security Audit Log & Governance Activity
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">User Name & Role</th>
                <th className="p-2.5">Action Code</th>
                <th className="p-2.5">Details</th>
                <th className="p-2.5">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors">
                  <td className="p-2.5 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">{log.userName} ({log.userRole})</td>
                  <td className="p-2.5"><span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold font-mono text-[10px] border border-indigo-200 dark:border-indigo-800">{log.action}</span></td>
                  <td className="p-2.5 text-slate-600 dark:text-slate-300 font-medium">{log.details}</td>
                  <td className="p-2.5 font-mono text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
