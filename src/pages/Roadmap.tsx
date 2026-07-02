
import { WeekCard } from "../components/dashboard/WeekCard";
import { useProgress } from "../hooks/useProgress";
import { weeks } from "../data/weeks";

export default function Roadmap() {
  const { state } = useProgress();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Study Roadmap</h1>
        <p className="mt-1 text-sm text-slate-500">
          {weeks.length} weeks · {weeks.reduce((n, w) => n + w.topics.length, 0)} topics total
        </p>
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
