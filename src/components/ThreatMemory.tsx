import { BrainCircuit, Check, X, Clock } from 'lucide-react';

export function ThreatMemory() {
  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Threat Memory Engine</h2>
        <p className="text-slate-400 text-sm mt-1">Review AI model verdicts and provide reinforcement training feedback.</p>
      </header>

      <div className="bg-[#181d28] border border-white/5 rounded-lg p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-[#7f77dd]" size={20} />
            <h3 className="font-semibold text-slate-200 uppercase tracking-wide text-sm">Recent AI Evaluations</h3>
          </div>
          <div className="text-xs bg-[#7f77dd]/10 text-[#7f77dd] px-3 py-1 rounded-full border border-[#7f77dd]/30">AWAITING FEEDBACK: 2</div>
        </div>

        <div className="space-y-4">
          {[
            { 
              id: 'MEM-99A', 
              sig: 'Obfuscated PowerShell encoding in memory', 
              verdict: 'Malicious', 
              confidence: 94,
              time: '10 mins ago',
              status: 'pending'
            },
            { 
              id: 'MEM-98B', 
              sig: 'Unexpected svchost.exe network connection to RU IP', 
              verdict: 'Suspicious', 
              confidence: 76,
              time: '1 hour ago',
              status: 'pending'
            },
            { 
              id: 'MEM-97C', 
              sig: 'Bulk file modification in User Directory', 
              verdict: 'Malicious', 
              confidence: 99,
              time: '3 hours ago',
              status: 'confirmed'
            }
          ].map((threat) => (
            <div key={threat.id} className={`p-4 rounded-xl border ${threat.status === 'pending' ? 'bg-black/40 border-[#7f77dd]/30' : 'bg-black/20 border-white/5 opacity-70'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500">{threat.id}</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1"><Clock size={12} /> {threat.time}</span>
                  </div>
                  <div className="text-sm text-slate-200 font-medium mt-1">{threat.sig}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${threat.verdict === 'Malicious' ? 'text-[#EF4444]' : 'text-orange-400'}`}>
                    {threat.verdict}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Confidence: {threat.confidence}%</div>
                </div>
              </div>
              
              {threat.status === 'pending' ? (
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <span className="text-xs text-slate-500 uppercase tracking-wider">Reinforcement:</span>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] text-xs font-bold rounded-lg transition-colors border border-[#EF4444]/30">
                    <Check size={14} /> Confirm Malicious
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition-colors border border-slate-600">
                    <X size={14} /> Dismiss Safe
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-white/5">
                  <span className="text-xs text-[#00FF00] font-medium tracking-wider flex items-center gap-1">
                    <Check size={14} /> Feedback Recorded
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
