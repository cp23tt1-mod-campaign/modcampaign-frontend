import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DiscoverState } from "./discover.entity";
import { Platform } from "react-native";
// const API_URL = Platform.OS === "ios" ? API_IOS_URL : API_ANDROID_URL;
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
import axios from "axios";
import { RootState } from "../root.store";
import useAxios from "../../middleware/axios";

export const initialState: DiscoverState = {
  discoverList: [],
};
const defaultState = initialState;

export const getDiscoverList = createAsyncThunk(
  "user/getDiscoverList",
  async (params, { getState, dispatch }) => {
    // const state = getState() as RootState;
    // const { userProfile } = state.user;
    try {
      const res = await useAxios.get(`${API_URL}/discover`);
      return {
        statusCode: res.status,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (error: any) {
      return {
        statusCode: error.response.status,
        success: false,
        data: error,
      };
    }
  }
);
export const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setDefaultState: (state) => {
      Object.assign(state, defaultState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDiscoverList.fulfilled, (state, action) => {
      state.discoverList = action.payload.data;
    });
  },
});

export default discoverSlice.reducer;
export const { setDefaultState } = discoverSlice.actions;

// export const { actions, reducer } = campaignSlice;
