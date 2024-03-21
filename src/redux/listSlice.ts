import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    page: 1,
    user: {
      name: "",
      icon: "",
    },
    loginStatus: false,
    token: "",
  },
  reducers: {
    addList: (state, action) => {
      state.list = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    changeLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetListSlice: (state) => {
      state.list = [];
      state.page = 1;
      state.user = { name: "", icon: "" };
      state.loginStatus = false;
      state.token = "";
    },
  },
});

export const {
  addList,
  changePage,
  setUser,
  changeLoginStatus,
  setToken,
  resetListSlice,
} = listSlice.actions;

export default listSlice.reducer;
