import { useState } from "react";
import { Plus, Trash2, Check, ChevronDown, ExternalLink, GraduationCap } from "lucide-react";
import clsx from "clsx";
import { useProgress } from "../hooks/useProgress";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Progress } from "../components/ui/Progress";

export default function UdemyCourse() {
  const {
    state,
    stats,
    setUdemyCourseInfo,
    addUdemySection,
    renameUdemySection,
    deleteUdemySection,
    addUdemyLecture,
    deleteUdemyLecture,
    toggleUdemyLecture,
  } = useProgress();

  const course = state.udemyCourse;

  const [titleDraft, setTitleDraft] = useState(course.title);
  const [urlDraft, setUrlDraft] = useState(course.url);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [lectureDrafts, setLectureDrafts] = useState<Record<string, string>>({});
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const saveCourseInfo = () => setUdemyCourseInfo(titleDraft.trim(), urlDraft.trim());

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    addUdemySection(newSectionTitle.trim());
    setNewSectionTitle("");
  };

  const handleAddLecture = (sectionId: string) => {
    const title = lectureDrafts[sectionId]?.trim();
    if (!title) return;
    addUdemyLecture(sectionId, title);
    setLectureDrafts((prev) => ({ ...prev, [sectionId]: "" }));
  };

  return (
    <div className="pb-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-white">
            <GraduationCap size={24} className="text-cyan-400" />
            Udemy Course
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {stats.udemyTotal === 0
              ? "Add your course curriculum below to start tracking"
              : `${stats.udemyDone}/${stats.udemyTotal} lectures complete`}
          </p>
        </div>
        {stats.udemyTotal > 0 && (
          <div className="w-full max-w-xs">
            <Progress value={stats.udemyPct} />
          </div>
        )}
      </div>

      {/* Course info */}
      <Card className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-300">Course Details</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={saveCourseInfo}
            placeholder="Course title (e.g. CCNA 200-301 Complete Course)"
            className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
          />
          <input
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onBlur={saveCourseInfo}
            placeholder="Udemy course URL (optional)"
            className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
          />
        </div>
        {course.url && (
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300"
          >
            Open course on Udemy <ExternalLink size={12} />
          </a>
        )}
      </Card>

      {/* Add section */}
      <Card className="mb-6">
        <p className="mb-3 text-sm font-medium text-slate-300">Add a Section</p>
        <div className="flex gap-3">
          <input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
            placeholder="e.g. Section 3: Subnetting"
            className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
          />
          <Button onClick={handleAddSection}>
            <Plus size={15} /> Add Section
          </Button>
        </div>
      </Card>

      {course.sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] py-16 text-center">
          <GraduationCap size={28} className="mb-3 text-slate-700" />
          <p className="text-sm text-slate-500">
            No sections yet. Add each section from your Udemy course's curriculum, then list its
            lectures underneath.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {course.sections.map((section) => {
            const done = section.lectures.filter((l) => l.completed).length;
            const total = section.lectures.length;
            const pct = total === 0 ? 0 : Math.round((done / total) * 100);
            const isCollapsed = collapsed[section.id];

            return (
              <Card key={section.id}>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCollapsed((prev) => ({ ...prev, [section.id]: !prev[section.id] }))
                    }
                    className="text-slate-500 hover:text-slate-200"
                    aria-label={isCollapsed ? "Expand section" : "Collapse section"}
                  >
                    <ChevronDown
                      size={16}
                      className={clsx("transition-transform", isCollapsed && "-rotate-90")}
                    />
                  </button>
                  <input
                    defaultValue={section.title}
                    onBlur={(e) => renameUdemySection(section.id, e.target.value.trim() || section.title)}
                    className="flex-1 bg-transparent text-sm font-semibold text-slate-100 focus:outline-none"
                  />
                  <span className="shrink-0 text-xs text-slate-500">
                    {done}/{total} · {pct}%
                  </span>
                  <button
                    onClick={() => deleteUdemySection(section.id)}
                    className="shrink-0 text-slate-600 hover:text-rose-400"
                    aria-label="Delete section"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <Progress value={pct} size="sm" className="mt-3" />

                {!isCollapsed && (
                  <div className="mt-4 space-y-2">
                    {section.lectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className={clsx(
                          "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                          lecture.completed
                            ? "border-cyan-400/30 bg-cyan-400/[0.06]"
                            : "border-white/[0.06] bg-white/[0.02]"
                        )}
                      >
                        <button
                          onClick={() => toggleUdemyLecture(section.id, lecture.id)}
                          className={clsx(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                            lecture.completed
                              ? "border-cyan-400 bg-cyan-400 text-[#0a0e17]"
                              : "border-slate-600"
                          )}
                          aria-label="Toggle lecture complete"
                        >
                          {lecture.completed && <Check size={13} strokeWidth={3} />}
                        </button>
                        <span
                          className={clsx(
                            "flex-1 text-sm",
                            lecture.completed
                              ? "text-slate-400 line-through decoration-slate-600"
                              : "text-slate-200"
                          )}
                        >
                          {lecture.title}
                        </span>
                        <button
                          onClick={() => deleteUdemyLecture(section.id, lecture.id)}
                          className="shrink-0 text-slate-700 hover:text-rose-400"
                          aria-label="Delete lecture"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}

                    <div className="flex gap-2 pt-1">
                      <input
                        value={lectureDrafts[section.id] ?? ""}
                        onChange={(e) =>
                          setLectureDrafts((prev) => ({ ...prev, [section.id]: e.target.value }))
                        }
                        onKeyDown={(e) => e.key === "Enter" && handleAddLecture(section.id)}
                        placeholder="Add a lecture title..."
                        className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40"
                      />
                      <Button variant="ghost" onClick={() => handleAddLecture(section.id)}>
                        <Plus size={14} /> Add
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
