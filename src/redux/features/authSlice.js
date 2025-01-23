import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token:localStorage.getItem("token") || "",
  role:localStorage.getItem("role") || "",
  userid:localStorage.getItem("userid") || "",
}
const authSlice=createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.userid = action.payload.userid;
    },
    logout: (state) => {
      state.token = "";
      state.role = "";
      state.userid = "";
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userid");
    }
  }
})

export default authSlice.reducer;
export const { logout,setAuth } = authSlice.actions;