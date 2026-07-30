import React, { useState } from 'react';
import { X, Camera, Upload, Check, Image, RefreshCw } from 'lucide-react';
import { Student } from '../../types';

interface ProfilePhotoModalProps {
  student: Student;
  onSave: (newPhotoUrl: string) => void;
  onClose: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80'
];

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({ student, onSave, onClose }) => {
  const [photoUrl, setPhotoUrl] = useState(student.photo);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(student.photo);

  // File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target.result as string;
          setPhotoUrl(result);
          setSelectedPreset(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrl) {
      onSave(photoUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider">
              Badal Sawirka Profile-ka (Change Photo)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current & Preview Avatar Box */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="relative">
            <img
              src={photoUrl}
              alt={student.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-600 shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-center">
            <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase">{student.fullName}</h4>
            <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase">
              {student.admissionNo} • {student.classId}
            </span>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* File Upload Button */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              1. Lasoo Gali Sawir Kumbuyuutarkaaga (Upload File)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs font-semibold p-2 border border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50/40 dark:bg-indigo-950/20 text-slate-700 dark:text-slate-300"
            />
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              2. Ama dhig Link-ga Sawirka (Image URL)
            </label>
            <input
              type="url"
              value={photoUrl.startsWith('data:') ? '' : photoUrl}
              onChange={e => {
                setPhotoUrl(e.target.value);
                setSelectedPreset(null);
              }}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>

          {/* Presets */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
              3. Ama ka dooro Avatars-ka Diyaarsan
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_AVATARS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPhotoUrl(preset);
                    setSelectedPreset(preset);
                  }}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                    selectedPreset === preset ? 'border-indigo-600 ring-2 ring-indigo-500' : 'border-transparent hover:border-indigo-300'
                  }`}
                >
                  <img src={preset} alt="" className="w-full h-full object-cover" />
                  {selectedPreset === preset && (
                    <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save New Photo
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
