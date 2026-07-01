import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Code, Cloud } from "lucide-react";
import Editor from "@monaco-editor/react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import api from "../services/api";
import TableNode from "../components/TableNode";

// Register our custom UI component with React Flow
const nodeTypes = {
  tableNode: TableNode,
};

export default function WorkspaceEditor() {
  const { slug } = useParams();
  const [code, setCode] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef(null);

  // 1. Define the Parser FIRST so the rest of the file can use it safely
  const parseCode = useCallback(
    (value) => {
      if (!value) return;

      const lines = value.split("\n");
      const newNodes = [];
      let currentTable = null;
      let yOffset = 50;
      let xOffset = 300;

      lines.forEach((line) => {
        const trimmed = line.trim();

        if (trimmed.startsWith("Table ")) {
          const name = trimmed.split(" ")[1];
          currentTable = {
            id: name,
            type: "tableNode",
            position: { x: xOffset, y: yOffset },
            data: { label: name, fields: [] },
          };
          yOffset += 250;
        } else if (trimmed === "}") {
          if (currentTable) newNodes.push(currentTable);
          currentTable = null;
        } else if (currentTable && trimmed !== "{" && trimmed !== "") {
          const parts = trimmed.split(/\s+/);
          currentTable.data.fields.push({
            name: parts[0],
            type: parts[1] || "varchar",
            isPk: trimmed.includes("[pk]"),
          });
        }
      });
      setNodes(newNodes);
    },
    [setNodes],
  );

  // 2. Handle Edge Connections
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  // 3. Fetch initial data from Django on load
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await api.get(`workspaces/${slug}/`);
        setCode(response.data.schema_code);
        // It is now safe to call parseCode here
        parseCode(response.data.schema_code);
      } catch (err) {
        console.error("Failed to fetch workspace", err);
      }
    };
    fetchWorkspace();

    // Tell the linter to back off so the React Compiler can do its job
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // 4. Handle Editor Changes & Auto-Save
  const handleEditorChange = (value) => {
    setCode(value);
    parseCode(value); // Instantly update visuals

    // Clear the previous timer
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setIsSaving(true);

    // Set a new timer to save after 1 second of typing inactivity
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await api.patch(`workspaces/${slug}/`, { schema_code: value });
      } catch (err) {
        console.error("Failed to auto-save", err);
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      <header className="h-14 border-b border-white/10 bg-[#111111] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link
            to="/workspace"
            className="p-1.5 hover:bg-white/10 rounded-md text-zinc-400"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="font-semibold text-sm">{slug}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
          {isSaving ? (
            <>
              <Cloud className="w-4 h-4 animate-pulse text-purple-400" />{" "}
              Saving...
            </>
          ) : (
            <>
              <Cloud className="w-4 h-4 text-green-500" /> Saved
            </>
          )}
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left: Code Editor */}
        <div className="w-1/3 border-r border-white/10 flex flex-col">
          <div className="h-10 bg-[#161616] flex items-center px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider gap-2">
            <Code size={14} /> Schema Definition
          </div>
          <Editor
            height="calc(100vh - 88px)"
            theme="vs-dark"
            defaultLanguage="sql"
            value={code}
            onChange={handleEditorChange}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              padding: { top: 16 },
            }}
          />
        </div>

        {/* Right: Visual Canvas */}
        <div className="w-2/3 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            colorMode="dark"
            fitView
          >
            <Background color="#333" gap={24} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
