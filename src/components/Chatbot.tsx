import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, ChevronDown, ChevronUp, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Aegix Assistant online. How can I assist your SOC operations today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, data]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Connection to AI core lost.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
         className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#0c1017] to-[#181d28] border border-white/10 shadow-[0_0_30px_rgba(0,229,192,0.15)] flex items-center justify-center z-50 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,229,192,0.25)] transition-all group"
      >
        <div className="absolute inset-0 rounded-full border-[1.5px] border-[#00e5c0]/30 scale-110 group-hover:border-[#00e5c0]/60 transition-all opacity-50 font-mono"></div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-[0_0_8px_rgba(0,229,192,0.8)] text-[#00e5c0]">
           <path d="M12 2L2 7.77778L2 19.3333L12 25.1111L22 19.3333L22 7.77778L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
           <circle cx="12" cy="13.5" r="3" fill="currentColor"/>
           <path d="M12 5L12 10.5M4.5 9L9.5 12M19.5 9L14.5 12M4.5 18L9.5 15M19.5 18L14.5 15M12 22L12 16.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-[#181d28] border border-white/5 rounded-lg flex flex-col transition-all duration-300 z-50 shadow-[0_20px_60px_rgba(0,0,0,0.8)] h-[600px] border-[#00e5c0]/30">
      <div className="h-14 px-4 bg-gradient-to-r from-[#00e5c0]/20 to-transparent flex items-center justify-between shrink-0 border-b border-[#00e5c0]/10 cursor-default">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot size={20} className="text-[#00e5c0]" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#00FF00] rounded-full border border-black animate-pulse"></div>
          </div>
          <span className="font-bold text-white text-sm tracking-wide">Aegix Brain Assistant</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors h-8 w-8 flex justify-center items-center rounded-full hover:bg-white/10">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/40">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#00e5c0]/20 text-[#00e5c0]' : 'bg-[#7f77dd]/20 text-[#7f77dd]'}`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-[#00e5c0]/10 border border-[#00e5c0]/20 text-slate-200 rounded-tr-none' : 'bg-[#131722] border border-white/10 text-slate-300 rounded-tl-none pr-6 max-w-[90%]'}`}>
              {msg.role === 'assistant' ? (
                 <div className="prose prose-invert prose-p:leading-relaxed prose-sm max-w-none">
                   <ReactMarkdown>{msg.content}</ReactMarkdown>
                 </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7f77dd]/20 text-[#7f77dd] flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="px-4 py-3 bg-[#131722] border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#7f77dd]/50 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#7f77dd]/50 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-1.5 h-1.5 bg-[#7f77dd]/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-[#0a0f16] border-t border-white/5 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aegix AI..." 
            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-200 outline-none focus:border-[#00e5c0]/50 transition-colors placeholder:text-slate-500 shadow-inner"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-2 text-[#00e5c0] hover:bg-[#00e5c0]/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
