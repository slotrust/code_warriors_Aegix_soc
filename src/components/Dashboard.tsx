import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Cpu, Network, BrainCircuit, RefreshCw, Filter, Settings, Bell, Search } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const [sysinfo, setSysinfo] = useState<any>(null);
  const [processes, setProcesses] = useState<any[]>([]);
  const [timeStr, setTimeStr] = useState('');

  // Fetch real system info
  const fetchSysInfo = async () => {
    try {
      const res = await fetch('/api/sysinfo');
      const data = await res.json();
      setSysinfo(data);
    } catch (e) {}
  };

  const fetchProcesses = async () => {
    try {
      const res = await fetch('/api/processes');
      const data = await res.json();
      setProcesses(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchSysInfo();
    fetchProcesses();
    const int1 = setInterval(fetchSysInfo, 3000);
    const int2 = setInterval(fetchProcesses, 10000);
    
    const timeInt = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toUTCString().replace('GMT', 'UTC'));
    }, 1000);

    return () => {
      clearInterval(int1);
      clearInterval(int2);
      clearInterval(timeInt);
    };
  }, []);

  // Event Distribution mock data for Pie chart since we don't have real "login" events in a hackathon demo easily
  const eventData = [
    { name: 'API REQUEST', value: 400, color: '#00e5c0' },
    { name: 'FILE CREATE', value: 300, color: '#8B5CF6' },
    { name: 'FILE MODIFY', value: 300, color: '#10B981' },
    { name: 'LOGIN SUCCESS', value: 200, color: '#EF4444' },
    { name: 'PROCESS START', value: 100, color: '#F59E0B' },
  ];

  // Bar chart data
  const loginData = [
    { time: '00:00', total: 10, anomaly: 0 },
    { time: '04:00', total: 20, anomaly: 2 },
    { time: '05:00', total: 1500, anomaly: 50 },  // Spikey
    { time: '06:00', total: 300, anomaly: 10 },
    { time: '08:00', total: 40, anomaly: 0 },
    { time: '12:00', total: 30, anomaly: 0 },
    { time: '16:00', total: 50, anomaly: 0 },
    { time: '20:00', total: 20, anomaly: 0 },
  ];

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto text-slate-300 font-sans">
      <header className="flex justify-between items-center bg-[#080b10] sticky top-0 z-10 py-4 border-b border-white/5">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-white tracking-wide">Dashboard</h2>
          <div className="flex items-center gap-2 text-[#00e5c0] text-sm font-mono tracking-wider">
            <div className="w-2 h-2 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0] animate-pulse"></div>
            {timeStr}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <RefreshCw size={18} className="text-[#9ca3af] cursor-pointer hover:text-white transition-colors" onClick={fetchSysInfo} />
           <div className="flex items-center gap-3">
             <div className="text-right">
               <div className="text-white font-bold text-sm tracking-wide">admin</div>
               <div className="text-[#9ca3af] text-[9px] uppercase tracking-widest font-mono">Role: Admin</div>
             </div>
             <div className="w-9 h-9 rounded-full border border-[#00e5c0] bg-[#00e5c0]/10 flex items-center justify-center text-[#00e5c0] font-bold text-sm font-mono shadow-[inset_0_0_10px_rgba(0,229,192,0.2)]">
               AD
             </div>
           </div>
        </div>
      </header>

      {/* Quick Stats */}
      {sysinfo && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0b0c10] border border-white/5 rounded-lg p-5 flex flex-col justify-between h-36 relative overflow-hidden group">
             <div className="flex justify-between items-start">
               <Activity className="text-[#00e5c0] opacity-80" size={18} />
               <span className="text-[9px] font-bold text-[#00e5c0] border border-[#00e5c0]/30 px-2 py-0.5 rounded tracking-widest uppercase">
                 +12%
               </span>
             </div>
             <div className="mt-auto">
               <div className="text-4xl font-display font-black text-white tracking-tight flex items-baseline gap-1">
                 14098<span className="text-[10px] text-white/50 tracking-widest font-mono">UNITS</span>
               </div>
               <div className="text-[10px] text-white/50 font-bold tracking-[2px] uppercase mt-2 mb-1">
                 Total Logs Today
               </div>
               <div className="h-1 w-2/3 bg-[#00e5c0] rounded-full mt-2"></div>
             </div>
          </div>

          <div className="bg-[#0b0c10] border border-white/5 rounded-lg p-5 flex flex-col justify-between h-36 relative overflow-hidden group">
             <div className="flex justify-between items-start">
               <BrainCircuit className="text-[#7f77dd] opacity-80" size={18} />
               <span className="text-[9px] font-bold text-[#7f77dd] border border-[#7f77dd]/30 px-2 py-0.5 rounded tracking-widest uppercase bg-[#7f77dd]/10">
                 GROWING
               </span>
             </div>
             <div className="mt-auto">
               <div className="text-4xl font-display font-black text-white tracking-tight flex items-baseline gap-1">
                 20<span className="text-[10px] text-white/50 tracking-widest font-mono">UNITS</span>
               </div>
               <div className="text-[10px] text-white/50 font-bold tracking-[2px] uppercase mt-2 mb-1">
                 Intelligence Nodes
               </div>
               <div className="h-1 w-2/3 bg-[#7f77dd] rounded-full mt-2"></div>
             </div>
          </div>

          <div className="bg-[#0b0c10] border border-white/5 rounded-lg p-5 flex flex-col justify-between h-36 relative overflow-hidden group">
             <div className="flex justify-between items-start">
               <Network className="text-[#00e5c0] opacity-80" size={18} />
               <span className="text-[9px] font-bold text-[#00e5c0] border border-[#00e5c0]/30 px-2 py-0.5 rounded tracking-widest uppercase">
                 ACTIVE
               </span>
             </div>
             <div className="mt-auto">
               <div className="text-4xl font-display font-black text-white tracking-tight flex items-baseline gap-1">
                 24<span className="text-[10px] text-white/50 tracking-widest font-mono">UNITS</span>
               </div>
               <div className="text-[10px] text-white/50 font-bold tracking-[2px] uppercase mt-2 mb-1">
                 Network Conns
               </div>
               <div className="h-1 w-2/3 bg-[#00e5c0] rounded-full mt-2"></div>
             </div>
          </div>

          <div className="bg-[#0b0c10] border border-white/5 rounded-lg p-5 flex flex-col justify-between h-36 relative overflow-hidden group">
             <div className="flex justify-between items-start">
               <ShieldAlert className="text-[#ff4757] opacity-80" size={18} />
               <span className="text-[9px] font-bold text-[#ff4757] border border-[#ff4757]/30 px-2 py-0.5 rounded tracking-widest uppercase bg-[#ff4757]/10">
                 URGENT
               </span>
             </div>
             <div className="mt-auto">
               <div className="text-4xl font-display font-black text-white tracking-tight flex items-baseline gap-1">
                 0<span className="text-[10px] text-white/50 tracking-widest font-mono">UNITS</span>
               </div>
               <div className="text-[10px] text-white/50 font-bold tracking-[2px] uppercase mt-2 mb-1">
                 Critical Alerts
               </div>
               <div className="h-1 w-3/4 bg-[#ff4757] rounded-full mt-2"></div>
             </div>
          </div>
        </div>
      )}

      {/* Middle Widget Row */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* System Intelligence */}
        <div className="col-span-2 bg-[#0b0c10] border border-white/5 rounded-lg p-6 relative overflow-hidden flex flex-col justify-center min-h-[250px]">
          <BrainCircuit className="absolute top-1/2 -translate-y-1/2 right-10 w-48 h-48 text-[#7f77dd] opacity-[0.03]" />
          
          <h3 className="text-3xl font-display font-black text-[#7f77dd] tracking-tight mb-4">
            System Intelligence
          </h3>
          
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl font-medium mb-6">
            AegixChain utilizes <span className="text-[#7f77dd]">Episodic Threat Memory</span> and an <span className="text-[#00e5c0]">Online Deep Learning Network</span> to embed attack fingerprints and predict future threats. Powered by a local <span className="text-[#7f77dd]">SmolLM-135M</span> model for autonomous reasoning.
          </p>
          
          <p className="text-sm text-white/50 italic mb-6">
            "The system gets smarter every time it's attacked."
          </p>
          
          <div className="flex items-center gap-3">
             <div className="flex space-x-1">
               <div className="w-4 h-4 rounded-full bg-[#7f77dd]/20 border border-[#7f77dd]/50 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#7f77dd]"></div>
               </div>
               <div className="w-4 h-4 rounded-full bg-[#7f77dd]/20 border border-[#7f77dd]/50 flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-[#7f77dd]"></div>
               </div>
               <div className="w-4 h-4 rounded-full bg-[#7f77dd]/20 border border-[#7f77dd]/50 flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#7f77dd]"></div>
               </div>
             </div>
             <span className="text-[10px] font-mono tracking-widest text-[#9ca3af] uppercase">
               Learning Loops Active
             </span>
          </div>
        </div>

        {/* Live System Health */}
        <div className="col-span-1 bg-[#0b0c10] border border-white/5 rounded-lg flex flex-col h-[250px]">
          <div className="p-5 border-b border-white/5 shrink-0">
             <h3 className="text-lg font-display font-black text-white tracking-wide flex items-center gap-2">
               <Activity size={18} className="text-[#00e5c0]" /> Live System Health
             </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-3">
             <div className="bg-[#131722] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <Network size={14} className="text-white/70" /> L0 — Sensor Grid
                  </div>
                  <div className="text-[10px] font-mono text-[#9ca3af]">Receiving telemetry (24 events)</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0]"></div>
             </div>

             <div className="bg-[#131722] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <ShieldAlert size={14} className="text-white/70" /> L1 — Detection Engine
                  </div>
                  <div className="text-[10px] font-mono text-[#9ca3af]">Sigma rules loaded</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0]"></div>
             </div>

             <div className="bg-[#131722] border border-white/5 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 mb-1">
                    <BrainCircuit size={14} className="text-white/70" /> L2 — AI Brain
                  </div>
                  <div className="text-[10px] font-mono text-[#9ca3af]">LLM ready</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0]"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0b0c10] border border-white/5 rounded-lg p-5">
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-display font-black text-white tracking-wide flex items-center gap-3">
               <BrainCircuit className="text-[#7f77dd]" size={20} /> Episodic Threat Memory
             </h3>
             <span className="px-3 py-1 bg-[#7f77dd]/10 border border-[#7f77dd]/30 text-[#7f77dd] text-[9px] font-bold uppercase tracking-widest rounded">
               System Learning Active
             </span>
           </div>
        </div>

        <div className="bg-[#0b0c10] border border-white/5 rounded-lg p-5">
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-display font-black text-white tracking-wide flex items-center gap-3">
               <Cpu className="text-[#00e5c0]" size={20} /> Real-Time Scanning
             </h3>
           </div>
        </div>
      </div>
    </div>
  );
}
