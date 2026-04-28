import { ShieldAlert, Fingerprint, Search, ShieldCheck, CheckCircle2, FileWarning, Bug, RefreshCw, Zap, AlertTriangle, Scan, SearchCode } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { useState, useEffect } from 'react';

export function EndpointEDR() {
  const { user } = useAuth();
  const [timeStr, setTimeStr] = useState('');
  
  const [filePath, setFilePath] = useState('');
  const [fileResult, setFileResult] = useState('');
  
  const [nmapTarget, setNmapTarget] = useState('');
  const [nmapResult, setNmapResult] = useState('');

  const handleScanFile = async () => {
    setFileResult('Scanning...');
    try {
      const res = await fetch('/api/edr/scan-file', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ path: filePath })
      });
      const data = await res.json();
      setFileResult(data.result);
    } catch(e) {
      setFileResult('Error connecting to engine.');
    }
  };

  const handleRunNmap = async () => {
    setNmapResult('Running...');
    try {
      const res = await fetch('/api/edr/nmap', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ target: nmapTarget })
      });
      const data = await res.json();
      setNmapResult(data.result);
    } catch(e) {
      setNmapResult('Error connecting to engine.');
    }
  };

  useEffect(() => {
    const timeInt = setInterval(() => {
      const d = new Date();
      setTimeStr(d.toUTCString().replace('GMT', 'UTC'));
    }, 1000);
    return () => clearInterval(timeInt);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#080b10] text-[#f3f4f6] font-sans">
      <header className="flex justify-between items-center bg-[#080b10] sticky top-0 z-10 py-5 px-8 border-b border-white/5">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-white tracking-wide">Edr</h2>
          <div className="flex items-center gap-2 text-[#00e5c0] text-xs font-mono tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5c0] shadow-[0_0_8px_#00e5c0] animate-pulse"></div>
            {timeStr}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <RefreshCw size={18} className="text-[#9ca3af] cursor-pointer hover:text-white transition-colors" />
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
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-[#00e5c0] w-8 h-8" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00e5c0] to-[#00e5c0] drop-shadow-[0_0_8px_rgba(0,229,192,0.6)]">Endpoint Detection & Response</h1>
            </div>
            <p className="text-[#9ca3af] text-[0.85rem] font-mono leading-relaxed max-w-xl">
              Aegix Kernel-level Memory Protection & Vulnerability Scanning.<br/>Guards OS primitives directly on the connected endpoints.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#00e5c0] text-black px-6 py-3 rounded-lg font-display font-black text-[1.1rem] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,229,192,0.4)] transition-all">
            <Scan size={20} /> Run Deep Scan
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-black/40 border border-white/5 rounded-lg p-5 flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-[#9ca3af] font-black uppercase tracking-widest font-mono">Quarantined Processes</div>
              <div className="w-8 h-8 rounded bg-[#ff4757]/10 flex items-center justify-center text-[#ff4757] border border-[#ff4757]/20">
                <FileWarning size={16} />
              </div>
            </div>
            <div className="text-[3rem] font-display font-black text-[#ff4757] leading-none">0</div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-lg p-5 flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-[#9ca3af] font-black uppercase tracking-widest font-mono">Open Vulnerabilities</div>
              <div className="w-8 h-8 rounded bg-[#ffb347]/10 flex items-center justify-center text-[#ffb347] border border-[#ffb347]/20">
                <Bug size={16} />
              </div>
            </div>
            <div className="text-[3rem] font-display font-black text-[#ffb347] leading-none">16</div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded-lg p-5 flex flex-col justify-between h-[140px] relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="text-[10px] text-[#9ca3af] font-black uppercase tracking-widest font-mono">Protected Agents</div>
              <div className="w-8 h-8 rounded bg-[#00e5c0]/10 flex items-center justify-center text-[#00e5c0] border border-[#00e5c0]/20">
                <CheckCircle2 size={16} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-[3rem] font-display font-black text-[#00e5c0] leading-none tracking-tighter">1 / Local</div>
              <div className="text-[2rem] font-display font-black text-[#00e5c0] leading-none tracking-tighter">Node</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-black/40 border border-white/5 rounded-lg p-6 relative overflow-hidden">
            <h3 className="text-lg font-display font-black text-white flex items-center gap-2 mb-6 tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              <Search size={18} className="text-[#00e5c0]" /> Targeted EDR File Scan
            </h3>
            <div className="flex gap-4">
              <input type="text" placeholder="Absolute path (e.g. /tmp/payload)" value={filePath} onChange={e => setFilePath(e.target.value)} className="flex-1 bg-black/60 border border-white/10 rounded px-4 py-3 text-sm text-white font-mono placeholder-[#9ca3af]/50 focus:outline-none focus:border-[#00e5c0] transition-colors" />
              <button onClick={handleScanFile} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded font-display font-bold whitespace-nowrap transition-colors flex items-center gap-2 tracking-wide">
                Scan File
              </button>
            </div>
            {fileResult && <div className="mt-4 bg-black/80 border border-white/5 p-4 rounded text-xs font-mono text-[#00e5c0] whitespace-pre-wrap max-h-40 overflow-y-auto">{fileResult}</div>}
          </div>

          <div className="bg-black/40 border border-white/5 rounded-lg p-6 relative overflow-hidden">
            <h3 className="text-lg font-display font-black text-white flex items-center gap-2 mb-6 tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              <Zap size={18} className="text-[#ffb347]" /> Parallel Nmap Scan
            </h3>
            <div className="flex gap-4">
              <input type="text" placeholder="IP or Hostname (e.g. 192.168.1.1)" value={nmapTarget} onChange={e => setNmapTarget(e.target.value)} className="flex-1 bg-black/60 border border-white/10 rounded px-4 py-3 text-sm text-white font-mono placeholder-[#9ca3af]/50 focus:outline-none focus:border-[#ffb347] transition-colors" />
              <button onClick={handleRunNmap} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded font-display font-bold whitespace-nowrap transition-colors flex items-center gap-2 tracking-wide">
                Run Nmap
              </button>
            </div>
            {nmapResult && <div className="mt-4 bg-black/80 border border-white/5 p-4 rounded text-xs font-mono text-[#ffb347] whitespace-pre-wrap max-h-40 overflow-y-auto">{nmapResult}</div>}
          </div>
        </div>

        <div className="flex gap-8 border-b border-white/5 pt-4">
          <button className="flex items-center gap-2 text-[#ff4757] font-mono text-[11px] uppercase tracking-widest pb-3 border-b-2 border-[#ff4757] hover:bg-[#ff4757]/5 px-2 transition-colors">
            <AlertTriangle size={14} /> Execution Blocks
          </button>
          <button className="flex items-center gap-2 text-[#9ca3af] hover:text-white font-mono text-[11px] uppercase tracking-widest pb-3 border-b-2 border-transparent hover:border-white/20 px-2 transition-colors">
            <SearchCode size={14} /> DefectDoJo Scanners
          </button>
          <button className="flex items-center gap-2 text-[#9ca3af] hover:text-white font-mono text-[11px] uppercase tracking-widest pb-3 border-b-2 border-transparent hover:border-white/20 px-2 transition-colors">
            <CheckCircle2 size={14} /> Patch Reports
          </button>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-lg overflow-hidden mt-6">
          <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
            <thead className="bg-[#0a0f16] text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest border-b border-white/5">
              <tr>
                <th className="py-4 px-6 font-mono font-medium">TIMESTAMP</th>
                <th className="py-4 px-6 font-mono font-medium">HOST ENDPOINT</th>
                <th className="py-4 px-6 font-mono font-medium">PROCESS BLOCKED</th>
                <th className="py-4 px-6 font-mono font-medium text-right">DEFENSE ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-white/90">
              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="py-4 px-6 text-[#9ca3af] text-xs">8:12:05 AM</td>
                <td className="py-4 px-6 text-[#00e5c0] text-xs">local-node-01</td>
                <td className="py-4 px-6 text-white text-xs">/usr/bin/bash (Reverse Shell Attempt)</td>
                <td className="py-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ff4757]/30 text-[#ff4757] text-[10px] font-bold uppercase tracking-wider bg-[#ff4757]/10 w-max ml-auto">
                    <ShieldAlert size={12} /> KILLED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="py-4 px-6 text-[#9ca3af] text-xs">7:45:22 AM</td>
                <td className="py-4 px-6 text-[#00e5c0] text-xs">local-node-01</td>
                <td className="py-4 px-6 text-white text-xs">/tmp/malware.sh (Sigma Rule Match)</td>
                <td className="py-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ff4757]/30 text-[#ff4757] text-[10px] font-bold uppercase tracking-wider bg-[#ff4757]/10 w-max ml-auto">
                    <ShieldAlert size={12} /> KILLED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors cursor-pointer group">
                <td className="py-4 px-6 text-[#9ca3af] text-xs">6:30:10 AM</td>
                <td className="py-4 px-6 text-[#00e5c0] text-xs">local-node-01</td>
                <td className="py-4 px-6 text-white text-xs">/bin/nc (Unauthorized Netcat Listener)</td>
                <td className="py-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ff4757]/30 text-[#ff4757] text-[10px] font-bold uppercase tracking-wider bg-[#ff4757]/10 w-max ml-auto">
                    <ShieldAlert size={12} /> KILLED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
