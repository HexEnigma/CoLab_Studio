import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Root Route */}
        <Route path="/" element={<Landing />} />

        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Area */}
        <Route path="/workspace" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
