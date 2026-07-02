
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import clsx from "clsx";
import { weeks } from "../data/weeks";
import { useProgress } from "../hooks/useProgress";
import { Progress } from "../components/ui/Progress";

export default function WeekView() {
  const { weekId } = useParams();
  const { state, toggleTopic } = useProgress();
  const week = weeks.find((w) => w.id === Number(weekId));

  if (!week) return <Navigate to="/roadmap" replace />;

  const doneCount = week.topics.filter((t) => state.topics[t.id]).length;
  const pct = Math.round((doneCount / week.topics.length) * 100);

  return (
    <div className="pb-8">
      <Link
        to="/roadmap"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200"
      >
        <ArrowLeft size={15} /> Back to Roadmap
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-400">{week.title}</p>
          <h1 className="text-2xl font-bold text-white">{week.theme}</h1>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-white">{pct}%</p>
          <p className="text-xs text-slate-500">
            {doneCount}/{week.topics.length} complete
          </p>
        </div>
      </div>

      <Progress value={pct} className="mb-6" />

      <div className="space-y-2">
        {week.topics.map((topic) => {
          const done = !!state.topics[topic.id];
          return (
            <button
              key={topic.id}
              onClick={() => toggleTopic(topic.id)}
              className={clsx(
                "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                done
                  ? "border-cyan-400/30 bg-cyan-400/[0.06]"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
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
              <span className={clsx("text-sm", done ? "text-slate-300 line-through decoration-slate-600" : "text-slate-200")}>
                {topic.title}
              </span>
              <span className="ml-auto text-xs text-slate-600">{topic.category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
