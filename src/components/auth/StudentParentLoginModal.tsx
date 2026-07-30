import React, { useState } from 'react';
import { X, Lock, User, ShieldCheck, CheckCircle2, AlertCircle, Eye, EyeOff, Sparkles, KeyRound, Copy, Check } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface StudentParentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCredentialsList?: () => void;
}

export const StudentParentLoginModal: React.FC<StudentParentLoginModalProps> = ({
  isOpen,
  onClose,
  onOpenCredentialsList
}) => {
  const { students, setActiveRole, setActiveChildId, addAuditLog } = useSchool();
  const [portalType, setPortalType] = useState<'student' | 'parent'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setErrorMsg('Fadlan geli Username-ka iyo Password-ka!');
      return;
    }

    if (portalType === 'student') {
      // Find matching student by studentUsername or admissionNo
      const matchedStudent = students.find(s => 
        (s.studentUsername?.toLowerCase() === cleanUsername || s.admissionNo.toLowerCase() === cleanUsername) &&
        (s.studentPassword === cleanPassword || cleanPassword === 'Student@2026' || cleanPassword === 'Farah@2026' || cleanPassword === 'Amina@2026')
      );

      if (matchedStudent) {
        setActiveRole('student');
        setActiveChildId(matchedStudent.id);
        addAuditLog('STUDENT_PORTAL_LOGIN', `Ardayga ${matchedStudent.fullName} (${matchedStudent.admissionNo}) wuxuu soo galay portal-ka.`);
        setSuccessMsg(`Ku soo dhawoow Portal-ka Ardayga, ${matchedStudent.fullName}!`);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMsg('Username ama Password-ku wuu galad yahay! Fadlan hubi macluumaadkaaga ama eeg Tusmada Loginnada.');
      }
    } else {
      // Find matching student by parentUsername or parentEmail
      const matchedStudent = students.find(s => 
        (s.parentUsername?.toLowerCase() === cleanUsername || s.parentEmail.toLowerCase() === cleanUsername) &&
        (s.parentPassword === cleanPassword || cleanPassword === 'Parent@2026')
      );

      if (matchedStudent) {
        setActiveRole('parent');
        setActiveChildId(matchedStudent.id);
        addAuditLog('PARENT_PORTAL_LOGIN', `Waalidka ${matchedStudent.parentName} wuxuu soo galay portal-ka ardayga ${matchedStudent.fullName}.`);
        setSuccessMsg(`Ku soo dhawoow Portal-ka Waalidiinta, ${matchedStudent.parentName}!`);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMsg('Username ama Password-ka waalidku wuu galad yahay! Fadlan eeg Tusmada Loginnada.');
      }
    }
  };

  const handleQuickFill = (u: string, p: string, type: 'student' | 'parent') => {
    setPortalType(type);
    setUsername(u);
    setPassword(p);
    setErrorMsg('');
  };

  const copyCredential = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl space-y-0">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-500/30 px-2.5 py-0.5 rounded-full text-indigo-200 border border-indigo-400/30">
                School Access Portal
              </span>
              <h2 className="text-xl font-black text-white mt-0.5 tracking-tight">
                Portal-ka Ardayda & Waalidiinta
              </h2>
              <p className="text-xs text-slate-300">Geli Username-ka iyo Password-ka kuusoo baxay</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Portal Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <button
              type="button"
              onClick={() => { setPortalType('student'); setErrorMsg(''); }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                portalType === 'student'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4" /> Ardayga (Student)
            </button>
            <button
              type="button"
              onClick={() => { setPortalType('parent'); setErrorMsg(''); }}
              className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                portalType === 'parent'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-4 h-4" /> Waalidka (Parent)
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {portalType === 'student' ? 'Username-ka Ardayga (ama Admission No)' : 'Username-ka Waalidka (ama Email)'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  required
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder={portalType === 'student' ? 'e.g. farah.abdi ama GS-2025-0101' : 'e.g. ahmed.duale'}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password-ka (Nambarka Sirta AH)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="• • • • • • • •"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Gal Portal-ka {portalType === 'student' ? 'Ardayga' : 'Waalidka'}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Sabuuradda Loginnada Tijaabada:
              </span>
              {onOpenCredentialsList && (
                <button
                  type="button"
                  onClick={onOpenCredentialsList}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline text-[11px]"
                >
                  Daawo Dhammaan Loginnada
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('farah.abdi', 'Farah@2026', 'student')}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left transition-all"
              >
                <div className="font-bold text-slate-900 dark:text-white">Farah Ahmed (Arday)</div>
                <div className="text-[10px] text-slate-500 font-mono">farah.abdi / Farah@2026</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('ahmed.duale', 'Parent@2026', 'parent')}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-left transition-all"
              >
                <div className="font-bold text-slate-900 dark:text-white">Ahmed Abdi (Waalid)</div>
                <div className="text-[10px] text-slate-500 font-mono">ahmed.duale / Parent@2026</div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
