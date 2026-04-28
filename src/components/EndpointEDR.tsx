import { ShieldAlert, Fingerprint, Search, ShieldCheck } from 'lucide-react';

export function EndpointEDR() {
  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Endpoint Detection & Response (EDR)</h2>
        <p className="text-slate-400 text-sm mt-1">Manage active agent endpoints, patches, and quarantined assets.</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass-panel p-5 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="text-orange-500" size={18} />
            <h3 className="font-semibold text-slate-200 uppercase tracking-wide text-sm">Endpoint Vulnerabilities (CVEs)</h3>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {[
              { id: 'CVE-2024-2141', score: 9.8, name: 'Remote Code Execution', host: 'WKST-442', age: '2 days' },
              { id: 'CVE-2023-4911', score: 7.8, name: 'Privilege Escalation', host: 'SRV-092', age: '15 days' },
            ].map((cve, i) => (
              <div key={i} className="p-4 bg-black/40 border border-white/5 rounded-lg flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-orange-400 text-sm font-bold">{cve.id}</div>
                    <div className="text-sm text-slate-300 mt-1">{cve.name}</div>
                  </div>
                  <div className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold border border-orange-500/30">CVSS: {cve.score}</div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                  <div className="text-xs text-slate-500">Host: <span className="font-mono text-slate-300">{cve.host}</span></div>
                  <button className="px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 text-xs rounded transition-colors border border-white/10">Patch Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-[#06B6D4]" size={18} />
            <h3 className="font-semibold text-slate-200 uppercase tracking-wide text-sm">Quarantined Files</h3>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {[
              { file: 'Invoice-771.exe', path: 'C:\\Users\\admin\\Downloads\\', detected: 'Heuristic.Behavior.Malware', status: 'Isolated' },
              { file: 'svchost_update.ps1', path: 'C:\\Windows\\Temp\\', detected: 'Trojan.PowerShell.Agent', status: 'Isolated' },
            ].map((qf, i) => (
              <div key={i} className="p-4 bg-black/40 border border-[#06B6D4]/20 rounded-lg flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <Fingerprint className="text-[#06B6D4] mt-0.5" size={16} />
                  <div>
                    <div className="text-sm font-bold text-slate-200">{qf.file}</div>
                    <div className="text-xs text-slate-500 font-mono mt-1 w-full truncate" title={qf.path}>{qf.path}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#06B6D4]/20">
                  <div className="text-xs text-red-400 font-mono">{qf.detected}</div>
                  <button className="flex items-center gap-1 px-3 py-1 bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-[#06B6D4] text-xs font-medium rounded transition-colors border border-[#06B6D4]/30">
                    <Search size={14} /> Run File Scan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
