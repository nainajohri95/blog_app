import create from "zustand";

const useAuthStore = create((set) => ({
  user: null, // Initially, the user is not authenticated
  setUser: (user) => set({ user }), // Update the user state
  clearUser: () => set({ user: null }), // Clear the user state
}));

export default useAuthStore;
