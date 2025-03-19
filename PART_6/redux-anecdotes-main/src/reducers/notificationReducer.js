/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    voteNoti: (state, action) => {
      console.log(action.payload);
      return `You voted "${action.payload}"`;
    },
    addNoti: (state, action) => {
      console.log(action.payload);
      return `You added "${action.payload}"`;
    },
    removeNoti: (state, action) => {
      return ``;
    },
  },
});

export const { voteNoti, addNoti, removeNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
