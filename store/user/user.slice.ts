import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DietaryEntity, UserEntity, UserState } from "./user.entity";
import { API_IOS_URL, API_ANDROID_URL } from "@env";
import { Platform } from "react-native";
// const API_URL = Platform.OS === "ios" ? API_IOS_URL : API_ANDROID_URL;
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
import axios from "axios";
import { RootState } from "../root.store";
import useAxios from "../../middleware/axios";

export const initialState: UserState = {
  userProfile: {
    // userId: 1,
    // firstName: "Jirasin",
    // lastName: "Chatbanyong",
    // email: "jirasin4826@gmail.com",
    // profileImage: "ACg8ocJIph1BSeoMu91LOcZYoPv1SgWPehzSWiB_6ch03iiGfXez=s96-c",
    // gender: "male",
    // age: 21,
    // height: 165,
    // weight: 56,
    // activityLevel: 2,
    // bmr: 1515,
    userId: null,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    profileImage: "",
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    activityLevel: 0,
    bmr: 0,
    role: "",
  },
  dietary: {
    food: {
      calories: 0,
      carb: 0,
      protien: 0,
      fat: 0,
    },
    exercise: {
      cal: 0,
    },
    water: {
      lit: 0,
    },
  },
  remainCalories: 0,
  clonedUserProfile: {},
  stepsValue: "",
  userList: [],
};
const defaultState = initialState;

