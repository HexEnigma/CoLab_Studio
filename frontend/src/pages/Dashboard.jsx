import { Link } from "react-router-dom";
import { useWorkspaces } from "../hooks/useWorkspaces";
import useAuthStore from "../store/authStore";
import { Share2, Plus, Layout, Loader2 } from "lucide-react";

export default function Dashboard() {
  // 1. Grab the logic from our Hook (Separation of Concerns)
  const {
    workspaces,
    isLoading,
    error,
    newWorkspaceName,
    setNewWorkspaceName,
    isCreating,
    createWorkspace,
  } = useWorkspaces();

  // 2. Grab the logged-in user's info
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#111111]">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <Share2 size={18} className="text-white" />
          </div>
          CoLab Studio
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="text-zinc-400">{user?.email}</span>
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-md hover:bg-white/10 transition-colors">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
              Your Workspaces
            </h1>
            <p className="text-zinc-400 mt-1">
              Manage your system design environments.
            </p>
          </div>

          {/* Create Workspace Form */}
          <form onSubmit={createWorkspace} className="flex gap-2">
            <input
              type="text"
              placeholder="New workspace name..."
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              disabled={isCreating}
              className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
            />
            <button
              type="submit"
              disabled={isCreating || !newWorkspaceName.trim()}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
            >
              {isCreating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Create
            </button>
          </form>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : (
          /* Workspace Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.length === 0 ? (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
                <Layout className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-zinc-300">
                  No workspaces found
                </h3>
                <p className="text-zinc-500 text-sm mt-1">
                  Create your first workspace to start designing.
                </p>
              </div>
            ) : (
              workspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  to={`/workspace/${workspace.slug}`}
                  className="group block p-6 bg-[#111111] border border-white/10 rounded-xl hover:border-purple-500/50 hover:bg-[#161616] transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-colors">
                      <Layout className="w-5 h-5 text-zinc-400 group-hover:text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white mb-1">
                    {workspace.name}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Created{" "}
                    {new Date(workspace.created_at).toLocaleDateString()}
                  </p>
                </Link>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
