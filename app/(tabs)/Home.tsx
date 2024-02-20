import {
  Image,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// 909091026524-hfug873n546rsbnk5qjpa507iesl3llh.apps.googleusercontent.com
// import * as Google from "expo-google-app-auth";
import CircularProgress from "react-native-circular-progress-indicator";

import AsyncStorage from "@react-native-async-storage/async-storage";

import EditScreenInfo from "../../components/EditScreenInfo";
// import { Text, View } from '../../components/Themed';
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
  HealthUnit,
} from "react-native-health";
import { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import UtilIcon from "../../Util/Icon";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  setFoodCalories,
  setRemainCalories,
  setStepsValue,
} from "../../store/user/user.slice";
import { initialize, readRecords } from "react-native-health-connect";
import dayjs from "dayjs";
import { setConnectThirdParty } from "../../store/campaign/campaign.slice";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";
import { ScrollView } from "react-native";

const permission: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.Workout,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
    write: [],
  },
};
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
// const env = process.env;
export default function Home() {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [color, setColor] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    // dispatch(setLoading(true));
    setRefreshing(true);
  }, []);
  // const [calValue, setCalValue] = useState(350);
  // const [maxCalValue, setMaxCalValue] = useState(0);
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const dietaryData = useAppSelector((state) => state.user.dietary);
  const userState = useAppSelector((state) => state.user);
  const isConnectedThirdParty = useAppSelector(
    (state) => state.campaign.isConnectThirdParty
  );

  // useEffect(() => {
  //   const init = async () => {
  //     const dietaryData = await AsyncStorage.getItem("@dietaryData");
  //     console.log(dietaryData);
  //   };
  //   init();
  // }, [dispatch]);

  // useEffect(() => {
  //   setMaxCalValue(userProfile.bmr);
  //   console.log(userProfile.bmr);

  //   // const init = async () => {
  //   //   const
  //   // };
  // });
  // const [hasPermissions, setHasPermissions] = useState(false);
  // const [steps, setSteps] = useState(0);
  // const [distance, setDistance] = useState(0);

  // AppleHealthKit.isAvailable((err: any, available: any) => {});
  // useEffect(() => {
  //   AppleHealthKit.initHealthKit(permission, (err: any) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     setHasPermissions(true);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!hasPermissions) {
  //     return;
  //   }
  //   const options:HealthInputOptions = {
  //     startDate: new Date(
  //       new Date().setDate(new Date().getDate() - 1)
  //     ).toISOString(),
  //     endDate: new Date().toISOString(),
  //     includeManuallyAdded: true,
  //     // unit: HealthUnit.meter
  //   };
  //   AppleHealthKit.getStepCount(options, (err: any, results: any) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(results);
  //     setSteps(results.value);
  //   });
  //   AppleHealthKit.getDistanceWalkingRunning(
  //     options,
  //     (err: any, results: any) => {
  //       if (err) {
  //         console.log(err);
  //         return;
  //       }
  //       console.log(results);
  //       setDistance(results.value);
  //     }
  //   );
  //   // AppleHealthKit.getWorkoutRouteSamples({id:'123'}, (err: any, results: any) => {
  //   //   if (err) {
  //   //     console.log(err);
  //   //     return
  //   //   }
  //   //   console.log(results);
  //   // }
  //   // )
  // }, [hasPermissions]);
  // const [progress, setProgress] = useState(0);
  // const [color, setColor] = useState("#4CAF50"); // Default green for remaining
  // const [remainingCal, setRemainingCal] = useState(0);
  // const calculateProgress = () => {
  //   setRemainingCal(
  //     userProfile.bmr + (dietaryData.exercise.cal - dietaryData.food.calories)
  //   );
  //   // const remainingCal = userProfile.bmr + (dietaryData.exercise.cal - dietaryData.food.calories);
  //   const progressPercentage = Math.min(
  //     Math.max((remainingCal / userProfile.bmr) * 100, 0),
  //     100
  //   ); // Ensure progress stays within 0-100%
  //   setProgress(progressPercentage);
  //   setColor(progress < 100 ? "#4CAF50" : "#F44336"); // Green for remaining, red for overeaten
  // };

  // useEffect(() => {
  //   calculateProgress();
  // }, [userProfile.bmr, dietaryData.exercise.cal, dietaryData.food.calories]);

  const getStepValue = async () => {
    // if (isConnectedThirdParty) {
    // console.log(selectedCampaign.categoryTarget);
    console.log(isConnectedThirdParty);

    const isInitialized = await initialize();
    console.log("isInitialized", isInitialized);

    if (!isInitialized) {
      dispatch(setConnectThirdParty(false));
      return;
    } else {
      dispatch(setConnectThirdParty(true));
    }

    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    // console.log(yesterday.toISOString);
    // console.log(today.toISOString());

    const timeRangeFilter: TimeRangeFilter = {
      operator: "between",
      startTime: yesterday.toISOString(),
      endTime: today.toISOString(),
    };

    // // Steps
    const steps = await readRecords("Steps", { timeRangeFilter });
    const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
    // console.log(
    //   "🚀 ~ getStepValue ~ totalSteps:",
    //   `${totalSteps.toLocaleString("en-US", {          maximumFractionDigits: 0,})("en-US")}`
    // );
    dispatch(
      setStepsValue(
        `${totalSteps.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      )
    );

    // const date = new Date();
    // console.log(date);
    // // dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS")
    // const nextDay = new Date(date);
    // nextDay.setDate(date.getDate() + 1);
    // console.log(nextDay);

    // // const target = "Distance";
    // const result = await readRecords("Steps", {
    //   timeRangeFilter: {
    //     operator: "between",
    //     startTime: String(date),
    //     endTime: String(nextDay),
    //     // startTime: String(startTime),
    //     // endTime: String(endTime),
    //     // startTime: "2023-12-10T12:00:00.405Z",
    //     // endTime: "2023-12-12T23:53:15.405Z",
    //   },
    // });
    // // if (target === "Distance") {
    // //   const totalDistance = result.reduce(
    // //     (sum, cur: any) => sum + cur.distance.inKilometers,
    // //     0
    // //   );
    // //   setCampaignTargetValue(totalDistance.toFixed(2));
    // // } else {
    // const totalSteps = result.reduce((sum, cur: any) => sum + cur.count, 0);
    // console.log(
    //   "🚀 ~ getStepValue ~ totalSteps:",
    //   `${totalSteps.toLocaleString("en-US", {          maximumFractionDigits: 0,})("en-US")}`
    // );
  };
  const updateDietaryLocal = async () => {
    const calCalories =
      dietaryData.food.carb * 4 +
      dietaryData.food.protien * 4 +
      dietaryData.food.fat * 9;
    console.log(calCalories);

    dispatch(setFoodCalories(calCalories));
    dispatch(
      setRemainCalories(
        userProfile.bmr + dietaryData.exercise.cal - dietaryData.food.calories
      )
    );
    await AsyncStorage.setItem(
      "@dietaryData",
      JSON.stringify({
        food: {
          calories: dietaryData.food.calories,
          carb: dietaryData.food.carb,
          protien: dietaryData.food.protien,
          fat: dietaryData.food.fat,
        },
        exercise: {
          cal: dietaryData.exercise.cal,
        },
        water: {
          lit: dietaryData.water.lit,
        },
        caloriesRemain: {
          value: userState.remainCalories,
        },
      })
    );
  };
  useEffect(() => {
    updateDietaryLocal();
    getStepValue();
    // console.log(dietaryData.food.calories);
  }, [dispatch]);

  useEffect(() => {
    if (
      (userState.remainCalories <= userProfile.bmr &&
        userState.remainCalories > 0) ||
      userState.remainCalories >= userProfile.bmr
    ) {
      setColor("#05AB58");
    } else {
      setColor("#FF0000");
    }
  }, [userState.remainCalories, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setRefreshing(false);
      updateDietaryLocal();
      getStepValue();
    }, 2000);
  }, [refreshing]);
  return (
    <SafeAreaView
      style={{ width: SCREEN_WIDTH }}
      className="bg-bg flex flex-col items-center mt-4 space-y-5 h-full"
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-col items-center space-y-6 w-full h-full">
          <View
            style={{ width: SCREEN_WIDTH * 0.9 }}
            className="bg-white rounded-[20px] py-3 px-4 flex flex-col "
          >
            <Text className="text-header-4 font-semibold">
              Calories Remaining
            </Text>
            <View className="py-4 flex flex-row justify-center space-x-12 items-center">
              <View className="relative">
                <CircularProgress
                  activeStrokeWidth={13}
                  inActiveStrokeWidth={23}
                  inActiveStrokeOpacity={0.3}
                  activeStrokeColor={color}
                  value={userState.remainCalories}
                  radius={90}
                  duration={500}
                  progressValueColor={color}
                  maxValue={userProfile.bmr}
                  title={"kcal"}
                  progressValueStyle={{ fontSize: 42, fontWeight: "bold" }}
                  titleColor={"#929292"}
                  titleStyle={{ fontWeight: "500", fontSize: 12 }}
                />
                {userState.remainCalories >= 1000 ? (
                  <Text
                    className="absolute z-50 text-header-1 font-bold top-16 left-[59px]"
                    style={{ color: color }}
                  >
                    ,
                  </Text>
                ) : null}
              </View>

              <View className="flex flex-col space-y-3">
                <View className="flex flex-row space-x-3 items-start">
                  <View className="mt-1 bg-orange rounded-full w-2 h-2 flex items-center justify-center"></View>
                  <View className="flex flex-col">
                    <Text className="text-body-3 font-regular text-gray">
                      Carb
                    </Text>
                    <Text className="text-sub-header-2 font-medium text-black">
                      {dietaryData.food.carb.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      g.
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row space-x-3 items-start">
                  <View className="mt-1 bg-orange rounded-full w-2 h-2 flex items-center justify-center"></View>
                  <View className="flex flex-col">
                    <Text className="text-body-3 font-regular text-gray">
                      Protein
                    </Text>
                    <Text className="text-sub-header-2 font-medium text-black">
                      {dietaryData.food.protien.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      g.
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row space-x-3 items-start">
                  <View className="mt-1 bg-orange rounded-full w-2 h-2 flex items-center justify-center"></View>
                  <View className="flex flex-col">
                    <Text className="text-body-3 font-regular text-gray">
                      Fat
                    </Text>
                    <Text className="text-sub-header-2 font-medium text-black">
                      {dietaryData.food.fat.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      g.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ width: SCREEN_WIDTH * 0.9 }}
            className="flex flex-col space-y-3"
          >
            <Text className="text-header-3 font-semibold">Daily Progress</Text>
            <View
              style={{
                width: SCREEN_WIDTH * 0.9,
              }}
              className="flex flex-row flex-wrap py-3 justify-center pl-3"
            >
              <View
                style={{
                  width: SCREEN_WIDTH * 0.4,
                }}
                className="bg-white rounded-[20px] h-[130px] mr-3 mb-3 py-4 px-5 flex flex-col justify-between"
              >
                <View className="flex flex-row justify-between">
                  <Text className="text-sub-header-1 font-medium text-black">
                    Steps
                  </Text>
                  <View className="bg-[#FFDBC1] flex flex-row items-center justify-center w-7 h-7 rounded-full">
                    <UtilIcon
                      category="MaterialCommunityIcons"
                      name={"walk"}
                      size={16}
                      color="#FF7410"
                    />
                    {/* <Ionicons name="footsteps-sharp" size={16} color="#FF7410" /> */}
                  </View>
                </View>
                <View className="flex flex-col">
                  <Text className="text-header-2 font-bold text-black">
                    {userState.stepsValue}
                  </Text>
                  <Text className="text-body-3 font-regular text-gray">
                    Steps
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.4,
                }}
                className="bg-white rounded-[20px] h-[130px] mr-3 mb-3 py-4 px-5 flex flex-col justify-between"
              >
                <View className="flex flex-row justify-between">
                  <Text className="text-sub-header-1 font-medium text-black">
                    Exercise
                  </Text>
                  <View className="bg-[#FFDBC1] flex flex-row items-center justify-center w-7 h-7 rounded-full">
                    <UtilIcon
                      category="MaterialIcons"
                      name={"local-fire-department"}
                      size={16}
                      color="#FF7410"
                    />
                    {/* <Ionicons name="footsteps-sharp" size={16} color="#FF7410" /> */}
                  </View>
                </View>
                <View className="flex flex-col">
                  <Text className="text-header-2 font-bold text-black">
                    {dietaryData.exercise.cal.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                  <Text className="text-body-3 font-regular text-gray">
                    kcal
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.4,
                }}
                className="bg-white rounded-[20px] h-[130px] mr-3 mb-3 py-4 px-5 flex flex-col justify-between"
              >
                <View className="flex flex-row justify-between">
                  <Text className="text-sub-header-1 font-medium text-black">
                    Food
                  </Text>
                  <View className="bg-[#FFDBC1] flex flex-row items-center justify-center w-7 h-7 rounded-full">
                    <UtilIcon
                      category="MaterialIcons"
                      name={"restaurant"}
                      size={16}
                      color="#FF7410"
                    />
                    {/* <Ionicons name="footsteps-sharp" size={16} color="#FF7410" /> */}
                  </View>
                </View>
                <View className="flex flex-col">
                  <Text className="text-header-2 font-bold text-black">
                    {dietaryData.food.calories.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                  <Text className="text-body-3 font-regular text-gray">
                    kcal
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.4,
                }}
                className="bg-white rounded-[20px] h-[130px] mr-3 mb-3 py-4 px-5 flex flex-col justify-between"
              >
                <View className="flex flex-row justify-between">
                  <Text className="text-sub-header-1 font-medium text-black">
                    Water
                  </Text>
                  <View className="bg-[#FFDBC1] flex flex-row items-center justify-center w-7 h-7 rounded-full">
                    <UtilIcon
                      category="MaterialCommunityIcons"
                      name={"water"}
                      size={16}
                      color="#FF7410"
                    />
                    {/* <Ionicons name="footsteps-sharp" size={16} color="#FF7410" /> */}
                  </View>
                </View>
                <View className="flex flex-col">
                  <Text className="text-header-2 font-bold text-black">
                    {dietaryData.water.lit.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                  <Text className="text-body-3 font-regular text-gray">
                    liters
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Text className='text-red-500'>Tab One</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="app/(tabs)/index.tsx" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
