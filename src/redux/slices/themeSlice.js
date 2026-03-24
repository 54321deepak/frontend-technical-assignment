import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});
export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
