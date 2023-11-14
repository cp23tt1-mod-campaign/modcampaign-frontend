import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampaignState } from "./campaign.entity";
import { API_URL } from "@env";
import axios from "axios";

export const initialState: CampaignState = {
  latestCampaignList: [],
  popularCampaignList: [],
  joinedCampaignList: [],
  selectedCampaign: null,
};
const defaultState = initialState;

export const getCampaignList = createAsyncThunk(
  "campaign/getCampaignList",
  async (filter: { sortBy?: string; listType: string; userId?: number }) => {
    try {
      const res = await axios.get(`${API_URL}/campaign`, {
        params: {
          sortBy: filter.sortBy || null,
          listType: filter.listType,
          userId: filter.userId || null,
        },
      });
      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const getCampaignDetail = createAsyncThunk(
  "campaign/getCampaignDetail",
  async (filter: { id: number }) => {
    try {
      const res = await axios.get(`${API_URL}/campaign/${filter.id}`);
      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
);

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setDefaultState: (state) => {
      Object.assign(state, defaultState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCampaignList.fulfilled, (state, action) => {
      if (action.meta.arg.listType === "latest") {
        state.latestCampaignList = action.payload.data;
      }
      // else
      if (action.meta.arg.listType === "popular") {
        state.popularCampaignList = action.payload.data;
      }

      if (action.meta.arg.listType === "joined") {
        state.joinedCampaignList = action.payload.data;
      }
    });
    builder.addCase(getCampaignDetail.fulfilled, (state, action) => {
      state.selectedCampaign = action.payload.data[0];
    });
  },
});

export default campaignSlice.reducer;
export const { setDefaultState } = campaignSlice.actions;

// export const { actions, reducer } = campaignSlice;
