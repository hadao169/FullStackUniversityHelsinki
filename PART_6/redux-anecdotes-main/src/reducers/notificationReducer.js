/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNoti: (state, action) => {
      return action.payload;
    },
    removeNoti: (state, action) => {
      return ``;
    },
  },
});

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNoti(content));
    setTimeout(() => {
      dispatch(removeNoti());
    }, time * 1000);
  };
};

export const { setNoti, removeNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
