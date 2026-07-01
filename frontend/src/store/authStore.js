import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // Initial State
      user: null,
      accessToken: null,
      isAuthenticated: false,

      // Actions
      login: (userData, token) =>
        set({
          user: userData,
          accessToken: token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      // The unique name for this data inside the browser's Local Storage
      name: "colab-auth-storage",
    },
  ),
);

export default useAuthStore;
