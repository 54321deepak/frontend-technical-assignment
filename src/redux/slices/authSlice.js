import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  registeredUsers: JSON.parse(localStorage.getItem("registered_users")) || [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    signup: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Also add to registered users list for mock persistence
      const newUser = action.payload;
      if (!state.registeredUsers.find(u => u.email === newUser.email)) {
        state.registeredUsers.push(newUser);
        localStorage.setItem("registered_users", JSON.stringify(state.registeredUsers));
      }
      localStorage.setItem("user", JSON.stringify(newUser));
    },
  },
});
export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
