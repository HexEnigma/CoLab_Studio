import { Link } from 'react-router-dom';
import { Share2, /*Layout,*/ Zap } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans selection:bg-purple-500/30">
      
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <Share2 size={18} className="text-white" />
          </div>
          CoLab Studio
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/login" className="text-zinc-400 hover:text-white transition-colors">Log in</Link>
          <Link to="/register" className="bg-white text-black px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto mt-20 mb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-purple-500"></span>
          v1.0 is currently in active development
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          System Design,<br />Built for Teams.
        </h1>
        
        <p className="text-lg text-zinc-400 mb-10 max-w-2xl leading-relaxed">
          The production-grade real-time collaborative architecture platform. 
          Brainstorm, design, document, and manage system evolution inside a single workspace.
        </p>
        
        <div className="flex items-center gap-4">
          <Link to="/register" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
            Start Designing Free <Zap size={18} />
          </Link>
        </div>
      </main>

    </div>
  );
}