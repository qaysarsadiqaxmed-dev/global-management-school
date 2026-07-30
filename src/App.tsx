import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NotificationDrawer } from './components/layout/NotificationDrawer';

import { DashboardModule } from './components/dashboards/DashboardModule';
import { StudentDirectory } from './components/students/StudentDirectory';
import { AdmissionsModule } from './components/admissions/AdmissionsModule';
import { TimetableModule } from './components/academics/TimetableModule';
import { AttendanceModule } from './components/attendance/AttendanceModule';
import { LearningModule } from './components/learning/LearningModule';
import { ExamsModule } from './components/exams/ExamsModule';
import { FinanceModule } from './components/finance/FinanceModule';
import { HRModule } from './components/hr/HRModule';
import { OperationsModule } from './components/operations/OperationsModule';
import { PublicSchoolPortal } from './components/public/PublicSchoolPortal';
import { SettingsModule } from './components/settings/SettingsModule';
import { MediaGalleryModule } from './components/entertainment/MediaGalleryModule';
import { AIAgentModule } from './components/ai/AIAgentModule';
import { FloatingAIBot } from './components/ai/FloatingAIBot';


function MainLayout() {
  const { isSearchOpen, setIsSearchOpen } = useSchool();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardModule onNavigateTab={setActiveTab} onSelectStudent={setSelectedStudentId} />;
      case 'aiAgent':
        return <AIAgentModule />;
      case 'sis':
        return <StudentDirectory selectedStudentId={selectedStudentId} onSelectStudent={setSelectedStudentId} />;
      case 'admissions':
        return <AdmissionsModule />;
      case 'academics':
      case 'timetable':
        return <TimetableModule />;
      case 'attendance':
        return <AttendanceModule />;
      case 'learning':
        return <LearningModule />;
      case 'exams':
        return <ExamsModule />;
      case 'finance':
        return <FinanceModule />;
      case 'hr':
        return <HRModule />;
      case 'library':
      case 'transport':
      case 'clinic':
      case 'discipline':
        return <OperationsModule />;
      case 'entertainment':
        return <MediaGalleryModule />;
      case 'public':
        return <PublicSchoolPortal />;
      case 'settings':
      case 'auditLogs':
      case 'reports':
        return <SettingsModule />;
      default:
        return <DashboardModule onNavigateTab={setActiveTab} onSelectStudent={setSelectedStudentId} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors">
      
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Dynamic View Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-50/60 dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStudent={id => {
          setSelectedStudentId(id);
          setActiveTab('sis');
        }}
        onNavigateTab={setActiveTab}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Floating AI Agent Assistant */}
      <FloatingAIBot />

    </div>
  );
}

export default function App() {
  return (
    <SchoolProvider>
      <MainLayout />
    </SchoolProvider>
  );
}
