import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Shield } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // For purely mock local usage fallback, allow admin:admin123 without real auth
    // But since the user specifically says "use the google firebase for the login frontend",
    // We will validate with firebase. However, since the user gave "admin" AND "admin123", we can just 
    // try to login with firebase.
    try {
      if (email === 'admin' && password === 'admin123') {
          // You can't actually do this easily with Firebase email/password directly without an email, but let's emulate it
          // Wait, user says "admin@domain.com" in screenshot, so we just use normal Firebase auth
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log('Firebase error:', err.code);
      // Fallback local admin override for hackathon convenience if firebase is unpopulated
      if (email === 'admin@domain.com' && password === 'admin123') {
         setError('Firebase auth failed, but bypass is not fully implemented. Please create a user in Firebase.');
      } else {
         setError(err.message || 'Failed to authenticate');
      }
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
    <div className="flex h-screen items-center justify-center bg-[#0B0D17] text-white">
      {/* Background glowing effects */}
       <div className="fixed top-[-10%] left-1/4 w-[800px] h-[400px] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none"></div>
       <div className="fixed bottom-[-10%] right-1/4 w-[600px] h-[300px] bg-[#06B6D4]/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="z-10 w-full max-w-md p-8 bg-white/[0.02] border border-white/5 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Top cyan accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-50"></div>

        <div className="flex flex-col items-center mb-10">
           <div className="flex items-center gap-3">
             <Shield className="text-[#06B6D4] w-10 h-10" />
             <h1 className="text-3xl font-bold tracking-wider uppercase text-white">
               AegixChain <span className="text-[#06B6D4] neon-text-cyan">Portal</span>
             </h1>
           </div>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs text-slate-500 uppercase tracking-widest font-mono">Access ID / Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@domain.com"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#06B6D4] transition-colors"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-500 uppercase tracking-widest font-mono">Decryption Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-[#06B6D4] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-black font-bold py-3 rounded-lg uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-8 relative flex items-center justify-center">
           <div className="absolute w-full border-t border-white/10"></div>
           <div className="relative bg-[#0B0D17] px-4 text-xs text-slate-500 uppercase tracking-widest">
             Or Continue With
           </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-8 w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          {/* Simple G logo using an SVG */}
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
            </g>
          </svg>
          Google Sign-In
        </button>

        <div className="mt-8 text-center text-xs text-slate-600 font-mono">
          Protected by Layer-05 Quantum Encryption
        </div>
      </div>
    </div>
  );
}
