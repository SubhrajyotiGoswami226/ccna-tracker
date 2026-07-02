
import { FlaskConical, Terminal } from "lucide-react";
import { ProgressRing } from "../components/dashboard/ProgressRing";
import { StatCard } from "../components/dashboard/StatCard";
import { WeekCard } from "../components/dashboard/WeekCard";
import { useProgress } from "../hooks/useProgress";
import { weeks } from "../data/weeks";

export default function Dashboard() {
  const { state, stats } = useProgress();

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <div>
            <p className="text-sm text-slate-500">Keep your streak alive!</p>
            <p className="mt-3 text-xs text-slate-500">Overall Progress</p>
          </div>
          <ProgressRing value={stats.overallPct} size={110} stroke={9} />
        </div>

        <StatCard
          label="Labs Completed"
          value={stats.labsDone}
          total={stats.labsTotal}
          sublabel="Packet Tracer / GNS3"
          icon={FlaskConical}
          accent="cyan"
        />
        <StatCard
          label="Commands Learned"
          value={stats.commandsDone}
          total={stats.commandsTotal}
          sublabel="Cisco IOS"
          icon={Terminal}
          accent="blue"
        />
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Study Roadmap</h2>
        <span className="text-sm text-slate-500">{weeks.length} Weeks</span>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-2 xl:grid-cols-3">
        {weeks.map((week) => {
          const doneCount = week.topics.filter((t) => state.topics[t.id]).length;
          return <WeekCard key={week.id} week={week} doneCount={doneCount} />;
        })}
      </div>
    </div>
  );
}
