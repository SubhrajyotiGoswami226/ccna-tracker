import { useMemo, useState } from "react";
import { Check, FlaskConical } from "lucide-react";
import clsx from "clsx";
import { allLabs } from "../data/labs";
import { useProgress } from "../hooks/useProgress";
import { Progress } from "../components/ui/Progress";

const TOOLS = ["All", "Packet Tracer", "GNS3"] as const;

export default function Labs() {
  const { state, toggleLab, stats } = useProgress();
  const [tool, setTool] = useState<(typeof TOOLS)[number]>("All");
  const [weekFilter, setWeekFilter] = useState<number | "All">("All");

  const weekOptions = useMemo(
    () => ["All", ...Array.from(new Set(allLabs.map((l) => l.weekId))).sort((a, b) => a - b)],
    []
  );

  const filtered = allLabs.filter(
    (lab) =>
      (tool === "All" || lab.tool === tool) &&
      (weekFilter === "All" || lab.weekId === weekFilter)
  );

  return (
    <div className="pb-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Lab Tracker</h1>
          <p className="mt-1 text-sm text-slate-500">
            {stats.labsDone}/{stats.labsTotal} labs completed
          </p>
        </div>
        <div className="w-full max-w-xs">
          <Progress value={stats.labsTotal ? (stats.labsDone / stats.labsTotal) * 100 : 0} />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] p-1">
          {TOOLS.map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={clsx(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                tool === t ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <select
          value={weekFilter}
          onChange={(e) => setWeekFilter(e.target.value === "All" ? "All" : Number(e.target.value))}
          className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300"
        >
          {weekOptions.map((w) => (
            <option key={w} value={w} className="bg-[#0d1117]">
              {w === "All" ? "All Weeks" : `Week ${w}`}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((lab) => {
          const done = !!state.labs[lab.id];
          return (
            <button
              key={lab.id}
              onClick={() => toggleLab(lab.id)}
              className={clsx(
                "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                done
                  ? "border-cyan-400/30 bg-cyan-400/[0.06]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
              )}
            >
              <span
                className={clsx(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  done ? "border-cyan-400 bg-cyan-400 text-[#0a0e17]" : "border-slate-600"
                )}
              >
                {done && <Check size={13} strokeWidth={3} />}
              </span>
              <div className="min-w-0">
                <p className={clsx("text-sm font-medium", done ? "text-slate-300 line-through decoration-slate-600" : "text-slate-200")}>
                  {lab.title}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-slate-500">
                  <FlaskConical size={11} />
                  <span>{lab.tool}</span>
                  <span>·</span>
                  <span>Week {lab.weekId}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
