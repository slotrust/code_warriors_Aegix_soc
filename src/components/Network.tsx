import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { RefreshCw, Globe, Search, CheckCircle2 } from 'lucide-react';

export function Network() {
  const { user } = useAuth();
  const [timeStr, setTimeStr] = useState('');
  const [connections, setConnections] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  const fetchConnections = async () => {
    try {
      const res = await fetch('/api/networkConnections');
      const data = await res.json();
      setConnections(data);
    } catch(e) {}
  };

  useEffect(() => {
    fetchConnections();
    const int2 = setInterval(fetchConnections, 10000);
    const timeInt = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toUTCString().replace('GMT', 'UTC'));
    }, 1000);

    return () => {
      clearInterval(int2);
      clearInterval(timeInt);
    };
  }, []);

  const filtered = connections.filter(c => {
    if (!search) return true;
    const local = `${c.localAddress}:${c.localPort}`;
    const remote = `${c.peerAddress}:${c.peerPort}`;
    const s = search.toLowerCase();
    return local.includes(s) || remote.includes(s) || String(c.pid).includes(s) || (c.state && c.state.toLowerCase().includes(s));
  });

  return (
    <div className="flex flex-col h-full bg-[#080b10] text-[#f3f4f6] font-sans">
      <header className="flex justify-between items-center bg-[#080b10] sticky top-0 z-10 py-5 px-8 border-b border-white/5">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-white tracking-wide">Network</h2>
          <div className="flex items-center gap-2 text-[#00e5c0] text-xs font-mono tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0] animate-pulse"></div>
            {timeStr}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <RefreshCw size={18} className="text-[#9ca3af] cursor-pointer hover:text-white transition-colors" onClick={fetchConnections} />
           <div className="flex items-center gap-3">
             <div className="text-right">
               <div className="text-white font-bold text-sm tracking-wide">{user?.email?.split('@')[0] || 'admin'}</div>
               <div className="text-[#9ca3af] text-[9px] uppercase tracking-widest font-mono">Role: Admin</div>
             </div>
             <div className="w-9 h-9 rounded-full border border-[#00e5c0] bg-[#00e5c0]/10 flex items-center justify-center text-[#00e5c0] font-bold text-sm font-mono shadow-[inset_0_0_10px_rgba(0,229,192,0.2)]">
               AD
             </div>
           </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8 max-w-[1200px] mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-white tracking-wide mb-2">Network Activity</h1>

        <div className="bg-[#181d28] border border-[#00e5c0]/20 rounded-lg flex flex-col h-full border-t-2 border-t-[#00e5c0]">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="text-[#00e5c0] w-6 h-6" />
              <h2 className="text-xl font-display font-black text-white tracking-wide">Network Connections</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                <input 
                  type="text" 
                  placeholder="Search IP, PID, or status.." 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-black/50 border border-white/10 rounded px-9 py-2 text-sm text-white font-mono placeholder-[#9ca3af] focus:outline-none focus:border-[#00e5c0] w-64 transition-all" 
                />
              </div>
              <div className="text-right">
                <div className="text-[9px] text-[#9ca3af] font-black uppercase tracking-widest font-mono text-right">STATUS</div>
                <div className="text-[#00e5c0] text-xs font-mono tracking-widest uppercase">LIVE MONITORING</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
              <thead className="bg-black/40 text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest">
                <tr>
                  <th className="py-4 px-6 font-mono cursor-pointer hover:text-white">LOCAL ADDRESS ↑↓</th>
                  <th className="py-4 px-6 font-mono cursor-pointer hover:text-white mt-1">REMOTE ADDRESS ↑↓</th>
                  <th className="py-4 px-6 font-mono cursor-pointer hover:text-white text-center">STATUS ↑↓</th>
                  <th className="py-4 px-6 font-mono cursor-pointer hover:text-white text-center">PID ↑↓</th>
                  <th className="py-4 px-6 font-mono cursor-pointer hover:text-white text-right">RISK ↑↓</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[#f3f4f6]">
                {filtered.map((c, i) => {
                  const local = `${c.localAddress}:${c.localPort}`;
                  const remote = `${c.peerAddress}:${c.peerPort}`;
                  return (
                    <tr key={`${i}-${c.pid}`} className="hover:bg-white/5 transition-colors cursor-default">
                      <td className="py-3 px-6 text-[#9ca3af]">{local}</td>
                      <td className="py-3 px-6 text-[#00e5c0] font-bold">{remote}</td>
                      <td className="py-3 px-6 text-center">
                         <span className="inline-block px-2 py-0.5 rounded border border-[#00e5c0]/30 text-[#00e5c0] text-[9.5px] font-bold uppercase tracking-wider">
                           {c.state || 'UNKNOWN'}
                         </span>
                      </td>
                      <td className="py-3 px-6 text-[#9ca3af] text-center">{c.pid || '-'}</td>
                      <td className="py-3 px-6 text-right">
                         <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-[#00e5c0]/30 text-[#00e5c0] text-[10px] font-bold uppercase tracking-wider">
                           <CheckCircle2 size={12} /> SAFE
                         </span>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                   <tr><td colSpan={5} className="text-center py-8 text-[#9ca3af] font-mono text-sm">No connections found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
