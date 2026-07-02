import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { allTopics } from "../data/weeks";
import { allLabs } from "../data/labs";
import { allCommands } from "../data/commands";
import type { ProgressState, Note, UdemyCourse } from "../types";

const STORAGE_KEY = "ccna-tracker-progress";

const initialUdemyCourse: UdemyCourse = {
  title: "",
  url: "",
  sections: [],
};

const initialState: ProgressState = {
  topics: {},
  labs: {},
  commands: {},
  notes: [],
  streak: { count: 0, lastActiveDate: null },
  todayGoal: "Finish Week 1",
  udemyCourse: initialUdemyCourse,
};

function isYesterday(dateStr: string, today: Date) {
  const d = new Date(dateStr);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

interface ProgressContextValue {
  state: ProgressState;
  toggleTopic: (id: string) => void;
  toggleLab: (id: string) => void;
  toggleCommand: (id: string) => void;
  addNote: (title: string, body: string, weekId: number | null) => void;
  updateNote: (id: string, title: string, body: string) => void;
  deleteNote: (id: string) => void;
  setTodayGoal: (goal: string) => void;
  resetProgress: () => void;
  setUdemyCourseInfo: (title: string, url: string) => void;
  addUdemySection: (title: string) => void;
  renameUdemySection: (sectionId: string, title: string) => void;
  deleteUdemySection: (sectionId: string) => void;
  addUdemyLecture: (sectionId: string, title: string) => void;
  deleteUdemyLecture: (sectionId: string, lectureId: string) => void;
  toggleUdemyLecture: (sectionId: string, lectureId: string) => void;
  stats: {
    topicsDone: number;
    topicsTotal: number;
    labsDone: number;
    labsTotal: number;
    commandsDone: number;
    commandsTotal: number;
    overallPct: number;
    udemyDone: number;
    udemyTotal: number;
    udemyPct: number;
  };
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState, reset] = useLocalStorage<ProgressState>(STORAGE_KEY, initialState);

  // Backfill fields for anyone with progress saved before this field existed
  useEffect(() => {
    setState((prev) =>
      prev.udemyCourse ? prev : { ...prev, udemyCourse: initialUdemyCourse }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Streak tracking — runs once per session on mount
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toDateString();

    setState((prev) => {
      if (prev.streak.lastActiveDate === todayStr) return prev; // already counted today
      const continued = prev.streak.lastActiveDate
        ? isYesterday(prev.streak.lastActiveDate, today)
        : false;
      return {
        ...prev,
        streak: {
          count: continued ? prev.streak.count + 1 : 1,
          lastActiveDate: todayStr,
        },
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTopic = (id: string) =>
    setState((prev) => ({ ...prev, topics: { ...prev.topics, [id]: !prev.topics[id] } }));

  const toggleLab = (id: string) =>
    setState((prev) => ({ ...prev, labs: { ...prev.labs, [id]: !prev.labs[id] } }));

  const toggleCommand = (id: string) =>
    setState((prev) => ({ ...prev, commands: { ...prev.commands, [id]: !prev.commands[id] } }));

  const addNote = (title: string, body: string, weekId: number | null) =>
    setState((prev) => {
      const note: Note = {
        id: `note-${Date.now()}`,
        title,
        body,
        weekId,
        updatedAt: new Date().toISOString(),
      };
      return { ...prev, notes: [note, ...prev.notes] };
    });

  const updateNote = (id: string, title: string, body: string) =>
    setState((prev) => ({
      ...prev,
      notes: prev.notes.map((n) =>
        n.id === id ? { ...n, title, body, updatedAt: new Date().toISOString() } : n
      ),
    }));

  const deleteNote = (id: string) =>
    setState((prev) => ({ ...prev, notes: prev.notes.filter((n) => n.id !== id) }));

  const setTodayGoal = (goal: string) =>
    setState((prev) => ({ ...prev, todayGoal: goal }));

  const setUdemyCourseInfo = (title: string, url: string) =>
    setState((prev) => ({ ...prev, udemyCourse: { ...prev.udemyCourse, title, url } }));

  const addUdemySection = (title: string) =>
    setState((prev) => ({
      ...prev,
      udemyCourse: {
        ...prev.udemyCourse,
        sections: [
          ...prev.udemyCourse.sections,
          { id: `section-${Date.now()}`, title, lectures: [] },
        ],
      },
    }));

  const renameUdemySection = (sectionId: string, title: string) =>
    setState((prev) => ({
      ...prev,
      udemyCourse: {
        ...prev.udemyCourse,
        sections: prev.udemyCourse.sections.map((s) =>
          s.id === sectionId ? { ...s, title } : s
        ),
      },
    }));

  const deleteUdemySection = (sectionId: string) =>
    setState((prev) => ({
      ...prev,
      udemyCourse: {
        ...prev.udemyCourse,
        sections: prev.udemyCourse.sections.filter((s) => s.id !== sectionId),
      },
    }));

  const addUdemyLecture = (sectionId: string, title: string) =>
    setState((prev) => ({
      ...prev,
      udemyCourse: {
        ...prev.udemyCourse,
        sections: prev.udemyCourse.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                lectures: [
                  ...s.lectures,
                  { id: `lecture-${Date.now()}`, title, completed: false },
                ],
              }
            : s
        ),
      },
    }));

  const deleteUdemyLecture = (sectionId: string, lectureId: string) =>
    setState((prev) => ({
      ...prev,
      udemyCourse: {
        ...prev.udemyCourse,
        sections: prev.udemyCourse.sections.map((s) =>
          s.id === sectionId
            ? { ...s, lectures: s.lectures.filter((l) => l.id !== lectureId) }
            : s
        ),
      },
    }));

  const toggleUdemyLecture = (sectionId: string, lectureId: string) =>
    setState((prev) => ({
      ...prev,
      udemyCourse: {
        ...prev.udemyCourse,
        sections: prev.udemyCourse.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                lectures: s.lectures.map((l) =>
                  l.id === lectureId ? { ...l, completed: !l.completed } : l
                ),
              }
            : s
        ),
      },
    }));

const stats = useMemo(() => {
  const topicsDone = Object.values(state.topics).filter(Boolean).length;
  const labsDone = Object.values(state.labs).filter(Boolean).length;
  const commandsDone = Object.values(state.commands).filter(Boolean).length;
  const topicsTotal = allTopics.length;
  const labsTotal = allLabs.length;
  const commandsTotal = allCommands.length;
  const totalDone = topicsDone + labsDone + commandsDone;
  const totalItems = topicsTotal + labsTotal + commandsTotal;
  const overallPct = totalItems === 0 ? 0 : Math.round((totalDone / totalItems) * 100);

  // ✅ Safe access – fallback to empty array if udemyCourse or sections is missing
  const allLectures = (state.udemyCourse?.sections ?? []).flatMap((s) => s.lectures);
  const udemyDone = allLectures.filter((l) => l.completed).length;
  const udemyTotal = allLectures.length;
  const udemyPct = udemyTotal === 0 ? 0 : Math.round((udemyDone / udemyTotal) * 100);

  return {
    topicsDone,
    topicsTotal,
    labsDone,
    labsTotal,
    commandsDone,
    commandsTotal,
    overallPct,
    udemyDone,
    udemyTotal,
    udemyPct,
  };
}, [state.topics, state.labs, state.commands, state.udemyCourse]);

  const value: ProgressContextValue = {
    state,
    toggleTopic,
    toggleLab,
    toggleCommand,
    addNote,
    updateNote,
    deleteNote,
    setTodayGoal,
    resetProgress: reset,
    setUdemyCourseInfo,
    addUdemySection,
    renameUdemySection,
    deleteUdemySection,
    addUdemyLecture,
    deleteUdemyLecture,
    toggleUdemyLecture,
    stats,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
