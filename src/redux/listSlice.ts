import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    page: 1,
  },
  reducers: {
    addList: (state, action) => {
      state.list = state.list.concat(action.payload);
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { addList, changePage } = listSlice.actions;

export default listSlice.reducer;
