import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Settings() {
  const { state, setTodayGoal, resetProgress } = useProgress();
  const [goal, setGoal] = useState(state.todayGoal);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="max-w-xl pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your study preferences</p>
      </div>

      <Card className="mb-5">
        <p className="mb-3 text-sm font-medium text-slate-300">Today's Goal</p>
        <div className="flex gap-3">
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400/40"
          />
          <Button onClick={() => setTodayGoal(goal)}>
            <Save size={15} /> Save
          </Button>
        </div>
      </Card>

      <Card className="mb-5">
        <p className="mb-1 text-sm font-medium text-slate-300">Current Streak</p>
        <p className="text-2xl font-bold text-white">
          {state.streak.count} {state.streak.count === 1 ? "Day" : "Days"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Comes back automatically every day you open the app.
        </p>
      </Card>

      <Card>
        <p className="mb-1 text-sm font-medium text-rose-400">Danger Zone</p>
        <p className="mb-3 text-xs text-slate-500">
          This clears all checked topics, labs, commands, notes, and your streak. This can't be undone.
        </p>
        {confirmReset ? (
          <div className="flex gap-3">
            <Button variant="danger" onClick={() => { resetProgress(); setConfirmReset(false); }}>
              Confirm Reset
            </Button>
            <Button variant="ghost" onClick={() => setConfirmReset(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            <RotateCcw size={15} /> Reset All Progress
          </Button>
        )}
      </Card>
    </div>
  );
}
