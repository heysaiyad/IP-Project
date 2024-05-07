import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  auth: false,
  adminData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.auth = true),
        (state.adminData = action.payload),
        localStorage.setItem("authStatus", JSON.stringify(state));
    },
    logout: (state) => {
      (state.auth = false),
        (state.adminData = null),
        localStorage.removeItem("authStatus");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
