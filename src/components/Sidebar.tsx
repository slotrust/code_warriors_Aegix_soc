import { Shield, LayoutDashboard, BrainCircuit, ShieldCheck, Cpu, Network, Bell, FileText, Search, MessageSquare, ShieldAlert, Users, LogOut } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'brain', label: 'Aegix Brain', icon: BrainCircuit },
  { id: 'edr', label: 'Endpoint EDR', icon: ShieldCheck },
  { id: 'processes', label: 'Processes', icon: Cpu },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: 2 },
  { id: 'logs', label: 'Logs', icon: FileText },
  { id: 'forensics', label: 'Forensics', icon: Search },
  { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
  { id: 'ips', label: 'IPS', icon: ShieldAlert },
];

export function Sidebar({ currentView, setView }: { currentView: string; setView: (id: string) => void }) {
  const { user, setMockUser } = useAuth();

  const handleSignOut = () => {
    setMockUser(null);
    auth.signOut();
  };

  return (
    <aside className="w-64 h-screen border-r border-[#00e5c0]/10 bg-[#0c1017] flex flex-col justify-between shrink-0 relative z-20 font-sans">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
           <div className="font-display font-black text-2xl tracking-tight flex items-center gap-3">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 drop-shadow-[0_0_8px_rgba(0,229,192,0.8)]">
                <path d="M12 2L2 7.77778L2 19.3333L12 25.1111L22 19.3333L22 7.77778L12 2Z" stroke="#00e5c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="13.5" r="3" fill="#00e5c0"/>
                <path d="M12 5L12 10.5M4.5 9L9.5 12M19.5 9L14.5 12M4.5 18L9.5 15M19.5 18L14.5 15M12 22L12 16.5" stroke="#00e5c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             <div className="flex items-center">
               <span className="text-[#00e5c0]">Aegix</span>
               <span className="text-[#7f77dd]">Chain</span>
             </div>
           </div>
        </div>
        
        <nav className="px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 font-mono ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#00e5c0]/20 to-transparent border-l-4 border-[#00e5c0] text-white shadow-[0_0_15px_rgba(0,229,192,0.05)]' 
                    : 'text-[#9ca3af] hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-[#00e5c0]' : 'text-[#9ca3af]'} />
                  <span className={`font-semibold tracking-wide text-sm ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#ff4757]/10 text-[#ff4757] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#ff4757]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-6 shrink-0 flex items-center gap-2">
         <div className="w-2 h-2 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0] animate-pulse"></div>
         <span className="text-[#00e5c0] text-[10px] font-mono font-bold tracking-[2px] uppercase">System Protected</span>
      </div>
    </aside>
  );
}
