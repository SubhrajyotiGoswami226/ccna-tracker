
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { useProgress } from "../hooks/useProgress";
import { weeks } from "../data/weeks";
import { Card } from "../components/ui/Card";

export default function Analytics() {
  const { state, stats } = useProgress();

  const weekData = weeks.map((w) => {
    const done = w.topics.filter((t) => state.topics[t.id]).length;
    return {
      name: `W${w.id}`,
      pct: Math.round((done / w.topics.length) * 100),
    };
  });

  const overallData = [
    { name: "Overall", value: stats.overallPct, fill: "#22d3ee" },
  ];

  const breakdown = [
    { label: "Topics", done: stats.topicsDone, total: stats.topicsTotal },
    { label: "Labs", done: stats.labsDone, total: stats.labsTotal },
    { label: "Commands", done: stats.commandsDone, total: stats.commandsTotal },
  ];

  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Your progress at a glance</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <p className="mb-2 text-sm font-medium text-slate-300">Overall Completion</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={overallData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar background={{ fill: "#1f2937" }} dataKey="value" cornerRadius={12} />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-2xl font-bold"
              >
                {stats.overallPct}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <p className="mb-4 text-sm font-medium text-slate-300">Progress by Week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  background: "#0d1117",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="pct" fill="#22d3ee" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {breakdown.map((b) => {
          const pct = b.total ? Math.round((b.done / b.total) * 100) : 0;
          return (
            <Card key={b.label}>
              <p className="text-sm text-slate-500">{b.label}</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {b.done}/{b.total}
              </p>
              <p className="mt-1 text-xs text-cyan-400">{pct}% complete</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
