import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CampaignState } from "./campaign.entity";
import { API_IOS_URL, API_ANDROID_URL } from "@env";
import { Platform } from "react-native";
// const API_URL = Platform.OS === "ios" ? API_IOS_URL : API_ANDROID_URL;
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
import axios from "axios";
import { RootState } from "../root.store";
import useAxios from "../../middleware/axios";

export const initialState: CampaignState = {
  ownedCampaignList: [],
  popularCampaignList: [],
  latestCampaignList: [],
  joinedCampaignList: [],
  selectedCampaign: {},
  onGoingCampaignList: [],
  completedCampaignList: [],
  campaignCategories: [],
  campaignName: "",
  campaignDetail: "",
  campaignStart: "",
  campaignEnd: "",
  campaignType: null,
  campaignImageUrl: "",
  campaignUserLimit: null,
  campaignCategoryId: null,
  campaignReward: "",
  userId: null,
  campaignImageObject: null,
  userLimitType: "1",
  isConnectThirdParty: false,
  isLoading: false,
};
const defaultState = initialState;

export const getCampaignList = createAsyncThunk(
  "campaign/getCampaignList",
  async (
    filter: { sortBy?: string; listType: string; userId?: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await useAxios.get(`${API_URL}/campaign`, {
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
    }
  }
);
export const getOnGoingCampaignList = createAsyncThunk(
  "campaign/getOnGoingCampaignList",
  async (filter: { userId?: number }, { rejectWithValue }) => {
    try {
      const res = await useAxios.get(`${API_URL}/campaign`, {
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
      const res = await useAxios.get(`${API_URL}/campaign`, {
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
      const res = await useAxios.get(`${API_URL}/campaign/${filter.id}`);
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
      const res = await useAxios.post(`${API_URL}/campaign/join`, body);
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
      const res = await useAxios.delete(`${API_URL}/campaign`, {
        params: { campaignId: campaignId, userId: userId },
      });
      return {
        statusCode: res.status,
        success: true,
        message: res.data.message,
      };
    } catch (error: any) {
      return {
        statusCode: error.response.status,
        success: false,
        message: error.response.data.message,
      };
    }
  }
);
export const uploadCampaignImage = createAsyncThunk(
  "campaign/uploadCampaignImage",
  async (query: { image?: any }, { rejectWithValue }) => {
    const { image } = query.image;

    try {
      const fileUri = image.uri;
      // const fileUri =
      //   Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri;
      const fileName = image.uri.split("/").pop();
      const fileType = fileName?.split(".").pop();

      const imageData = {
        uri: fileUri,
        name: fileName,
        type: `image/${fileType}`,
      };

      const data = new FormData();
      data.append("image", imageData as any);

      const res = await useAxios.post(`${API_URL}/campaign/upload-img`, data, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });
      return {
        statusCode: res.status,
        message: res.data.message,
        data: res.data.fileName,
      };
    } catch (error: any) {
      return {
        statusCode: error.response.status,
        message: error.response.data.message,
      };
    }
  }
);
export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (params: { userId?: any }, { getState, dispatch }) => {
    const { userId } = params;

    try {
      const state = getState() as RootState;
      const { campaign } = state;

      const body = {
        campaignName: campaign.campaignName,
        campaignDetail: campaign.campaignDetail,
        campaignStart: campaign.campaignStart,
        campaignEnd: campaign.campaignEnd,
        campaignType: campaign.campaignType === 1 ? "Individual" : "Group",
        campaignImageUrl: campaign.campaignImageUrl,
        campaignUserLimit:
          campaign.userLimitType === "1" ? null : campaign.campaignUserLimit,
        campaignCategoryId: campaign.campaignCategoryId,
        campaignReward: campaign.campaignReward,
        userId: userId,
        // userId: state.campaign.userId,
      };

      const res = await useAxios.post(`${API_URL}/campaign`, body);
      return {
        statusCode: res.status,
        success: true,
        message: res.data.message,
      };
    } catch (error: any) {
      return {
        statusCode: error.response.status,
        success: false,
        data: error,
        message: error.response.data.message,
      };
    }
  }
);
export const getCampaignCategories = createAsyncThunk(
  "campaign/getCampaignCategories",
  async () => {
    try {
      const res = await useAxios.get(`${API_URL}/campaign-categories`);
      return {
        statusCode: res.status,
        success: true,
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

export const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {
    setDefaultState: (state) => {
      Object.assign(state, defaultState);
    },
    setCreateCampaignDefaultState: (state) => {
      state.campaignName = "";
      state.campaignDetail = "";
      state.campaignStart = "";
      state.campaignEnd = "";
      state.campaignType = null;
      state.campaignImageUrl = "";
      state.campaignUserLimit = null;
      state.campaignCategoryId = null;
      state.campaignReward = "";
      state.userId = null;
      state.campaignImageObject = null;
      state.userLimitType = "1";
    },
    setStateCampaignName: (state, action: PayloadAction<string>) => {
      state.campaignName = action.payload;
    },
    setStateCampaignDescription: (state, action: PayloadAction<string>) => {
      state.campaignDetail = action.payload;
    },
    setStateCampaignStart: (state, action: PayloadAction<string>) => {
      state.campaignStart = action.payload;
    },
    setStateCampaignEnd: (state, action: PayloadAction<string>) => {
      state.campaignEnd = action.payload;
    },
    setStateCampaignType: (state, action: PayloadAction<number>) => {
      state.campaignType = action.payload;
    },
    setStateCampaignImageUrl: (state, action: PayloadAction<string>) => {
      state.campaignImageUrl = action.payload;
    },
    setStateCampaignImageObject: (state, action: PayloadAction<any>) => {
      state.campaignImageObject = action.payload;
    },
    setStateCampaignUserLimit: (state, action: PayloadAction<number>) => {
      state.campaignUserLimit = action.payload;
    },
    setStateCampaignCategory: (state, action: PayloadAction<number>) => {
      state.campaignCategoryId = action.payload;
    },
    setStateCampaignReward: (state, action: PayloadAction<string>) => {
      state.campaignReward = action.payload;
    },
    setStateCampaignUserOwner: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    setStateCampaignUserLimitType: (state, action: PayloadAction<string>) => {
      state.userLimitType = action.payload;
    },
    setConnectThirdParty: (state, action: PayloadAction<boolean>) => {
      state.isConnectThirdParty = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
    builder.addCase(getCampaignCategories.fulfilled, (state, action) => {
      state.campaignCategories = action.payload?.data;
    });
    builder.addCase(getCampaignCategories.rejected, (state, action) => {
      state.campaignCategories = [];
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
export const {
  setDefaultState,
  setCreateCampaignDefaultState,
  setStateCampaignCategory,
  setStateCampaignDescription,
  setStateCampaignEnd,
  setStateCampaignImageUrl,
  setStateCampaignName,
  setStateCampaignReward,
  setStateCampaignStart,
  setStateCampaignType,
  setStateCampaignUserLimit,
  setStateCampaignUserOwner,
  setStateCampaignImageObject,
  setStateCampaignUserLimitType,
  setConnectThirdParty,
  setLoading,
} = campaignSlice.actions;

// export const { actions, reducer } = campaignSlice;
