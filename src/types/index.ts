export interface Topic {
  id: string;
  title: string;
  category: string;
}

export interface Week {
  id: number;
  title: string;
  theme: string;
  topics: Topic[];
}

export interface Lab {
  id: string;
  title: string;
  tool: "Packet Tracer" | "GNS3";
  category: string;
  weekId: number;
}

export interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  weekId: number | null;
  updatedAt: string;
}

export interface UdemyLecture {
  id: string;
  title: string;
  completed: boolean;
}

export interface UdemySection {
  id: string;
  title: string;
  lectures: UdemyLecture[];
}

export interface UdemyCourse {
  title: string;
  url: string;
  sections: UdemySection[];
}

export interface ProgressState {
  topics: Record<string, boolean>;
  labs: Record<string, boolean>;
  commands: Record<string, boolean>;
  notes: Note[];
  streak: {
    count: number;
    lastActiveDate: string | null;
  };
  todayGoal: string;
  udemyCourse: UdemyCourse;
}
