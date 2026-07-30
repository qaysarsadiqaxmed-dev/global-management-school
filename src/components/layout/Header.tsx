import React, { useState } from 'react';
import { 
  Building2, Calendar, UserCheck, Search, Moon, Sun, Globe, Bell, 
  ChevronDown, ShieldCheck, GraduationCap, Users, User, Heart, Sparkles, KeyRound 
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';
import { UserRole, Language } from '../../types';
import { StudentParentLoginModal } from '../auth/StudentParentLoginModal';
import { CredentialsListModal } from '../auth/CredentialsListModal';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenNotifications }) => {
  const { 
    activeRole, setActiveRole, 
    currentCampusId, setCurrentCampusId,
    currentYearId, setCurrentYearId,
    language, setLanguage,
    isDarkMode, setIsDarkMode,
    activeChildId, setActiveChildId,
    campuses, academicYears, students, t, isRTL, announcements 
  } = useSchool();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);

  const rolesList: { role: UserRole; labelKey: string }[] = [
    { role: 'principal', labelKey: 'role_principal' },
    { role: 'teacher', labelKey: 'role_teacher' },
    { role: 'student', labelKey: 'role_student' },
    { role: 'parent', labelKey: 'role_parent' },
    { role: 'accountant', labelKey: 'role_accountant' },
    { role: 'admissions_officer', labelKey: 'role_admissions_officer' },
    { role: 'hr_officer', labelKey: 'role_hr_officer' },
    { role: 'librarian', labelKey: 'role_librarian' },
    { role: 'super_admin', labelKey: 'role_super_admin' },
  ];

  const currentCampus = campuses.find(c => c.id === currentCampusId) || campuses[0];
  const currentYear = academicYears.find(y => y.id === currentYearId) || academicYears[0];
  const unreadCount = announcements.length;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Left: App Logo & Scope Dropdowns */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rotate-45 flex-shrink-0 flex items-center justify-center shadow-xs">
              <span className="-rotate-45 text-white font-black text-xs tracking-tighter">GMS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-black text-slate-900 dark:text-white tracking-tight uppercase flex items-center gap-2">
                GLOBAL MANAGEMENT SCHOOL <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase tracking-widest border border-indigo-200 dark:border-indigo-800">OS</span>
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                {t('appSubtitle')}
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          {/* Campus Switcher */}
          <div className="relative group hidden sm:block">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <select
                value={currentCampusId}
                onChange={e => setCurrentCampusId(e.target.value)}
                className="bg-transparent border-none outline-hidden cursor-pointer font-bold pr-2 text-xs"
              >
                {campuses.map(c => (
                  <option key={c.id} value={c.id} className="dark:bg-slate-800">{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Academic Year Switcher */}
          <div className="relative hidden lg:block">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <select
                value={currentYearId}
                onChange={e => setCurrentYearId(e.target.value)}
                className="bg-transparent border-none outline-hidden cursor-pointer font-bold text-xs"
              >
                {academicYears.map(y => (
                  <option key={y.id} value={y.id} className="dark:bg-slate-800">{y.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center: Search Trigger */}
        <button
          onClick={onOpenSearch}
          className="flex-1 max-w-xs hidden md:flex items-center justify-between px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-medium transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs uppercase font-semibold tracking-wider">{t('searchPlaceholder')}</span>
          </span>
          <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-[10px] font-mono text-slate-500 dark:text-slate-300">
            ⌘K
          </kbd>
        </button>

        {/* Right Actions: Role Switcher, Parent Child Selector, Language, Dark Mode */}
        <div className="flex items-center gap-2">
          
          {/* Parent Child Switcher */}
          {activeRole === 'parent' && (
            <div className="flex items-center gap-1 px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline text-[10px]">CHILD:</span>
              <select
                value={activeChildId}
                onChange={e => setActiveChildId(e.target.value)}
                className="bg-transparent border-none outline-hidden text-xs font-bold cursor-pointer"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id} className="dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                    {s.fullName} ({s.classId})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Student & Parent Portal Login Button */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
            title="Gal Portal-ka Ardayga ama Waalidka"
          >
            <KeyRound className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline text-[10px]">GAL PORTAL-KA</span>
          </button>

          {/* Role Switcher Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-indigo-600 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-indigo-200" />
            <select
              value={activeRole}
              onChange={e => setActiveRole(e.target.value as UserRole)}
              className="bg-transparent border-none outline-hidden text-xs font-bold text-white cursor-pointer uppercase tracking-wider"
            >
              {rolesList.map(r => (
                <option key={r.role} value={r.role} className="bg-slate-900 text-white">
                  {t(r.labelKey)}
                </option>
              ))}
            </select>
          </div>

          {/* Language Picker */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as Language)}
              className="bg-transparent border-none outline-hidden text-xs font-bold cursor-pointer"
            >
              <option value="en" className="dark:bg-slate-800">EN 🇬🇧</option>
              <option value="so" className="dark:bg-slate-800">SO 🇸🇴</option>
              <option value="ar" className="dark:bg-slate-800">AR 🇸🇦</option>
              <option value="fr" className="dark:bg-slate-800">FR 🇫🇷</option>
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-bold uppercase tracking-wider transition-all shadow-2xs ${
              isDarkMode 
                ? 'bg-slate-800 border-amber-500/40 text-amber-300 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
            }`}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[10px]">DARK MODE</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline text-[10px]">LIGHT MODE</span>
              </>
            )}
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-indigo-600 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

        </div>
      </div>

      {/* Render Portal Login Modal */}
      <StudentParentLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onOpenCredentialsList={() => {
          setShowLoginModal(false);
          setShowCredentialsModal(true);
        }}
      />

      {/* Render Credentials List Modal */}
      <CredentialsListModal
        isOpen={showCredentialsModal}
        onClose={() => setShowCredentialsModal(false)}
        onSelectCredential={(u, p, type) => {
          setShowLoginModal(true);
        }}
      />
    </header>
  );
};
