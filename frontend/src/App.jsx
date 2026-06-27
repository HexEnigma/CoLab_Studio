import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Root Route */}
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Area Placeholder for Milestone 3 */}
        <Route
          path="/workspace"
          element={
            <div className="text-white p-10 flex flex-col justify-center items-center min-h-screen bg-[#0a0a0a]">
              <h1 className="text-3xl font-bold mb-4">Workspace Dashboard</h1>
              <p className="text-zinc-400">
                Authentication successful! Your JWT Token is safely stored in
                memory.
              </p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
