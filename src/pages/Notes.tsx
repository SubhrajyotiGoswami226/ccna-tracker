import { useState } from "react";
import { Plus, Trash2, StickyNote } from "lucide-react";
import { useProgress } from "../hooks/useProgress";
import { weeks } from "../data/weeks";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Notes() {
  const { state, addNote, deleteNote } = useProgress();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [weekId, setWeekId] = useState<number | "">("");

  const handleAdd = () => {
    if (!title.trim()) return;
    addNote(title.trim(), body.trim(), weekId === "" ? null : Number(weekId));
    setTitle("");
    setBody("");
    setWeekId("");
  };

  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Notes</h1>
        <p className="mt-1 text-sm text-slate-500">{state.notes.length} saved notes</p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your notes..."
            rows={3}
            className="resize-none rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
          />
          <div className="flex items-center justify-between gap-3">
            <select
              value={weekId}
              onChange={(e) => setWeekId(e.target.value === "" ? "" : Number(e.target.value))}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300"
            >
              <option value="" className="bg-[#0d1117]">
                No week link
              </option>
              {weeks.map((w) => (
                <option key={w.id} value={w.id} className="bg-[#0d1117]">
                  {w.title} — {w.theme}
                </option>
              ))}
            </select>
            <Button onClick={handleAdd}>
              <Plus size={15} /> Add Note
            </Button>
          </div>
        </div>
      </Card>

      {state.notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
          <StickyNote size={28} className="mb-3 text-slate-700" />
          <p className="text-sm text-slate-500">No notes yet. Add one above to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {state.notes.map((note) => {
            const week = weeks.find((w) => w.id === note.weekId);
            return (
              <Card key={note.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-100">{note.title}</h3>
                    {week && <p className="mt-0.5 text-[11px] text-cyan-400">{week.title} · {week.theme}</p>}
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="shrink-0 text-slate-600 hover:text-rose-400"
                    aria-label="Delete note"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                {note.body && <p className="mt-2 whitespace-pre-wrap text-sm text-slate-400">{note.body}</p>}
                <p className="mt-3 text-[11px] text-slate-600">
                  {new Date(note.updatedAt).toLocaleString()}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
