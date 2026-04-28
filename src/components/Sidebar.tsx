import { Shield, LayoutDashboard, Activity, BrainCircuit, History, ServerCrash } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'edr', label: 'Endpoint EDR', icon: ServerCrash },
  { id: 'behavioral', label: 'Behavioral AI', icon: Activity },
  { id: 'threat_memory', label: 'Threat Memory', icon: History },
  { id: 'mitre', label: 'MITRE ATT&CK', icon: BrainCircuit },
];

export function Sidebar({ currentView, setView }: { currentView: string; setView: (id: string) => void }) {
  return (
    <aside className="w-64 h-screen border-r border-white/10 glass-panel !rounded-none flex flex-col justify-between shrink-0 relative z-20">
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <Shield className="text-[#06B6D4] w-8 h-8" />
          <h1 className="text-xl font-bold tracking-wider text-white neon-text-cyan uppercase">Aegix <span className="text-[#A855F7] neon-text-purple">AI</span></h1>
        </div>
        
        <nav className="p-4 space-y-2 mt-2">
          <div className="text-xs uppercase tracking-widest text-slate-500 mb-4 px-2">SOC Modules</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#A855F7]/10 text-[#A855F7] neon-border-purple border border-[#A855F7]/50 shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#A855F7]' : 'text-slate-500'} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#00FF00] shadow-[0_0_8px_#00FF00] animate-pulse"></div>
          <div className="text-xs">
            <div className="text-slate-300 font-semibold">System Online</div>
            <div className="text-slate-500 font-mono mt-0.5">Latency: 14ms</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
