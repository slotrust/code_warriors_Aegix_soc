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
    <div className="p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto text-slate-300">
      <header className="flex justify-between items-center bg-[#080b10] sticky top-0 z-10 py-4 border-b border-white/5">
        <div className="flex items-center gap-6">
          <h2 className="text-2xl font-bold text-white tracking-wide">Dashboard</h2>
          <div className="flex items-center gap-2 text-[#00e5c0] text-sm font-mono tracking-wider">
            <div className="w-2 h-2 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0] animate-pulse"></div>
            {timeStr}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <RefreshCw size={18} className="text-slate-400 cursor-pointer hover:text-white" />
           <div className="flex items-center gap-3">
             <div className="text-right">
               <div className="text-white font-bold text-sm">admin</div>
               <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Role: Admin</div>
             </div>
             <div className="w-10 h-10 rounded-full border border-[#00e5c0] bg-[#00e5c0]/10 flex items-center justify-center text-[#00e5c0] font-bold shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]">
               AD
             </div>
           </div>
        </div>
      </header>

      {/* Quick Stats */}
      {sysinfo && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#181d28] border border-white/5 rounded-lg p-5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5c0] to-transparent opacity-50"></div>
             <div className="flex justify-between items-start mb-2">
               <Activity className="text-[#00e5c0]" size={20} />
               <span className="text-[10px] font-bold text-[#00e5c0] bg-[#00e5c0]/10 px-2 py-1 rounded border border-[#00e5c0]/20">+12%</span>
             </div>
             <div className="text-3xl font-black text-white uppercase tracking-tighter mt-4 flex items-end gap-1">
               {Math.round(sysinfo.cpu || 0)}<span className="text-xs text-slate-500 mb-1"> %</span>
             </div>
             <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">CPU Load</div>
          </div>

          <div className="bg-[#181d28] border border-white/5 rounded-lg p-5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50"></div>
             <div className="flex justify-between items-start mb-2">
               <BrainCircuit className="text-[#8B5CF6]" size={20} />
               <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-1 rounded border border-[#8B5CF6]/20">GROWING</span>
             </div>
             <div className="text-3xl font-black text-white uppercase tracking-tighter mt-4 flex items-end gap-1">
               {processes.length}<span className="text-xs text-slate-500 mb-1"> UNITS</span>
             </div>
             <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Active Processes</div>
          </div>

          <div className="bg-[#181d28] border border-white/5 rounded-lg p-5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-50"></div>
             <div className="flex justify-between items-start mb-2">
               <Network className="text-[#10B981]" size={20} />
               <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded border border-[#10B981]/20">ACTIVE</span>
             </div>
             <div className="text-3xl font-black text-white uppercase tracking-tighter mt-4 flex items-end gap-1">
                {(sysinfo.rx_sec || 0).toFixed(0)}<span className="text-xs text-slate-500 mb-1"> KB/s</span>
             </div>
             <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Network Inbound</div>
          </div>

          <div className="bg-[#181d28] border border-white/5 rounded-lg p-5 relative overflow-hidden border-[#EF4444]/30 bg-[#EF4444]/5">
             <div className="absolute top-0 left-0 w-full h-1 bg-[#EF4444]"></div>
             <div className="flex justify-between items-start mb-2">
               <ShieldAlert className="text-[#EF4444]" size={20} />
               <span className="text-[10px] font-bold text-[#EF4444] bg-[#EF4444]/20 px-2 py-1 rounded border border-[#EF4444]/30">URGENT</span>
             </div>
             <div className="text-3xl font-black text-white uppercase tracking-tighter mt-4 flex items-end gap-1">
               1<span className="text-xs text-slate-500 mb-1"> UNITS</span>
             </div>
             <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Critical Alerts</div>
          </div>
        </div>
      )}

      {/* Middle Row Charts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#181d28] border border-white/5 rounded-lg p-5 h-80 flex flex-col">
           <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Login Activity — Last 24 Hours</h3>
           <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loginData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="total" fill="#00e5c0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="anomaly" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold"><span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Anomalies</div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold"><span className="w-3 h-3 rounded-full bg-[#00e5c0]"></span> Total Logins</div>
           </div>
        </div>

        <div className="col-span-1 bg-[#181d28] border border-white/5 rounded-lg p-5 flex flex-col h-80">
          <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity size={20} className="text-[#8B5CF6]" /> Event Distribution
          </h3>
          <div className="flex-1 w-full relative -mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {eventData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: 'white' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-auto">
             {eventData.map(e => (
               <div key={e.name} className="flex items-center gap-2 text-[10px] text-slate-300 font-bold tracking-widest uppercase">
                 <span className="w-2 h-2 rounded-full" style={{backgroundColor: e.color, boxShadow: `0 0 8px ${e.color}`}}></span>
                 {e.name}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Bottom Live Log Stream */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#181d28] border border-white/5 rounded-lg border-[#00e5c0]/30 overflow-hidden flex flex-col h-96 relative">
          {/* Decorative frame */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00e5c0] to-transparent opacity-80"></div>
          
          <div className="p-5 flex justify-between items-center border-b border-white/5">
             <h3 className="text-xl font-black text-white italic tracking-tighter flex items-center gap-2">
               <Activity className="text-[#00e5c0]" /> Live Log Stream
             </h3>
             <div className="flex items-center gap-4">
               <span className="text-xs text-slate-400 font-bold tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#00e5c0] animate-pulse"></div>
                 {processes.length} EVENTS
               </span>
               <Filter size={18} className="text-slate-400 hover:text-white cursor-pointer" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
             <table className="w-full text-left border-collapse text-sm">
               <thead className="bg-black/40 text-[10px] font-bold text-slate-500 uppercase tracking-widest sticky top-0 z-10">
                 <tr>
                   <th className="py-3 px-5 font-medium">Time / PID</th>
                   <th className="py-3 px-5 font-medium">Process Name</th>
                   <th className="py-3 px-5 font-medium">User</th>
                   <th className="py-3 px-5 font-medium">Mem Usage</th>
                   <th className="py-3 px-5 font-medium text-right">Anomaly</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                 {processes.slice(0, 15).map((proc, i) => (
                   <tr key={proc.pid} className="hover:bg-white/5 transition-colors cursor-pointer group">
                     <td className="py-3 px-5">
                       <span className="text-xs text-slate-500 mr-2">{timeStr.split(' ')[4]}</span>
                       <span className="text-[#00e5c0] group-hover:text-white">{proc.pid}</span>
                     </td>
                     <td className="py-3 px-5 font-sans font-medium text-slate-200 truncate max-w-[200px]">{proc.name}</td>
                     <td className="py-3 px-5 text-xs text-slate-400">{proc.user || 'system'}</td>
                     <td className="py-3 px-5 text-[#10B981]">{(proc.memRss / 1024).toFixed(0)} MB</td>
                     <td className="py-3 px-5 text-right">
                       {i === 0 ? (
                         <span className="inline-block px-2 py-1 rounded border border-[#EF4444]/30 text-[#EF4444] bg-[#EF4444]/10 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 justify-end w-max ml-auto">
                           <ShieldAlert size={12} /> CRITICAL
                         </span>
                       ) : (
                         <span className="inline-block px-2 py-1 rounded border border-[#10B981]/30 text-[#10B981] bg-[#10B981]/10 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 justify-end w-max ml-auto">
                           NORMAL
                         </span>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Recent Alerts Column */}
        <div className="col-span-1 flex flex-col gap-4 max-h-96">
           <div className="flex items-center justify-between">
             <h3 className="text-lg font-black text-white italic tracking-tighter flex items-center gap-2">
               <Bell className="text-yellow-500" /> Recent Alerts
             </h3>
             <Settings size={18} className="text-slate-400" />
           </div>

           <div className="flex gap-2 mb-2 bg-black/40 p-1 rounded-lg">
             <button className="flex-1 py-1.5 px-3 bg-[#EF4444]/20 text-[#EF4444] rounded text-xs font-bold border border-[#EF4444]/30">Critical</button>
             <button className="flex-1 py-1.5 px-3 text-slate-400 hover:text-white rounded text-xs font-semibold">Resolved</button>
             <button className="flex-1 py-1.5 px-3 text-slate-400 hover:text-white rounded text-xs font-semibold">Suppressed</button>
           </div>
           
           <div className="overflow-y-auto custom-scrollbar flex-1 space-y-3 pr-2">
             <div className="bg-[#181d28] border border-white/5 rounded-lg p-4 border-[#EF4444]/30 bg-black/60 hover:bg-black/40 transition-colors">
               <div className="flex justify-between items-start mb-2">
                 <span className="bg-[#EF4444] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">Critical</span>
                 <span className="text-[10px] text-slate-500 font-mono">Just Now</span>
               </div>
               <p className="text-sm font-semibold text-slate-200 mt-2 leading-tight">
                 Behavioral Anomaly: Process <span className="text-[#EF4444] font-mono mx-1">dpkg-query</span> has never been seen during learning phase.
               </p>
               <div className="flex items-center gap-2 mt-4">
                 <button className="text-xs bg-white text-black px-3 py-1.5 rounded font-bold hover:bg-slate-200 flex-1">Acknowledge</button>
                 <button className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#00e5c0] hover:bg-[#00e5c0]/20"><Search size={14} /></button>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
