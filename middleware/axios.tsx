import axios from "axios";
import { Platform } from "react-native";
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an Axios instance
const useAxios = axios.create({
  baseURL: API_URL,
  // headers: {}
  // You can set other default config options here
});

// Add a request interceptor
useAxios.interceptors.request.use(
  async (config: any) => {
    console.log("🚀 ~ config.url:", config.url);
    console.log("🚀 ~ config.method:", config.method);
    const accessToken = await AsyncStorage.getItem("@accessToken");

    // Check if it's a POST request or a specific GET request
    // if (config.method === 'post' || (config.method === 'get' && config.url.includes('/your-special-endpoint'))) {
    if (
      (config.method === "post" && config.url.includes("/sign-in")) ||
      (config.method === "patch" && config.url.includes("/create-user"))
    ) {
      // Add the access token to the headers for POST requests and specific GET requests
      return config;
    } else {
      config.headers.Authorization = `Bearer ${JSON.parse(`${accessToken}`)}`;
      // console.log(config.headers);

      return config;
    }

    // return config;
  },

  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Make a request using the configured Axios instance
// api
//   .get("/some-endpoint")
//   .then((response) => {
//     // Handle the response
//     console.log("Response:", response.data);
//   })
//   .catch((error) => {
//     // Handle the error
//     console.error("Error:", error);
//   });

export default useAxios;
