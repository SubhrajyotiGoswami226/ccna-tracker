
import {
  LayoutDashboard,
  Map,
  FlaskConical,
  Terminal,
  StickyNote,
  BarChart3,
  Settings,
  GraduationCap,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { Progress } from "../ui/Progress";
import { useProgress } from "../../hooks/useProgress";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/roadmap", label: "Study Roadmap", icon: Map },
  { to: "/labs", label: "Labs", icon: FlaskConical },
  { to: "/commands", label: "CLI Commands", icon: Terminal },
  { to: "/udemy", label: "Udemy Course", icon: GraduationCap },
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { state, stats } = useProgress();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#0d1117]/80 px-4 py-6">
      <div className="px-2">
        <h1 className="text-xl font-bold tracking-tight text-white">
          CCNA<span className="text-cyan-400">Master</span>
        </h1>
        <p className="mt-0.5 text-xs text-slate-500">200-301 Study Tracker</p>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4">
        <p className="text-xs font-medium text-cyan-100">Today's Goal</p>
        <p className="mt-1 text-sm font-bold text-white">{state.todayGoal}</p>
        <Progress value={stats.overallPct} className="mt-3 bg-white/20" size="sm" />
      </div>
    </aside>
  );
}
