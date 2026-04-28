import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EndpointEDR } from './components/EndpointEDR';
import { ThreatMemory } from './components/ThreatMemory';
import { Chatbot } from './components/Chatbot';
import { BrainCircuit, Activity } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'edr': return <EndpointEDR />;
      case 'threat_memory': return <ThreatMemory />;
      case 'mitre': 
      case 'behavioral':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 animate-in fade-in">
            {currentView === 'behavioral' ? <Activity size={48} className="opacity-20" /> : <BrainCircuit size={48} className="opacity-20" />}
            <div className="text-xl font-light">Module &quot;{currentView}&quot; Initialization Pending...</div>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0D17] text-slate-300 overflow-hidden font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        {/* Ambient background glow */}
        <div className="fixed top-[-10%] left-1/4 w-[800px] h-[400px] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-1/4 w-[600px] h-[300px] bg-[#06B6D4]/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 min-h-full">
          {renderContent()}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}
