import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SetupBasics from "./pages/setup/SetupBasics";
import SetupGoals from "./pages/setup/SetupGoals";
import SetupHealth from "./pages/setup/SetupHealth";
import SetupPreferences from "./pages/setup/SetupPreferences";
import Home from "./pages/Home";
import QuickStart from "./pages/QuickStart";
import Session from "./pages/Session";
import SessionSummary from "./pages/SessionSummary";
import Meditation from "./pages/Meditation";
import Routines from "./pages/Routines";
import Progress from "./pages/Progress";
import Diet from "./pages/Diet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/setup/basics" element={<SetupBasics />} />
          <Route path="/setup/goals" element={<SetupGoals />} />
          <Route path="/setup/health" element={<SetupHealth />} />
          <Route path="/setup/preferences" element={<SetupPreferences />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/session" element={<Session />} />
          <Route path="/session-summary" element={<SessionSummary />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
