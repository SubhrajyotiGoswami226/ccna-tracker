
import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

export function StatCard({
  label,
  value,
  total,
  sublabel,
  icon: Icon,
  accent = "cyan",
}: {
  label: string;
  value: number;
  total: number;
  sublabel: string;
  icon: LucideIcon;
  accent?: "cyan" | "blue";
}) {
  return (
    <Card className="flex items-center justify-between" hoverable>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-white">
          {value}/{total}
        </p>
        <p className="mt-1 text-xs text-slate-500">{sublabel}</p>
      </div>
      <div
        className={
          accent === "cyan"
            ? "rounded-lg bg-cyan-500/10 p-3 text-cyan-400"
            : "rounded-lg bg-blue-500/10 p-3 text-blue-400"
        }
      >
        <Icon size={22} />
      </div>
    </Card>
  );
}
