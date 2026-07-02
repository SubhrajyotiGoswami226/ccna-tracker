
import { HashRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { ProgressProvider } from "./hooks/useProgress";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import WeekView from "./pages/WeekView";
import Labs from "./pages/Labs";
import Commands from "./pages/Commands";
import UdemyCourse from "./pages/UdemyCourse";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <div className="flex h-screen w-full bg-[#0f1117] text-slate-200">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-y-auto px-8 py-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/roadmap/:weekId" element={<WeekView />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/commands" element={<Commands />} />
                <Route path="/udemy" element={<UdemyCourse />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </HashRouter>
    </ProgressProvider>
  );
}
