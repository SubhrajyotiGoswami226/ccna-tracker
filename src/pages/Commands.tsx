import { useMemo, useState } from "react";
import { Check, Terminal, Search } from "lucide-react";
import clsx from "clsx";
import { allCommands } from "../data/commands";
import { useProgress } from "../hooks/useProgress";
import { Progress } from "../components/ui/Progress";

export default function Commands() {
  const { state, toggleCommand, stats } = useProgress();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(allCommands.map((c) => c.category)))],
    []
  );

  const filtered = allCommands.filter(
    (cmd) =>
      (category === "All" || cmd.category === category) &&
      (cmd.command.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="pb-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">CLI Command Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            {stats.commandsDone}/{stats.commandsTotal} commands learned
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Progress value={stats.commandsTotal ? (stats.commandsDone / stats.commandsTotal) * 100 : 0} />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-400">
          <Search size={14} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands..."
            className="w-48 bg-transparent text-slate-200 placeholder:text-slate-600 focus:outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300"
        >
          {categories.map((c) => (
            <option key={c} value={c} className="bg-[#0d1117]">
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
        {filtered.map((cmd, i) => {
          const done = !!state.commands[cmd.id];
          return (
            <button
              key={cmd.id}
              onClick={() => toggleCommand(cmd.id)}
              className={clsx(
                "flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors",
                i !== 0 && "border-t border-white/[0.05]",
                done ? "bg-cyan-400/[0.05]" : "bg-white/[0.015] hover:bg-white/[0.03]"
              )}
            >
              <span
                className={clsx(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  done ? "border-cyan-400 bg-cyan-400 text-[#0a0e17]" : "border-slate-600"
                )}
              >
                {done && <Check size={13} strokeWidth={3} />}
              </span>
              <Terminal size={14} className="shrink-0 text-slate-600" />
              <code className="shrink-0 font-mono text-sm text-cyan-300">{cmd.command}</code>
              <span className="truncate text-sm text-slate-500">{cmd.description}</span>
              <span className="ml-auto shrink-0 rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-slate-500">
                {cmd.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
