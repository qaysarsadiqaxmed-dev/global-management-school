import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, Minimize2, Maximize2, MessageSquare, ShieldCheck } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const FloatingAIBot: React.FC = () => {
  const { students, activeRole, activeChildId } = useSchool();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'f-1',
      sender: 'ai',
      text: 'Asc! Anigu waxaan ahay **AI Assistant** ee Dugsiga. Maxaan kugu caawiyaa maanta?'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeStudent = students.find(s => s.id === activeChildId) || students[0];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputPrompt.trim();
    if (!text || loading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          language: 'so',
          userRole: activeRole,
          context: {
            activeStudentName: activeStudent?.fullName,
            admissionNo: activeStudent?.admissionNo,
            feeBalance: activeStudent?.feeBalance
          }
        })
      });

      const data = await res.json();
      setMessages(prev => [
        ...prev,
        { id: `a-${Date.now()}`, sender: 'ai', text: data.answer || "Jawaab ma samaysmin." }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: `a-${Date.now()}`, sender: 'ai', text: "Fadlan mar kale isku day." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider hidden sm:inline">
            AI Assistant
          </span>
        </button>
      ) : (
        <div className="w-[360px] sm:w-[420px] h-[520px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                  AI Assistant <Sparkles className="w-3 h-3 text-indigo-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-medium">Online & Ready to Help</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[11px] text-slate-400 flex items-center gap-2 italic">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                AI Assistant wuxuu jawaabayaa...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="Weydii su'aal..."
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