export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (params: { email: string }, { rejectWithValue }) => {
    console.log("🚀 ~ email:", params.email);

    const body = {
      email: params.email,
    };
    try {
      // const res = await useAxios.post(`${API_URL}/sign-in`, body);
      const res = await useAxios.post("/sign-in", body);
      return {
        statusCode: res.status,
        message: res.data.message,
        status: res.data.status,
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
export const signUpWithGoogle = createAsyncThunk(
  "user/signUpWithGoogle",
  async (params, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { userProfile } = state.user;
    const body = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      displayName: userProfile.displayName,
      email: userProfile.email,
      profileImage: userProfile.profileImage,
      gender: userProfile.gender,
      age: userProfile.age,
      height: userProfile.height,
      weight: userProfile.weight,
      activityLevel: userProfile.activityLevel,
      bmr: userProfile.bmr,
    };
    try {
      const res = await useAxios.post("/create-user", body);
      return {
        statusCode: res.status,
        message: res.data.message,
        status: res.data.status,
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
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (
    params: {
      firstName?: any;
      lastName?: any;
      displayName?: any;
      gender?: any;
      age?: any;
      height?: any;
      weight?: any;
      activityLevel?: any;
    },
    { getState, dispatch }
  ) => {
    console.log(params);

    const state = getState() as RootState;
    const { userProfile } = state.user;
    const {
      firstName,
      lastName,
      displayName,
      gender,
      age,
      height,
      weight,
      activityLevel,
    } = params;
    const body = {
      firstName,
      lastName,
      displayName,
      gender,
      age,
      height,
      weight,
      activityLevel,
    };

    try {
      const res: any = await useAxios.patch(
        `/user/${userProfile.userId}`,
        body
      );

      return {
        statusCode: res.status,
        message: res.data.message,
        status: res.data.status,
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
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (params, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { userProfile } = state.user;
    try {
      const res = await useAxios.get(`/user/${userProfile.userId}`);
      return {
        statusCode: res.status,
        message: res.data.message,
        status: res.data.status,
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
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async (
    params: { userId?: Number; roleUpdate?: String },
    { getState, dispatch }
  ) => {
    const { userId, roleUpdate } = params;
    const body = {
      role: roleUpdate,
    };
    try {
      const res = await useAxios.patch(`/user-role/${userId}`, body);
      return {
        statusCode: res.status,
        message: res.data.message,
        status: res.data.status,
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
export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (params, { getState, dispatch }) => {
    // const state = getState() as RootState;
    // const { userProfile } = state.user;
    try {
      const res = await useAxios.get(`/users`);
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
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDefaultState: (state) => {
      Object.assign(state, defaultState);
    },
    setUserProfile: (state, action: PayloadAction<UserEntity>) => {
      state.userProfile = action.payload;
    },

    setUserFirstName: (state, action: PayloadAction<string>) => {
      state.userProfile.firstName = action.payload;
    },
    setUserLastName: (state, action: PayloadAction<string>) => {
      state.userProfile.lastName = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userProfile.email = action.payload;
    },
    setUserDisplayName: (state, action: PayloadAction<string>) => {
      state.userProfile.displayName = action.payload;
    },
    setUserProfileImage: (state, action: PayloadAction<string>) => {
      state.userProfile.profileImage = action.payload;
    },
    setUserGender: (state, action: PayloadAction<string>) => {
      state.userProfile.gender = action.payload;
    },
    setUserAge: (state, action: PayloadAction<number>) => {
      state.userProfile.age = action.payload;
    },
    setUserHeight: (state, action: PayloadAction<number>) => {
      state.userProfile.height = action.payload;
    },
    setUserWeight: (state, action: PayloadAction<number>) => {
      state.userProfile.weight = action.payload;
    },
    setUserActivityLevel: (state, action: PayloadAction<number>) => {
      state.userProfile.activityLevel = action.payload;
    },
    setUserBMR: (state, action: PayloadAction<number>) => {
      state.userProfile.bmr = action.payload;
    },
    setDietary: (state, action: PayloadAction<DietaryEntity>) => {
      state.dietary = action.payload;
    },
    setFoodCarb: (state, action: PayloadAction<number>) => {
      state.dietary.food.carb = action.payload;
    },
    setFoodProtien: (state, action: PayloadAction<number>) => {
      state.dietary.food.protien = action.payload;
    },
    setFoodFat: (state, action: PayloadAction<number>) => {
      state.dietary.food.fat = action.payload;
    },
    setFoodCalories: (state, action: PayloadAction<number>) => {
      state.dietary.food.calories = action.payload;
    },
    setExerciseCal: (state, action: PayloadAction<number>) => {
      state.dietary.exercise.cal = action.payload;
    },
    setWaterLit: (state, action: PayloadAction<number>) => {
      state.dietary.water.lit = action.payload;
    },
    setRemainCalories: (state, action: PayloadAction<number>) => {
      state.remainCalories = action.payload;
    },
    setCloneUserProfile: (state, action: PayloadAction<any>) => {
      state.clonedUserProfile = action.payload;
    },
    setStepsValue: (state, action: PayloadAction<string>) => {
      state.stepsValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      // state.userProfile = action.payload.data;
      // console.log(state.userProfile);
      // console.log(
      //   "🚀 ~ builder.addCase ~ action.payload.data:",
      //   action.payload.data
      // );
      // state.userProfile.activityLevel = action.payload.data.activityLevel;
      // state.userProfile.age = action.payload.data.age;
      // state.userProfile.bmr = action.payload.data.bmr;
      // state.userProfile.email = action.payload.data.email;
      // state.userProfile.firstName = action.payload.data.firstName;
      // state.userProfile.bmr = action.payload.data.bmr;
      // state.userProfile.lastName = action.payload.data.lastName;
      // state.userProfile.gender = action.payload.data.gender;
      // state.userProfile.height = action.payload.data.height;
      // state.userProfile.profileImage = action.payload.data.profileImage;
      // state.userProfile.weight = action.payload.data.weight;
      // state.userProfile.userId = action.payload.data.userId;
      // state.userProfile = action.payload.data;
      // if (action.payload?.statusCode === 200) {
      // if (action.meta.arg.listType === "latest") {
      //   state.latestCampaignList = action.payload?.data;
      // }
      // if (action.meta.arg.listType === "popular") {
      //   state.popularCampaignList = action.payload?.data;
      // }
      // if (action.meta.arg.listType === "joined") {
      //   state.joinedCampaignList = action.payload?.data;
      // }
      // if (action.meta.arg.listType === "owned") {
      //   state.ownedCampaignList = action.payload?.data;
      // }
      // } else {
      //   if (action.meta.arg.listType === "latest") {
      //     state.latestCampaignList = [];
      //   }
      //   if (action.meta.arg.listType === "popular") {
      //     state.popularCampaignList = [];
      //   }
      //   if (action.meta.arg.listType === "joined") {
      //     state.joinedCampaignList = [];
      //   }
      //   if (action.meta.arg.listType === "owned") {
      //     state.ownedCampaignList = [];
      //   }
      // }
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.userList = action.payload.data;
    });
  },
});

export default userSlice.reducer;
export const {
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserProfileImage,
  setDefaultState,
  setUserDisplayName,
  setUserProfile,
  setUserGender,
  setUserAge,
  setUserHeight,
  setUserWeight,
  setUserActivityLevel,
  setUserBMR,
  setDietary,
  setExerciseCal,
  setFoodCarb,
  setFoodFat,
  setFoodCalories,
  setFoodProtien,
  setWaterLit,
  setRemainCalories,
  setCloneUserProfile,
  setStepsValue,
} = userSlice.actions;

// export const { actions, reducer } = campaignSlice;
