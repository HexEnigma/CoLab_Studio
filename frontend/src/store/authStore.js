import { create } from "zustand";

const useAuthStore = create((set) => ({
  // Initial State: No user is logged in
  user: null,
  accessToken: null,
  isAuthenticated: false,

  // Action: Triggered after a successful API login request
  login: (userData, token) =>
    set({
      user: userData,
      accessToken: token,
      isAuthenticated: true,
    }),

  // Action: Clears system memory on logout
  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));

export default useAuthStore;
