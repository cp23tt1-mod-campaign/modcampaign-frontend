import {
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setDietary,
  setExerciseCal,
  setFoodCalories,
  setFoodCarb,
  setFoodFat,
  setFoodProtien,
  setRemainCalories,
  setWaterLit,
} from "../../store/user/user.slice";

const Diary = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const dietaryData: any = useAppSelector((state) => state.user.dietary);
  const userState = useAppSelector((state) => state.user);
  const resetDietary = async () => {
    await AsyncStorage.setItem(
      "@dietaryData",
      JSON.stringify({
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
        caloriesRemain: {
          value: 0,
        },
      })
    );
    dispatch(setFoodCarb(0));
    dispatch(setFoodFat(0));
    dispatch(setFoodProtien(0));
    dispatch(setFoodCalories(0));
    dispatch(setExerciseCal(0));
    dispatch(setWaterLit(0));
    dispatch(setRemainCalories(userProfile.bmr));
  };
  // router.push({
  //   pathname: "/page/campaign/list",
  //   params: { listType: "latest" },
  // });
  return (
    <SafeAreaView
      style={{ width: SCREEN_WIDTH }}
      className="bg-bg flex flex-col items-center mt-4 space-y-5 h-full"
    >
      <View
        style={{ width: SCREEN_WIDTH * 0.9 }}
        className="bg-white rounded-[20px] py-4 px-5 flex flex-col space-y-4"
      >
        <View className="flex flex-row justify-between">
          <Text className="text-sub-header-2 font-medium text-black">
            Calories Remaining
          </Text>
          <TouchableOpacity
            className="bg-red rounded-full px-3 py-1"
            onPress={resetDietary}
          >
            <Text className="text-sub-header-2 font-medium text-white">
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-around items-center">
          <View className="flex flex-col items-center">
            <Text className="text-sub-header-2 font-medium text-black">
              {userProfile.bmr.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </Text>
            <Text className="text-body-3 font-regular text-gray">Goal</Text>
          </View>
          <View>
            <Text className="text-sub-header-2 font-medium text-black">+</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-sub-header-2 font-medium text-black">
              {dietaryData.exercise.cal.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </Text>
            <Text className="text-body-3 font-regular text-gray">Exercise</Text>
          </View>
          <View>
            <Text className="text-sub-header-2 font-medium text-black">-</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-sub-header-2 font-medium text-black">
              {dietaryData.food.calories.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </Text>
            <Text className="text-body-3 font-regular text-gray">Food</Text>
          </View>
          <View>
            <Text className="text-sub-header-2 font-medium text-black">=</Text>
          </View>
          <View className="flex flex-col items-center">
            <Text className="text-header-4 font-bold text-orange">
              {/* {userProfile.bmr} */}
              {userState.remainCalories.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </Text>
            <Text className="text-body-3 font-regular text-gray">
              Remaining
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ width: SCREEN_WIDTH * 0.9 }}
        className="flex flex-col space-y-6"
      >
        <View className="flex flex-col space-y-3">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-header-3 font-bold text-black">Food</Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/page/dietary/edit",
                  params: { type: "food" },
                });
              }}
              className="bg-orange rounded-[20px] flex flex-row items-center py-1 px-6"
            >
              <Text className="text-sub-header-1 font-medium text-white">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-[20px]">
            <View className="border-b-0.5 border-gray p-4 flex flex-row justify-between">
              <Text
                style={{ width: SCREEN_WIDTH * 0.6 }}
                className="text-sub-header-2 font-medium text-black"
              >
                Carb
              </Text>
              <View
                style={{ width: SCREEN_WIDTH * 0.2 }}
                className="flex flex-row"
              >
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-3 font-regular text-gray">
                    {dietaryData.food.carb.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-2 font-medium text-black">
                    g.
                  </Text>
                </View>
              </View>
            </View>
            <View className="border-b-0.5 border-gray p-4 flex flex-row justify-between">
              <Text
                style={{ width: SCREEN_WIDTH * 0.6 }}
                className="text-sub-header-2 font-medium text-black"
              >
                Protein
              </Text>
              <View
                style={{ width: SCREEN_WIDTH * 0.2 }}
                className="flex flex-row"
              >
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-3 font-regular text-gray">
                    {dietaryData.food.protien.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-2 font-medium text-black">
                    g.
                  </Text>
                </View>
              </View>
            </View>
            <View className="border-gray p-4 flex flex-row justify-between">
              <Text
                style={{ width: SCREEN_WIDTH * 0.6 }}
                className="text-sub-header-2 font-medium text-black"
              >
                Fat
              </Text>
              <View
                style={{ width: SCREEN_WIDTH * 0.2 }}
                className="flex flex-row"
              >
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-3 font-regular text-gray">
                    {dietaryData.food.fat.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-2 font-medium text-black">
                    g.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="bg-white rounded-[20px]">
            <View className=" border-gray p-4 flex flex-row justify-between">
              <Text
                style={{ width: SCREEN_WIDTH * 0.6 }}
                className="text-sub-header-2 font-medium text-black"
              >
                Calories
              </Text>
              <View
                style={{ width: SCREEN_WIDTH * 0.2 }}
                className="flex flex-row"
              >
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-3 font-regular text-gray">
                    {dietaryData.food.calories.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-end"
                >
                  <Text className="text-sub-header-2 font-medium text-black">
                    kcal
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-col space-y-2">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-header-3 font-bold text-black">Exercise</Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/page/dietary/edit",
                  params: { type: "exercise" },
                });
              }}
              className="bg-orange rounded-[20px] flex flex-row items-center py-1 px-6"
            >
              <Text className="text-sub-header-1 font-medium text-white">
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-[20px]">
            <View className=" border-gray p-4 flex flex-row justify-between">
              <Text
                style={{ width: SCREEN_WIDTH * 0.6 }}
                className="text-sub-header-2 font-medium text-black"
              >
                Exercise
              </Text>
              <View
                style={{ width: SCREEN_WIDTH * 0.2 }}
                className="flex flex-row"
              >
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-3 font-regular text-gray">
                    {dietaryData.exercise.cal.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-end"
                >
                  <Text className="text-sub-header-2 font-medium text-black">
                    kcal
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-col space-y-2">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-header-3 font-bold text-black">Water</Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/page/dietary/edit",
                  params: { type: "water" },
                });
              }}
              className="bg-orange rounded-[20px] flex flex-row items-center py-1 px-6"
            >
              <Text className="text-sub-header-1 font-medium text-white">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-[20px]">
            <View className="border-gray p-4 flex flex-row justify-between">
              <Text
                style={{ width: SCREEN_WIDTH * 0.6 }}
                className="text-sub-header-2 font-medium text-black"
              >
                Water
              </Text>
              <View
                style={{ width: SCREEN_WIDTH * 0.2 }}
                className="flex flex-row"
              >
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-3 font-regular text-gray">
                    {dietaryData.water.lit.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </View>
                <View
                  style={{ width: SCREEN_WIDTH * 0.1 }}
                  className="flex flex-row justify-center"
                >
                  <Text className="text-sub-header-2 font-medium text-black">
                    L
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Diary;
