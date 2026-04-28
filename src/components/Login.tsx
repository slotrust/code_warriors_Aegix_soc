import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Shield } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setMockUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hackathon bypass user request: 'admin' and 'admin123'
    if (email === 'admin' && password === 'admin123') {
      setMockUser({ uid: 'mock-admin-uid', email: 'admin@aegixchain.io', isMock: true });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log('Firebase error:', err.code);
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080b10] text-[#f3f4f6] relative font-sans">
      {/* Background glowing effects from AegixChain */}
      <div className="absolute inset-0 z-0 opacity-60 bg-[radial-gradient(circle_at_center,rgba(8,11,16,0.2),#080b10_70%),linear-gradient(rgba(0,229,192,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,192,0.05)_1px,transparent_1px)]" style={{ backgroundSize: '100% 100%, 40px 40px, 40px 40px' }}></div>
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,192,0.08)_0%,transparent_70%)] pointer-events-none z-0"></div>

      <div className="z-10 w-full max-w-[400px] p-10 bg-[#181d28] border border-[#00e5c0]/20 rounded-lg shadow-[0_0_30px_rgba(0,229,192,0.1)] relative">
        <div className="flex flex-col items-center mb-8">
           <div className="text-center font-display font-black text-4xl text-[#f3f4f6] tracking-tight">
             Aegix<span className="text-[#00e5c0]">Chain</span>
           </div>
           <div className="font-mono text-[10.5px] tracking-[4px] text-[#2a5060] mt-2 uppercase">
             Cybersecurity
           </div>
        </div>

        {error && <div className="mb-6 text-[#ff4757] text-sm text-center bg-[#ff4757]/10 p-3 rounded border border-[#ff4757]/20 font-mono">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[0.8rem] text-[#9ca3af] font-mono block">Access ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin"
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-3 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#00e5c0] focus:shadow-[0_0_10px_rgba(0,229,192,0.2)] transition-all font-sans"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[0.8rem] text-[#9ca3af] font-mono block">Decryption Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/50 border border-white/10 rounded px-3 py-3 text-white placeholder-[#9ca3af] focus:outline-none focus:border-[#00e5c0] focus:shadow-[0_0_10px_rgba(0,229,192,0.2)] transition-all font-sans"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00e5c0] hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,229,192,0.3)] text-black font-bold font-mono text-[0.9rem] py-3.5 rounded transition-all disabled:opacity-50 mt-4 relative overflow-hidden"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 relative flex items-center justify-center">
           <div className="absolute w-full border-t border-white/10"></div>
           <div className="relative bg-[#181d28] px-4 text-[0.8rem] text-[#9ca3af] font-mono">
             Or connect via
           </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-3 bg-transparent border border-white/20 text-[#f3f4f6] font-bold font-mono text-[0.9rem] py-3 rounded hover:bg-white/5 transition-all outline-none"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          Google Node Auth
        </button>

        <div className="mt-8 text-center text-xs text-[#9ca3af] font-mono flex items-center justify-center gap-2">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00e5c0]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
           Protected by Layer-05 Encryption
        </div>
      </div>
    </div>
  );
}

