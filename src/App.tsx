import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EndpointEDR } from './components/EndpointEDR';
import { ThreatMemory } from './components/ThreatMemory';
import { Chatbot } from './components/Chatbot';
import { Login } from './components/Login';
import { Processes } from './components/Processes';
import { Network } from './components/Network';
import { useAuth } from './lib/AuthContext';
import { BrainCircuit, Activity } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#080b10] text-[#00e5c0]">Loading AegixChain...</div>;
  }

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'edr': return <EndpointEDR />;
      case 'brain': return <ThreatMemory />;
      case 'processes': return <Processes />;
      case 'network': return <Network />;
      case 'mitre': 
      case 'alerts':
      case 'logs':
      case 'forensics':
      case 'ips':
      case 'users':
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
    <div className="flex h-screen bg-[#080b10] text-slate-300 overflow-hidden font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 relative overflow-y-auto custom-scrollbar">
        {/* Ambient background glow */}
        <div className="fixed top-[-10%] left-1/4 w-[800px] h-[400px] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-1/4 w-[600px] h-[300px] bg-[#00e5c0]/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 min-h-full">
          {renderContent()}
        </div>
      </main>
      <Chatbot />
    </div>
  );
}
