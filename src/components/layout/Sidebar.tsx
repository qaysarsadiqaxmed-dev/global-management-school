import React from 'react';
import { 
  LayoutDashboard, Users, UserPlus, BookOpen, Clock, CheckSquare, 
  FileCheck, Award, DollarSign, Briefcase, Bookmark, Bus, 
  Stethoscope, ShieldAlert, Megaphone, BarChart3, History, Settings, Globe, Film, Bot
} from 'lucide-react';

import { useSchool } from '../../context/SchoolContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed
}) => {
  const { t, activeRole } = useSchool();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'aiAgent', label: 'AI Assistant', icon: Bot },
    { id: 'sis', label: t('sis'), icon: Users },
    { id: 'admissions', label: t('admissions'), icon: UserPlus },
    { id: 'academics', label: t('academics'), icon: BookOpen },
    { id: 'timetable', label: t('timetable'), icon: Clock },
    { id: 'attendance', label: t('attendance'), icon: CheckSquare },
    { id: 'learning', label: t('learning'), icon: FileCheck },
    { id: 'exams', label: t('exams'), icon: Award },
    { id: 'finance', label: t('finance'), icon: DollarSign },
    { id: 'hr', label: t('hr'), icon: Briefcase },
    { id: 'library', label: t('library'), icon: Bookmark },
    { id: 'transport', label: t('transport'), icon: Bus },
    { id: 'clinic', label: t('clinic'), icon: Stethoscope },
    { id: 'discipline', label: t('discipline'), icon: ShieldAlert },
    { id: 'entertainment', label: t('entertainment'), icon: Film },
    { id: 'announcements', label: t('announcements'), icon: Megaphone },
    { id: 'reports', label: t('reports'), icon: BarChart3 },
    { id: 'auditLogs', label: t('auditLogs'), icon: History },
    { id: 'settings', label: t('settings'), icon: Settings },
    { id: 'public', label: t('publicPortal'), icon: Globe },
  ];

  return (
    <aside
      className={`bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-3 flex-1 overflow-y-auto space-y-1">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-1.5">
          {!isCollapsed && 'Navigation'}
        </div>
        
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-l-2 ${
                isActive
                  ? 'bg-indigo-600 text-white border-slate-900 dark:border-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Role Badge Indicator */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <div className="flex items-center gap-3 px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="w-3 h-3 bg-indigo-600 rotate-45 flex-shrink-0" />
            <div className="overflow-hidden">
              <p className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">
                {activeRole.replace('_', ' ')}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">System Session Active</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
