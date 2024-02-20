// import { campaignActions, campaignReducer } from "./campaign";
import { configureStore } from "@reduxjs/toolkit";
import { campaignSlice } from "./campaign/campaign.slice";
import { userSlice } from "./user/user.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { TypedUseSelectorHook, useSelector } from "react-redux";

// export const actions = {
//   campaign: campaignActions,
// };

// const reducers = {
//   campaign: campaignReducer,
// };

export const store = configureStore({
  // reducer: reducers,
  reducer: {
    campaign: campaignSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
// enhancers: [],
// });
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
// export type useAppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
