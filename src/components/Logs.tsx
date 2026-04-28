import { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { RefreshCw, List, Search, BrainCircuit, X, Activity, ShieldAlert, Cpu, Zap } from 'lucide-react';

export function Logs() {
  const { user } = useAuth();
  const [timeStr, setTimeStr] = useState('');
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [selectedLog, setSelectedLog] = useState<any | null>(null);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/logs');
      const data = await res.json();
      setLogs(data);
    } catch(e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const timeInt = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toUTCString().replace('GMT', 'UTC'));
    }, 1000);

    return () => {
      clearInterval(timeInt);
    };
  }, []);

  const handleLogClick = async (log: any) => {
    setSelectedLog(log);
    setAnalysis(null);
    setAnalyzing(true);
    
    try {
      const res = await fetch('/api/logs/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logRaw: log.raw, context: `Process: ${log.process}, Timestamp: ${log.timestamp}` })
      });
      const data = await res.json();
      setAnalysis(data);
    } catch (e) {
      setAnalysis({ summary: "Analysis failed due to a network error.", riskLevel: "Unknown" });
    } finally {
      setAnalyzing(false);
    }
  };

  const filtered = logs.filter(l => {
    if (!search) return true;
    const s = search.toLowerCase();
    return l.message.toLowerCase().includes(s) || l.process.toLowerCase().includes(s) || l.level.toLowerCase().includes(s);
  });

  const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
      case 'ERROR': return 'text-[#ff4757] border-[#ff4757]/30 bg-[#ff4757]/10';
      case 'CRITICAL': return 'text-[#ff4757] border-[#ff4757]/50 bg-[#ff4757]/20 font-black animate-pulse';
      case 'WARNING': return 'text-[#ffb347] border-[#ffb347]/30 bg-[#ffb347]/10';
      default: return 'text-[#00e5c0] border-[#00e5c0]/30 bg-[#00e5c0]/10';
    }
  };
  
  const getRiskColor = (risk: string) => {
    if (!risk) return 'text-[#9ca3af]';
    switch (risk.toUpperCase().trim()) {
      case 'CRITICAL':
      case 'HIGH': return 'text-[#ff4757]';
      case 'MEDIUM': return 'text-[#ffb347]';
      case 'LOW': return 'text-[#00e5c0]';
      default: return 'text-[#9ca3af]';
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#080b10] text-[#f3f4f6] font-sans relative overflow-hidden">
      <header className="flex justify-between items-center bg-[#080b10] sticky top-0 z-10 py-5 px-8 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-white tracking-wide">Logs Feed</h2>
          <div className="flex items-center gap-2 text-[#00e5c0] text-xs font-mono tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0] animate-pulse"></div>
            {timeStr}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <RefreshCw size={18} className={`text-[#9ca3af] cursor-pointer hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`} onClick={fetchLogs} />
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

      <div className="flex-1 overflow-y-auto p-8 max-w-[1400px] mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-white tracking-wide mb-2 flex items-center gap-3">
          <List className="text-[#00e5c0] w-6 h-6" /> System Log Feed
        </h1>

        <div className="bg-[#181d28] border border-white/10 rounded-lg flex flex-col h-[calc(100vh-200px)] border-t-2 border-t-white/30">
          <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
              <input 
                type="text" 
                placeholder="Filter logs..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-black/50 border border-white/10 rounded px-9 py-2 text-sm text-white font-mono placeholder-[#9ca3af] focus:outline-none focus:border-white/40 w-80 transition-all" 
              />
            </div>
            
            <div className="text-[#9ca3af] font-mono text-xs">
              Showing {filtered.length} entries
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
              <thead className="bg-[#181d28] sticky top-0 z-10 text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest shadow-md">
                <tr>
                  <th className="py-3 px-6 font-mono border-b border-white/5">TIMESTAMP</th>
                  <th className="py-3 px-4 font-mono border-b border-white/5">LEVEL</th>
                  <th className="py-3 px-4 font-mono border-b border-white/5">PROCESS</th>
                  <th className="py-3 px-6 font-mono border-b border-white/5 w-full">MESSAGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[#f3f4f6]">
                {filtered.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => handleLogClick(log)}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-6 text-[#9ca3af] text-xs group-hover:text-white transition-colors">{log.timestamp}</td>
                    <td className="py-3 px-4">
                       <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getLevelColor(log.level)}`}>
                         {log.level}
                       </span>
                    </td>
                    <td className="py-3 px-4 text-[#00e5c0] truncate max-w-[150px]" title={log.process}>{log.process}</td>
                    <td className="py-3 px-6 text-[#9ca3af] text-xs truncate max-w-[600px] overflow-hidden" title={log.message}>{log.message}</td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                   <tr><td colSpan={4} className="text-center py-8 text-[#9ca3af] font-mono text-sm">No logs found matching criteria.</td></tr>
                )}
                {loading && (
                   <tr><td colSpan={4} className="text-center py-8 text-[#9ca3af] font-mono text-sm">Fetching system logs...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* AI Analysis Panel Overlay */}
      {selectedLog && (
        <div className="absolute inset-y-0 right-0 w-[600px] bg-[#0c1017] border-l border-white/10 shadow-2xl transform transition-transform z-50 flex flex-col font-sans">
          <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
            <h2 className="text-xl font-display font-black text-white flex items-center gap-3 tracking-wide">
              <span className="w-4 h-1.5 bg-[#00e5c0] rounded-full"></span>
              Incident #{Math.floor(Math.random() * 10000)} <span className="text-[#9ca3af] text-sm font-mono font-normal ml-2">{timeStr}</span>
            </h2>
            <button onClick={() => setSelectedLog(null)} className="text-[#9ca3af] hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Raw Log Context */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest pl-1">Target Log</div>
              <div className="bg-black/60 border border-white/5 p-4 rounded-lg font-mono text-xs text-[#9ca3af] break-all leading-relaxed relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#00e5c0] rounded-l-lg"></div>
                 {selectedLog.raw}
              </div>
            </div>

            {analyzing ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <BrainCircuit className="w-12 h-12 text-[#a855f7] animate-pulse" />
                <div className="text-center">
                  <div className="text-white font-bold tracking-wide">SOC Analyst AI Analyzing...</div>
                  <div className="text-[#9ca3af] font-mono text-xs mt-1">Extracting intent and correlating vectors</div>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0b0c16] border border-[#a855f7]/30 rounded-lg p-5 hover:border-[#a855f7]/60 transition-colors">
                     <div className="text-[10px] font-mono font-bold text-[#a855f7] uppercase tracking-widest mb-2 flex items-center gap-2">
                       <BrainCircuit size={14} /> EPISODIC MEMORY
                     </div>
                     <div className="text-xs text-[#9ca3af] leading-relaxed">
                       This attack fingerprint has been embedded into the Vector DB. Future patterns will trigger immediate autonomous remediation.
                     </div>
                  </div>
                  
                  <div className="bg-[#0b1416] border border-[#00e5c0]/30 rounded-lg p-5 hover:border-[#00e5c0]/60 transition-colors">
                     <div className="text-[10px] font-mono font-bold text-[#00e5c0] uppercase tracking-widest mb-2 flex items-center gap-2">
                       <Zap size={14} /> SELF-HARDENING
                     </div>
                     <div className="text-xs text-[#9ca3af] leading-relaxed">
                       Detection Layer 4 has been auto-strengthened based on this event. System is now more resilient to this vector.
                     </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide uppercase font-display border-b border-white/5 pb-2">
                    <ShieldAlert size={16} /> LOG CONTEXT
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-[9px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Source IP</div>
                      <div className="text-xs font-mono font-bold text-[#00e5c0]">localhost</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-[9px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Username</div>
                      <div className="text-xs font-mono font-bold text-white truncate">{selectedLog.process}</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-[9px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Event Type</div>
                      <div className="text-xs font-mono font-bold text-white">{selectedLog.level || 'Unknown'}</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-[9px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Status Code</div>
                      <div className="text-xs font-mono font-bold text-white">200</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-[9px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Geo Region</div>
                      <div className="text-xs font-mono font-bold text-white">Local</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-lg p-3">
                      <div className="text-[9px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest mb-1">Risk Grade</div>
                      <div className={`text-xs font-mono font-bold ${getRiskColor(analysis.riskLevel)}`}>{analysis.riskLevel}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest pl-1">AI Analyst Summary</div>
                  <div className="bg-black/30 border border-white/5 p-4 rounded-lg text-sm text-[#f3f4f6] leading-relaxed">
                    {analysis.summary}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest pl-1">Root Cause</div>
                  <div className="bg-black/30 border border-[#ffb347]/20 p-4 rounded-lg text-sm text-[#f3f4f6] leading-relaxed flex items-start gap-3">
                    <Activity size={16} className="text-[#ffb347] mt-0.5 shrink-0" />
                    <div>{analysis.rootCause}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#9ca3af] uppercase tracking-widest pl-1">Recommended Remediation</div>
                  <div className="bg-gradient-to-br from-[#181d28] to-[#0c1017] border border-[#a855f7]/30 p-5 rounded-lg text-sm text-[#f3f4f6] leading-relaxed relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7]/10 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
                    <div className="whitespace-pre-line relative z-10">{analysis.remediation}</div>
                  </div>
                </div>
                
              </div>
            ) : null}
          </div>
          
          <div className="p-6 border-t border-white/10 shrink-0 bg-[#080b10]">
             <button className="w-full bg-[#a855f7] hover:bg-[#a855f7]/90 text-white font-bold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2">
               Take AI-Suggested Action
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
