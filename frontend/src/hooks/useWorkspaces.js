import { useState, useEffect } from "react";
import api from "../services/api";

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState([]);
  // Default to true so it loads immediately without a flash
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  useEffect(() => {
    // Flag to prevent state updates if the component unmounts before the API replies
    let isMounted = true;

    const fetchWorkspaces = async () => {
      try {
        const response = await api.get("workspaces/");
        if (isMounted) {
          setWorkspaces(response.data);
          setError(""); // Clear any previous errors
        }
      } catch (err) {
        console.error("Workspace fetch error:", err);
        if (isMounted) {
          setError("Failed to load workspaces. Is the Django server running?");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWorkspaces();

    // Cleanup function when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this runs exactly once on mount

  const createWorkspace = async (e) => {
    e.preventDefault();
    if (!newWorkspaceName.trim()) return;

    try {
      setIsCreating(true);
      setError("");
      const response = await api.post("workspaces/", {
        name: newWorkspaceName,
      });
      // Instantly inject the new workspace at the top of the UI list
      setWorkspaces([response.data, ...workspaces]);
      setNewWorkspaceName("");
    } catch (err) {
      console.error("Workspace creation error:", err);
      setError("Failed to create workspace.");
    } finally {
      setIsCreating(false);
    }
  };

  return {
    workspaces,
    isLoading,
    error,
    newWorkspaceName,
    setNewWorkspaceName,
    isCreating,
    createWorkspace,
  };
}
