import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, RefreshCw, Copy, Check, MessageSquare, 
  User, HelpCircle, ShieldCheck, BookOpen, DollarSign, Calendar, Award, Volume2, Mic
} from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAgentModule: React.FC = () => {
  const { students, activeRole, activeChildId, currentCampusId, campuses, announcements, exams, t } = useSchool();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Asc! Anigu waxaan ahay **AI ASSISTANT** ee Dugsiga Global Management School. Waxaan kugu caawin karaa su\'aal kasta oo ku saabsan imtixaannada, buundooyinka, fiada dugsiga (fees), jadwalka xiisadaha, anshaxa, iyo isticmaalka portal-ka ardayda iyo waalidiinta. Maxaan kugu caawiyaa maanta?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'so' | 'en'>('so');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeStudent = students.find(s => s.id === activeChildId) || students[0];
  const activeCampus = campuses.find(c => c.id === currentCampusId) || campuses[0];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (promptToSend?: string) => {
    const text = (promptToSend || inputPrompt).trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!promptToSend) setInputPrompt('');
    setLoading(true);

    try {
      // Send context to backend Gemini endpoint
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          language,
          userRole: activeRole,
          context: {
            activeStudentName: activeStudent?.fullName,
            admissionNo: activeStudent?.admissionNo,
            studentUsername: activeStudent?.studentUsername,
            parentUsername: activeStudent?.parentUsername,
            feeBalance: activeStudent?.feeBalance,
            campusName: activeCampus?.name,
            announcementsCount: announcements.length,
            examsCount: exams.length
          }
        })
      });

      const data = await res.json();
      const aiMessageText = data.answer || "Waxaan ka cudur daaranaynaa, ma awoodin inaan jawaab sato Hadda. Fadlan mar kale isku day.";

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiMessageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('AI Chat request error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: "Waxaa ka dhacay v-error xagga internet-ka ama server-ka. Fadlan hubi xidhiidhkaaga internet-ka.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Sida loo bixiyo fiada dugsiga (Fee Invoices)?",
    "Imtixaannada Term 2 intee ayay bilaabanayaan?",
    "Si intee ah ayaan ku heli karaa Username & Password-kayga?",
    "Maxaa ku cusub jadwalka basaska iyo gaadiidka?",
    "Sida loo eego buundooyinka iyo report card-ka ardayga?"
  ];

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: 'Wadahadalkii wuu cusboonaaday. Maxaan kugu caawiyaa maanta?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Powered by Gemini 3.6 Flash AI Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            AI Assistant (GMS AI Assistant)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Waxaa loogu talagalay ardayda, waalidiinta, macallimiinta, iyo maamulka si ay su'aal kasta oo dugsiga ku saabsan uga helaan jawaabo degdeg ah oo sax ah.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <div className="flex items-center p-1 bg-slate-800 rounded-2xl border border-slate-700 text-xs font-bold">
            <button
              onClick={() => setLanguage('so')}
              className={`px-3 py-1.5 rounded-xl transition-all ${language === 'so' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Af-Soomaali
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xl transition-all ${language === 'en' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              English
            </button>
          </div>

          <button
            onClick={clearChat}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Cusboonaysii Wadahadalka"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Context Card & Quick Prompts */}
        <div className="space-y-4">
          
          {/* Active Context Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-xs uppercase text-slate-900 dark:text-white tracking-wider">
                Xaaladda Isticmaalka (Context)
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Kaalinta Active:</span>
                <span className="font-bold text-indigo-600 uppercase text-[11px] bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                  {activeRole}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Ardayga:</span>
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[140px]">
                  {activeStudent?.fullName}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Admission No:</span>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {activeStudent?.admissionNo}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Xarunta (Campus):</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activeCampus?.city}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Prompts Box */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase text-slate-900 dark:text-white tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" /> Su'aalaha Badanaa La Weydiiyo
            </h3>

            <div className="space-y-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-left text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium transition-all flex items-start gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Chat Conversation Stream */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm flex flex-col h-[650px] overflow-hidden">
          
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-white font-bold shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600'
                      : 'bg-slate-900 border border-slate-700 text-indigo-400'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Bubble */}
                <div className={`space-y-1.5 ${msg.sender === 'user' ? 'items-end text-right' : ''}`}>
                  <div
                    className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Metadata & Actions */}
                  <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => copyText(msg.text, msg.id)}
                        className="p-1 hover:text-slate-600 dark:hover:text-slate-200 transition-all flex items-center gap-1"
                        title="Nuulso jawaabta"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Nuulsan' : 'Nuulso'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <div className="w-9 h-9 rounded-2xl bg-slate-900 flex items-center justify-center text-indigo-400">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                  <span className="font-bold">AI Assistant wuxuu samaynayaa jawaabta...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-700">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                placeholder="Weydii AI Assistant su'aal kasta oo ku saabsan dugsiga..."
                className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />

              <button
                type="submit"
                disabled={loading || !inputPrompt.trim()}
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 shrink-0"
              >
                <span>Dir</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
