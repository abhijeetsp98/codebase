import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Candidate from "./scenes/candidate";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import CandidateForm from "./scenes/candidateForm";
import OnboardingTask from "./scenes/onboardingTask";
import NewHireManagement from "./scenes/newHireManagement";
import TempStaffing from "./scenes/tempStaffing";
import SourcePage from "./scenes/sourcePage"
import Forum from "./scenes/forum";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Client from "./scenes/client";
import ClientForm from "./scenes/clientForm";
import Requirement from "./scenes/requirement"
import RequirementForm from "./scenes/requirementForm";
import Lead from "./scenes/lead";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/client" element={<Client />} />
              <Route path="/lead" element={<Lead />} />
              <Route path="/clientForm" element={<ClientForm />} />
              <Route path="/candidate" element={<Candidate />} />
              <Route path="/candidateForm" element={<CandidateForm />} />
              <Route path="/onboardingTask" element={<OnboardingTask />} />
              <Route path="/newHireManagement" element={<NewHireManagement />} />
              <Route path="/tempStaffing" element={<TempStaffing />} />
              <Route path="/sourcePage" element={<SourcePage />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/requirement" element={<Requirement />} />
              <Route path="/requirementForm" element={<RequirementForm />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
