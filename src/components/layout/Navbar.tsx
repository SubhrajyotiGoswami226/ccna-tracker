
import { Search, Calendar, Bell, Flame } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";

const TOP_TABS = ["Exam", "Socials", "Media", "Code", "Misc"];

export function Navbar() {
  const { state } = useProgress();

  return (
    <header className="flex items-center justify-between border-b border-white/[0.06] px-8 py-4">
      <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
        {TOP_TABS.map((tab) => (
          <button
            key={tab}
            className="rounded-md px-2 py-1 transition-colors hover:text-slate-100"
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-500 sm:flex">
          <Search size={15} />
          <span>Search topics...</span>
        </div>
        <button
          className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 text-slate-400 hover:text-slate-100"
          aria-label="Calendar"
        >
          <Calendar size={16} />
        </button>
        <button
          className="relative rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 text-slate-400 hover:text-slate-100"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-2">
          <Flame size={16} className="text-white" />
          <div className="leading-tight">
            <p className="text-[11px] font-medium text-orange-100">Study Streak</p>
            <p className="text-xs font-bold text-white">
              {state.streak.count} {state.streak.count === 1 ? "Day" : "Days"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
