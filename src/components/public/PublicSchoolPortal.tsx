import React, { useState } from 'react';
import { GraduationCap, MapPin, Phone, Mail, CheckCircle2, UserPlus, Globe, Sparkles } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const PublicSchoolPortal: React.FC = () => {
  const { campuses, gradeLevels, updateApplicationStatus, addAuditLog, t } = useSchool();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    studentName: '',
    gender: 'Male' as 'Male' | 'Female',
    dob: '2011-05-10',
    campusId: 'camp-1',
    gradeLevelId: 'g-sec-9',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.parentName) return;

    addAuditLog('ONLINE_APPLICATION_SUBMITTED', `Prospective student ${form.studentName} applied via public portal.`);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Public Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" /> Public Admissions Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Global Management School - Shaping Tomorrow's Leaders
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the online admissions portal for modern, multi-campus academies. Apply online for Kindergarten, Primary, Middle, and Secondary programs.
          </p>
        </div>
      </div>

      {/* Application Form & Campuses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-blue-600" /> Online Student Application Form
            </h2>
            <p className="text-xs text-slate-500 mt-1">Submit your candidate details for the upcoming 2025-2026 Academic Year.</p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100">Application Submitted Successfully!</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-md mx-auto">
                Thank you for applying to GlobalSchool OS. Our Admissions Office will review your application and contact you via phone or email regarding assessment dates.
              </p>
              <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Applicant Full Name *</label>
                  <input
                    required
                    type="text"
                    value={form.studentName}
                    onChange={e => setForm({ ...form, studentName: e.target.value })}
                    placeholder="e.g. Yasin Osman Warsame"
                    className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Preferred Campus *</label>
                  <select
                    value={form.campusId}
                    onChange={e => setForm({ ...form, campusId: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold"
                  >
                    {campuses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Grade Level Applying For *</label>
                  <select
                    value={form.gradeLevelId}
                    onChange={e => setForm({ ...form, gradeLevelId: e.target.value })}
                    className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold"
                  >
                    {gradeLevels.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Parent / Guardian Name *</label>
                  <input
                    required
                    type="text"
                    value={form.parentName}
                    onChange={e => setForm({ ...form, parentName: e.target.value })}
                    placeholder="Parent Full Name"
                    className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Parent Contact Phone *</label>
                  <input
                    required
                    type="text"
                    value={form.parentPhone}
                    onChange={e => setForm({ ...form, parentPhone: e.target.value })}
                    placeholder="+252 61 ..."
                    className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Parent Email Address</label>
                  <input
                    type="email"
                    value={form.parentEmail}
                    onChange={e => setForm({ ...form, parentEmail: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Previous Academic Background & Notes</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="Mention previous school attended, hobbies, or special interests..."
                  className="w-full mt-1 p-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                />
              </div>

              <div className="pt-3">
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all">
                  Submit Online Application
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Campuses & Contact */}
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600" /> Our Campuses
          </h3>

          {campuses.map(c => (
            <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</h4>
              <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {c.address}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" /> {c.phone}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-indigo-600" /> {c.email}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
