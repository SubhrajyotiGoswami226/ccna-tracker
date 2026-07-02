
import { Link } from "react-router-dom";
import { Progress } from "../ui/Progress";
import type { Week } from "../../types";

export function WeekCard({
  week,
  doneCount,
}: {
  week: Week;
  doneCount: number;
}) {
  const total = week.topics.length;
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);
  const remaining = total - doneCount;

  return (
    <Link
      to={`/roadmap/${week.id}`}
      className="group block rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-cyan-400">{week.title}</p>
          <h3 className="text-[15px] font-semibold text-slate-100">{week.theme}</h3>
        </div>
        <span className="text-sm font-medium text-cyan-400">{pct}%</span>
      </div>
      <Progress value={pct} className="mt-3" />
      <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
        <span>
          {doneCount}/{total} Topics
        </span>
        <span>{remaining} Remaining</span>
      </div>
    </Link>
  );
}
