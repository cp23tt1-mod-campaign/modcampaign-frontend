// import { Dispatch } from "@reduxjs/toolkit";
// import axios from "axios";
// import { actions } from "./campaign.slice";
// import { dispatchAble } from "../dispatchable";
// import { store, useAppDispatch } from "../root.store";

// export type Action = {
//   type: string;
//   payload?: any;
// };

// // export const getStoreCampaignList = dispatchAble(() => {
// export const getStoreCampaignList = async () => {
//   // return async (dispatch: Dispatch<Action>) => {
//   try {
//     const res = await axios.get(
//       "http:localhost:8080/api/campaign?sortBy=asc&status=end"
//     );
//     // console.log(
//     //   "🚀 ~ file: campaign.thunk.ts:17 ~ return ~ res:",
//     //   res.data.data
//     // );
//     store.dispatch(actions["campaign/load"](res.data.data));
//     // dispatch(actions["campaign/load"](res.data.data));
//     return {
//       success: true,
//       data: res.data.data,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       data: error,
//     };
//   }
// };

// // });
