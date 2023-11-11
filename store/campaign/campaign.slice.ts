import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampaignState } from "./campaign.entity";
import { API_URL } from "@env";
import axios from "axios";

export const initialState: CampaignState = {
  campaignList: [],
  selectedCampaign: null,
};

export const getCampaignList = createAsyncThunk(
  "campaign/fetchCampaignList",
  async () => {
    try {
      const res = await axios.get(
        `http:localhost:8080/api/campaign?sortBy=asc&status=end`
      );
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
  async (id: number = 3) => {
    try {
      const res = await axios.get(`${API_URL}/campaign/${id}`);
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
    setCampaignList: (state, action: PayloadAction<CampaignState>) => {
      state.campaignList = action.payload.campaignList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCampaignList.fulfilled, (state, action) => {
      state.campaignList = action.payload.data;
    });
    builder.addCase(getCampaignDetail.fulfilled, (state, action) => {
      state.selectedCampaign = action.payload.data[0];
    });
  },
});

export default campaignSlice.reducer;
export const { setCampaignList } = campaignSlice.actions;

// export const { actions, reducer } = campaignSlice;
