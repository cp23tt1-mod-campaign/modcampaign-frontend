import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampaignState } from "./campaign.entity";
import { API_IOS_URL, API_ANDROID_URL } from "@env";
import { Platform } from "react-native";
// const API_URL = Platform.OS === "ios" ? API_IOS_URL : API_ANDROID_URL;
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
import axios from "axios";

export const initialState: CampaignState = {
  ownedCampaignList: [],
  popularCampaignList: [],
  latestCampaignList: [],
  joinedCampaignList: [],
  selectedCampaign: {},
  onGoingCampaignList: [],
  completedCampaignList: [],
  name: "",
  description: "",
  start: new Date(),
  end: new Date(),
  type: "",
  image: "",
  reward: "",
  userLimit: 0,
  category: "",
  categoryTarget: "",
  userOwner: 0,
};
const defaultState = initialState;

export const getCampaignList = createAsyncThunk(
  "campaign/getCampaignList",
  async (
    filter: { sortBy?: string; listType: string; userId?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(`${API_URL}/campaign`, {
        params: {
          sortBy: filter.sortBy || null,
          listType: filter.listType,
          userId: filter.userId || null,
        },
      });
      return {
        statusCode: res.status,
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
    }
  }
);
export const getOnGoingCampaignList = createAsyncThunk(
  "campaign/getOnGoingCampaignList",
  async (filter: { userId?: number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/campaign`, {
        params: {
          status: "ongoing",
          userId: filter.userId || null,
        },
      });

      return {
        statusCode: res.status,
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
    }
  }
);
export const getCompletedCampaignList = createAsyncThunk(
  "campaign/getCompletedCampaignList",
  async (filter: { userId?: number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/campaign`, {
        params: {
          status: "ended",
          userId: filter.userId || null,
        },
      });

      return {
        statusCode: res.status,
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
    }
  }
);
export const getCampaignDetail = createAsyncThunk(
  "campaign/getCampaignDetail",
  async (filter: { id: number }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/campaign/${filter.id}`);
      // return res.data;

      return {
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
    }
  }
);
export const joinCampaign = createAsyncThunk(
  "campaign/joinCampaign",
  async (
    query: { campaignId?: number; userId?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { campaignId, userId } = query;
      const body = { campaignId, userId };
      const res = await axios.post(`${API_URL}/campaign/join`, body);
      return {
        statusCode: res.status,
        success: true,
        message: res.data.message,
      };
    } catch (error: any) {
      // console.log(error);

      // rejectWithValue(error);
      return {
        statusCode: error.response.status,
        success: false,
        message: error.response.data.message,
      };
    }
  }
);
export const cancelCampaign = createAsyncThunk(
  "campaign/cancelCampaign",
  async (
    query: { campaignId?: number; userId?: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const { campaignId, userId } = query;
      // const body = { campaignId, userId };
      const res = await axios.delete(`${API_URL}/campaign`, {
        params: { campaignId: campaignId, userId: userId },
      });
      return {
        statusCode: res.status,
        success: true,
        message: res.data.message,
      };
    } catch (error: any) {
      // console.log(error);

      // rejectWithValue(error);
      return {
        statusCode: error.response.status,
        success: false,
        message: error.response.data.message,
      };
    }
  }
);

export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (
    query: {
      name?: string;
      description?: string;
      start?: Date;
      end?: Date;
      type?: string;
      image?: string;
      reward?: string;
      userLimit?: number;
      category?: string;
      categoryTarget?: string;
      userOwner?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const {
        name,
        description,
        start,
        end,
        type,
        image,
        reward,
        userLimit,
        category,
        categoryTarget,
        userOwner,
      } = query;
      const body = {
        name,
        description,
        start,
        end,
        type,
        image,
        reward,
        userLimit,
        category,
        categoryTarget,
        userOwner,
      };
      const res = await axios.post(`${API_URL}/campaign`, body);
      res.status;
      return {
        statusCode: res.status,
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
    }
  }
);
export const uploadCampaignImage = createAsyncThunk(
  "campaign/uploadCampaignImage",
  async (query: { image?: string }, { rejectWithValue }) => {
    try {
      // const data = new FormData()
      //   data.append('image', file)
      //   let boundary = '--------------------------'
      //   for (let i = 0; i < 24; i += 1) {
      //     boundary += Math.floor(Math.random() * 10).toString(16)
      //   }
      //   const response = await this.$axios.$post('/register/user/app/upload-logo', data, {
      //     headers: {
      //       'Content-Type': `multipart/form-data; boundary=${boundary}`
      //     }
      //   })
      const { image } = query;
      const body = { image };
      const res = await axios.post(`${API_URL}/campaign/upload-img`, body);
      res.status;
      return {
        statusCode: res.status,
        success: true,
        data: res.data.data,
      };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
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
      if (action.payload?.statusCode === 200) {
        if (action.meta.arg.listType === "latest") {
          state.latestCampaignList = action.payload?.data;
        }

        if (action.meta.arg.listType === "popular") {
          state.popularCampaignList = action.payload?.data;
        }

        if (action.meta.arg.listType === "joined") {
          state.joinedCampaignList = action.payload?.data;
        }
        if (action.meta.arg.listType === "owned") {
          state.ownedCampaignList = action.payload?.data;
        }
      } else {
        if (action.meta.arg.listType === "latest") {
          state.latestCampaignList = [];
        }
        if (action.meta.arg.listType === "popular") {
          state.popularCampaignList = [];
        }

        if (action.meta.arg.listType === "joined") {
          state.joinedCampaignList = [];
        }
        if (action.meta.arg.listType === "owned") {
          state.ownedCampaignList = [];
        }
      }
    });
    builder.addCase(getCampaignList.rejected, (state, action) => {
      if (action.meta.arg.listType === "latest") {
        state.latestCampaignList = [];
      }
      // else
      if (action.meta.arg.listType === "popular") {
        state.popularCampaignList = [];
      }

      if (action.meta.arg.listType === "joined") {
        state.joinedCampaignList = [];
      }
      if (action.meta.arg.listType === "owned") {
        state.ownedCampaignList = [];
      }
    });
    builder.addCase(getCampaignDetail.fulfilled, (state, action) => {
      state.selectedCampaign = action.payload?.data;
    });
    builder.addCase(getCampaignDetail.rejected, (state, action) => {
      state.selectedCampaign = {};
    });
    builder.addCase(getOnGoingCampaignList.fulfilled, (state, action) => {
      state.onGoingCampaignList = action.payload?.data;
    });
    builder.addCase(getOnGoingCampaignList.rejected, (state, action) => {
      state.onGoingCampaignList = [];
    });
    builder.addCase(getCompletedCampaignList.fulfilled, (state, action) => {
      state.completedCampaignList = action.payload?.data;
    });
    builder.addCase(getCompletedCampaignList.rejected, (state, action) => {
      state.completedCampaignList = [];
    });
    // builder.addCase(joinCampaign.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     action: action,
    //     success: true,
    //   };
    // });
    // builder.addCase(joinCampaign.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     action: action,
    //     success: false,
    //   };
    // });
  },
});

export default campaignSlice.reducer;
export const { setDefaultState } = campaignSlice.actions;

// export const { actions, reducer } = campaignSlice;
