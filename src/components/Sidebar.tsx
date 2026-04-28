import { Shield, LayoutDashboard, BrainCircuit, ShieldCheck, Cpu, Network, Bell, FileText, Search, MessageSquare, ShieldAlert, Users } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'brain', label: 'Aegix Brain', icon: BrainCircuit },
  { id: 'edr', label: 'Endpoint EDR', icon: ShieldCheck },
  { id: 'processes', label: 'Processes', icon: Cpu },
  { id: 'network', label: 'Network', icon: Network },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: 1 },
  { id: 'logs', label: 'Logs', icon: FileText },
  { id: 'forensics', label: 'Forensics', icon: Search },
  { id: 'chatbot', label: 'Chatbot', icon: MessageSquare },
  { id: 'ips', label: 'IPS', icon: ShieldAlert },
  { id: 'users', label: 'Users', icon: Users },
];

export function Sidebar({ currentView, setView }: { currentView: string; setView: (id: string) => void }) {
  const { user } = useAuth();
  return (
    <aside className="w-64 h-screen border-r border-[#06B6D4]/10 bg-[#06080D] flex flex-col justify-between shrink-0 relative z-20">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 flex items-center gap-3">
          <Shield className="text-[#06B6D4] w-8 h-8" />
          <h1 className="text-xl font-bold tracking-wider text-white">
            <span className="text-[#06B6D4]">Aegix</span><span className="text-[#A855F7]">Chain</span>
          </h1>
        </div>
        
        <nav className="px-4 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#06B6D4]/20 to-transparent text-white border-l-2 border-[#06B6D4]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-[#06B6D4]' : 'text-slate-500'} />
                  <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
         <button 
           onClick={() => auth.signOut()}
           className="w-full text-left px-3 py-2 text-sm text-slate-500 hover:text-white transition-colors"
         >
           Sign Out
         </button>
      </div>
    </aside>
  );
}
