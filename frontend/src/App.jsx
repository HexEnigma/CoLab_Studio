import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import WorkspaceEditor from "./pages/WorkspaceEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Root Route */}
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Workspace Routes */}
        <Route path="/workspace" element={<Dashboard />} />

        {/* The :slug is a variable that React Router will capture */}
        <Route path="/workspace/:slug" element={<WorkspaceEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
