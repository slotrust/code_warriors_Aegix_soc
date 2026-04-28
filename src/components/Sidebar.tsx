import { Shield, LayoutDashboard, BrainCircuit, ShieldCheck, Cpu, Network, Bell, FileText, Search, MessageSquare, ShieldAlert, Users, LogOut } from 'lucide-react';
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
  const { user, setMockUser } = useAuth();

  const handleSignOut = () => {
    setMockUser(null);
    auth.signOut();
  };

  return (
    <aside className="w-64 h-screen border-r border-[#00e5c0]/10 bg-[#11151e] flex flex-col justify-between shrink-0 relative z-20 font-sans">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6">
           <div className="font-display font-black text-2xl text-[#f3f4f6] tracking-tight flex items-center gap-2">
             <Shield className="text-[#00e5c0] w-6 h-6" />
             <div>Aegix<span className="text-[#00e5c0]">Chain</span></div>
           </div>
           <div className="font-mono text-[9px] tracking-[3px] text-[#2a5060] mt-1 pl-8 uppercase">
             Cybersecurity
           </div>
        </div>
        
        <nav className="px-4 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#181d28] text-white border border-[#00e5c0]/20 shadow-[0_0_15px_rgba(0,229,192,0.05)]' 
                    : 'text-[#9ca3af] hover:text-white hover:bg-[#181d28] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-[#00e5c0]' : 'text-[#9ca3af]'} />
                  <span className="font-medium text-[0.85rem]">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-[#ff4757]/10 text-[#ff4757] text-[10px] font-bold px-2 py-0.5 rounded border border-[#ff4757]/20 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 bg-[#080b10]">
         <div className="flex items-center justify-between px-3 py-3 rounded bg-[#181d28] border border-white/10 mb-3">
           <div className="flex flex-col">
             <div className="text-[0.75rem] text-[#00e5c0] font-mono tracking-wider uppercase font-bold text-left">Admin</div>
             <div className="text-[0.65rem] text-[#9ca3af] font-mono mt-0.5 truncate max-w-[120px]">
               {user?.email || 'admin@aegixchain.io'}
             </div>
           </div>
         </div>

         <button 
           onClick={handleSignOut}
           className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-[#9ca3af] hover:text-white hover:bg-white/5 rounded transition-colors font-mono"
         >
           <LogOut size={16} /> SIGN OUT
         </button>
      </div>
    </aside>
  );
}
