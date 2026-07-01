import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Settings,
  MousePointer2,
  Box,
  Database,
  Share2,
} from "lucide-react";

export default function WorkspaceEditor() {
  // Extract the unique workspace slug from the URL
  const { slug } = useParams();

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden selection:bg-purple-500/30">
      {/* Editor Top Bar */}
      <header className="h-14 border-b border-white/10 bg-[#111111] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/workspace"
            className="p-1.5 hover:bg-white/10 rounded-md text-zinc-400 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </Link>

          <div className="w-px h-6 bg-white/10"></div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <Share2 size={12} className="text-white" />
            </div>
            <span className="font-semibold text-sm">{slug}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-white/5 ml-2">
              Draft
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Simulated Active Users (Presence) */}
          <div className="flex -space-x-2 mr-4">
            <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-[#111111] flex items-center justify-center text-xs font-bold z-20">
              You
            </div>
            <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-[#111111] flex items-center justify-center text-xs font-bold z-10 opacity-50"></div>
          </div>

          <button className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
            <Share2 size={14} /> Share
          </button>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar (Nodes) */}
        <aside className="w-16 border-r border-white/10 bg-[#111111] flex flex-col items-center py-4 gap-4 z-10">
          <button
            className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30"
            title="Select"
          >
            <MousePointer2 size={20} />
          </button>
          <button
            className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
            title="Process Node"
          >
            <Box size={20} />
          </button>
          <button
            className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
            title="Database Node"
          >
            <Database size={20} />
          </button>
        </aside>

        {/* Center Canvas Area (React Flow will go here) */}
        <main className="flex-1 relative bg-[#0a0a0a] bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zinc-700 mb-2">
                Canvas Ready
              </h2>
              <p className="text-zinc-500 text-sm">
                Awaiting React Flow Engine Integration
              </p>
            </div>
          </div>
        </main>

        {/* Right Properties Panel */}
        <aside className="w-64 border-l border-white/10 bg-[#111111] flex flex-col z-10">
          <div className="h-12 border-b border-white/10 flex items-center px-4 font-medium text-sm text-zinc-300">
            Properties
          </div>
          <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto">
            {/* Example Property Section */}
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
                Workspace Settings
              </label>
              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white p-2 rounded hover:bg-white/5 transition-colors text-left">
                  <Users size={16} className="text-zinc-500" /> Manage Members
                </button>
                <button className="flex items-center gap-3 text-sm text-zinc-300 hover:text-white p-2 rounded hover:bg-white/5 transition-colors text-left">
                  <Settings size={16} className="text-zinc-500" /> Preferences
                </button>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full"></div>

            <div className="text-xs text-zinc-600 text-center mt-auto">
              Select a node to edit its properties.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
