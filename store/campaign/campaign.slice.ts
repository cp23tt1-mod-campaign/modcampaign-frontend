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
      const res = await axios.delete(`${API_URL}/campaign`, {
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
    const { image } = query;

    try {
      // console.log("🚀 ~ file: campaign.slice.ts:186 ~ image:", image);
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
      // console.log(imageData);

      const data = new FormData();
      data.append("image", imageData as any);
      // data.append("image", query.image);
      // let boundary = "--------------------------";
      // // for (let i = 0; i < 24; i += 1) {
      // //   boundary += Math.floor(Math.random() * 10).toString(16)
      // // }
      const response = await axios.post(
        `${API_URL}/campaign/upload-img`,
        data,
        {
          headers: {
            "Content-Type": `multipart/form-data;`,
          },
        }
      );
      console.log(
        "🚀 ~ file: campaign.slice.ts:218 ~  response:",
        response.data
      );

      // const { image } = query;
      // const body = { image };
      // const res = await axios.post(`${API_URL}/campaign/upload-img`, body);
      // res.status;
      // return {
      //   statusCode: res.status,
      //   success: true,
      //   data: res.data.data,
      // };
    } catch (error) {
      rejectWithValue(error);
      // return {
      //   success: false,
      //   data: error,
      // };
    }
  }
);
export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (params: { userId?: any }, { getState, dispatch }) => {
    const state = getState() as any;
    const { userId } = params;

    // const resUpload = await dispatch(uploadCampaignImage({image: state.campaign.campaignImageObject}))
    // console.log(resUpload);
    // dispatch(setStateCampaignImageUrl(resUpload))

    try {
      console.log(state.campaign.campaignType);

      const body = {
        campaignName: state.campaign.campaignName,
        campaignDetail: state.campaign.campaignDetail,
        campaignStart: state.campaign.campaignStart,
        campaignEnd: state.campaign.campaignEnd,
        campaignType:
          state.campaign.campaignType === 1 ? "Individual" : "Group",
        // campaignImageUrl: state.campaign.campaignImageUrl,
        campaignImageUrl: "1lfralmU5KOISUraCbcznPfF1EtvdtZTT",
        campaignUserLimit:
          state.campaign.userLimitType === "1"
            ? null
            : state.campaign.campaignUserLimit,
        campaignCategoryId: state.campaign.campaignCategoryId,
        campaignReward: state.campaign.campaignReward,
        userId: userId,
        // userId: state.campaign.userId,
      };
      console.log(body);

      const res = await axios.post(`${API_URL}/campaign`, body);
      return {
        statusCode: res.status,
        success: true,
        data: res.data.data,
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
      const res = await axios.get(`${API_URL}/campaign-categories`);
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
    setStateCampaignName: (state, action: PayloadAction<string>) => {
      console.log("🚀 ~ file: campaign.slice.ts:186 ~ action:", action);
      console.log(
        "🚀 ~ file: campaign.slice.ts:186 ~ state:",
        state.campaignName
      );

      state.campaignName = action.payload;
      console.log(
        "🚀 ~ file: campaign.slice.ts:186 ~ state:",
        state.campaignName
      );
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
} = campaignSlice.actions;

// export const { actions, reducer } = campaignSlice;
