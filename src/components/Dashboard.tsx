import { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Cpu, Network } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Network Data
const generateTrafficData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `-${20 - i}m`,
    inbound: Math.floor(Math.random() * 500) + 200,
    outbound: Math.floor(Math.random() * 300) + 100,
  }));
};

export function Dashboard() {
  const [trafficData, setTrafficData] = useState(generateTrafficData());
  const [cpuUsage, setCpuUsage] = useState(34);
  const [memUsage, setMemUsage] = useState(62);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: 'now',
          inbound: Math.floor(Math.random() * 500) + 200,
          outbound: Math.floor(Math.random() * 300) + 100,
        });
        return newData;
      });
      setCpuUsage(Math.floor(Math.random() * 15) + 30);
      setMemUsage(Math.floor(Math.random() * 10) + 60);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Operations Control Center</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time facility telemetry and active threat vectors.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <Cpu size={16} className="text-[#06B6D4]" />
            <div className="text-sm">
              <span className="text-slate-400">CPU</span>
              <span className="ml-2 font-mono text-white">{cpuUsage}%</span>
            </div>
          </div>
          <div className="glass-panel px-4 py-2 flex items-center gap-3">
            <Network size={16} className="text-[#A855F7]" />
            <div className="text-sm">
              <span className="text-slate-400">MEM</span>
              <span className="ml-2 font-mono text-white">{memUsage}%</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Network Traffic Chart */}
        <div className="col-span-2 glass-panel p-5 h-80 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-[#06B6D4]" size={18} />
            <h3 className="font-semibold text-slate-200 uppercase tracking-wide text-sm">Network Traffic Anomalies</h3>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="inbound" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#colorInbound)" />
                <Area type="monotone" dataKey="outbound" stroke="#A855F7" strokeWidth={2} fillOpacity={1} fill="url(#colorOutbound)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="col-span-1 glass-panel p-5 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-[#EF4444]" size={18} />
              <h3 className="font-semibold text-slate-200 uppercase tracking-wide text-sm">Critical Vectors</h3>
            </div>
            <span className="bg-[#EF4444]/20 text-[#EF4444] text-xs font-bold px-2 py-0.5 rounded-full border border-[#EF4444]/30">
              3 ACTIVE
            </span>
          </div>
          
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { id: 1, type: 'Lateral Movement', target: 'SRV-092', time: '2m ago', severity: 'critical' },
              { id: 2, type: 'Ransomware Baseline', target: 'WKST-442', time: '14m ago', severity: 'high' },
              { id: 3, type: 'Excessive Login Fails', target: 'VPN-GW', time: '1h ago', severity: 'medium' },
            ].map(alert => (
              <div key={alert.id} className="p-3 bg-black/40 border border-white/5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-sm text-slate-200 group-hover:text-white">{alert.type}</div>
                  <div className="text-xs text-slate-500 font-mono">{alert.time}</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">TGT: {alert.target}</span>
                  <span className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-[#EF4444] shadow-[0_0_8px_#EF4444]' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
