import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, ChevronDown, ChevronUp } from 'lucide-react';
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

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-[#181d28] border border-white/5 rounded-lg flex flex-col transition-all duration-300 z-50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ${isOpen ? 'h-[500px] border-[#7f77dd]/30' : 'h-14 border-[#7f77dd]/50 cursor-pointer overflow-hidden'}`}>
      <div 
        className="h-14 px-4 bg-gradient-to-r from-[#7f77dd]/20 to-transparent flex items-center justify-between shrink-0 border-b border-[#7f77dd]/10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot size={20} className="text-[#7f77dd]" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#00FF00] rounded-full border border-black animate-pulse"></div>
          </div>
          <span className="font-semibold text-slate-200 text-sm tracking-wide">Aegix Assistant</span>
        </div>
        {isOpen ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronUp size={18} className="text-slate-400" />}
      </div>

      {isOpen && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#00e5c0]/20 text-[#00e5c0]' : 'bg-[#7f77dd]/20 text-[#7f77dd]'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-[#00e5c0]/10 border border-[#00e5c0]/20 text-slate-200 rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none pr-6 max-w-[90%]'}`}>
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
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#7f77dd]/50 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#7f77dd]/50 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#7f77dd]/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-black/40 border-t border-white/5 shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Aegix AI..." 
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-200 outline-none focus:border-[#7f77dd]/50 transition-colors placeholder:text-slate-500"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-1.5 text-[#7f77dd] hover:bg-[#7f77dd]/10 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
