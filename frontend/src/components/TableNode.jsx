import { Handle, Position } from "@xyflow/react";
import { Key } from "lucide-react";

export default function TableNode({ data }) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-lg shadow-2xl w-64 font-mono text-sm overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-[#111111] border-b border-white/10 px-3 py-2 font-bold text-zinc-100 flex justify-between items-center">
        <span>{data.label}</span>
      </div>

      {/* Table Fields */}
      <div className="p-1 flex flex-col">
        {data.fields &&
          data.fields.map((field, idx) => (
            <div
              key={idx}
              className="relative group flex justify-between items-center text-zinc-400 px-2 py-1.5 hover:bg-white/5 rounded transition-colors"
            >
              {/* Left Handle (For incoming relationships) */}
              <Handle
                type="target"
                position={Position.Left}
                id={`${field.name}-in`}
                className="!w-2 !h-2 !bg-purple-500 !border-none opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <div className="flex items-center gap-2">
                {field.isPk && <Key size={12} className="text-yellow-500" />}
                <span
                  className={field.isPk ? "text-zinc-200 font-semibold" : ""}
                >
                  {field.name}
                </span>
              </div>

              <span className="text-purple-400/70 text-xs">{field.type}</span>

              {/* Right Handle (For outgoing relationships) */}
              <Handle
                type="source"
                position={Position.Right}
                id={`${field.name}-out`}
                className="!w-2 !h-2 !bg-purple-500 !border-none opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
