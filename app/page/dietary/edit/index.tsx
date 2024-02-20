import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DietaryEditBlock from "../../../../components/Dietary/EditBlock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import {
  setExerciseCal,
  setFoodCalories,
  setFoodCarb,
  setFoodFat,
  setFoodProtien,
  setRemainCalories,
  setWaterLit,
} from "../../../../store/user/user.slice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const EditDietary = () => {
  const route = useRoute();
  // const focus = useIsFocused();
  // console.log(route.params);

  const { type } = route.params as any;
  // const { type } = "food";
  // const type = "food";
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const dietaryData = useAppSelector((state) => state.user.dietary);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const userState = useAppSelector((state) => state.user);

  const [carb, setCarb] = useState("");
  const [listEditData, setListEditData] = useState({
    food: [
      {
        propertiedName: "Carb",
        value: dietaryData.food.carb,
        unit: "g",
        adjustValue: 0,
      },
      {
        propertiedName: "Protein",
        value: dietaryData.food.protien,
        unit: "g",
        adjustValue: 0,
      },
      {
        propertiedName: "Fat",
        value: dietaryData.food.fat,
        unit: "g",
        adjustValue: 0,
      },
    ],
    exercise: [
      {
        propertiedName: "Exercise",
        value: dietaryData.exercise.cal,
        unit: "kcal",
        adjustValue: 0,
      },
    ],
    water: [
      {
        propertiedName: "Water",
        value: dietaryData.water.lit,
        unit: "L",
        adjustValue: 0,
      },
    ],
  });
  const handleDecrease = (propertiedName: string, value: string) => {
    console.log("🚀 ~ handleDecrease ~ value:", value);
    console.log("🚀 ~ handleDecrease ~ propertiedName:", propertiedName);
    const listType =
      type === "food" ? "food" : type === "exercise" ? "exercise" : "water";
    setListEditData((prevData) => {
      return {
        ...prevData,
        [listType]: prevData[listType].map((item) => {
          if (item.propertiedName === propertiedName) {
            return {
              ...item,
              value: item.value - parseInt(value),
            };
          }
          return item;
        }),
      };
    });
    if (type === "food") {
      if (propertiedName === "Carb") {
        // console.log(
        //   "🚀 ~ handleDecrease ~ listEditData.food[0].value",
        //   listEditData.food[0].value
        // );

        dispatch(setFoodCarb(dietaryData.food.carb - parseInt(value)));
      } else if (propertiedName === "Protein") {
        dispatch(setFoodProtien(dietaryData.food.protien - parseInt(value)));
      } else {
        dispatch(setFoodFat(dietaryData.food.fat - parseInt(value)));
      }
    } else if (type === "exercise") {
      dispatch(setExerciseCal(dietaryData.exercise.cal - parseInt(value)));
    } else {
      dispatch(setWaterLit(dietaryData.water.lit - parseInt(value)));
    }

    console.log(listEditData.food);
  };

  const handleIncrease = (propertiedName: string, value: string) => {
    console.log("🚀 ~ handleIncrease ~ propertiedName:", propertiedName);
    console.log("🚀 ~ handleDecrease ~ value:", value);

    const listType =
      type === "food" ? "food" : type === "exercise" ? "exercise" : "water";
    console.log(listType);

    setListEditData((prevData) => {
      return {
        ...prevData,
        [listType]: prevData[listType].map((item) => {
          if (item.propertiedName === propertiedName) {
            return {
              ...item,
              value: item.value + parseInt(value),
            };
          }
          return item;
        }),
      };
    });
    if (type === "food") {
      if (propertiedName === "Carb") {
        // console.log(
        //   "🚀 ~ handleDecrease ~ listEditData.food[0].value",
        //   listEditData.food[0].value
        // );

        dispatch(setFoodCarb(dietaryData.food.carb + parseInt(value)));
      } else if (propertiedName === "Protein") {
        dispatch(setFoodProtien(dietaryData.food.protien + parseInt(value)));
      } else {
        dispatch(setFoodFat(dietaryData.food.fat + parseInt(value)));
      }
    } else if (type === "exercise") {
      dispatch(setExerciseCal(dietaryData.exercise.cal + parseInt(value)));
    } else {
      dispatch(setWaterLit(dietaryData.water.lit + parseInt(value)));
    }

    console.log(listEditData.food);
  };
  const renderViewByType = () => {
    switch (type) {
      case "food":
        return (
          <View className="flex flex-col">
            {listEditData.food.map((item, index) => {
              return (
                <DietaryEditBlock
                  key={`${type}-${index}`}
                  data={item}
                  handleDecrease={handleDecrease}
                  handleIncrease={handleIncrease}
                />
              );
            })}
          </View>
        );

      case "exercise":
        return (
          <View className="flex flex-col">
            {listEditData.exercise.map((item, index) => {
              return (
                <DietaryEditBlock
                  key={`${type}-${index}`}
                  data={item}
                  handleDecrease={handleDecrease}
                  handleIncrease={handleIncrease}
                />
              );
            })}
          </View>
        );

      // Add more cases as needed

      default:
        return (
          <View className="flex flex-col">
            {listEditData.water.map((item, index) => {
              return (
                <DietaryEditBlock
                  key={`${type}-${index}`}
                  data={item}
                  handleDecrease={handleDecrease}
                  handleIncrease={handleIncrease}
                />
              );
            })}
          </View>
        );
    }
  };
  useEffect(() => {
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
    const updateDietaryLocal = async () => {
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
    updateDietaryLocal();
    // console.log(dietaryData.food.calories);
  }, [dietaryData.food, dietaryData.exercise]);
  // const handleSelectedGender = (selected: any) => {
  //   setGenderList((prevList) =>
  //     prevList.map((item) => ({
  //       ...item,
  //       isSelected: item.label === selected.label,
  //     }))
  //   );

  //   dispatch(setUserGender(selected.value));
  // };
  // useEffect(() => {
  //   const run = async () => {
  //     const data: any = await AsyncStorage.getItem("@dietaryData");
  //     const parsedData = JSON.parse(data);
  //     console.log(parsedData.food);
  //   };
  //   run();
  // });
  return (
    <SafeAreaView style={{ width: SCREEN_WIDTH }} className="bg-bg h-full">
      <ScrollView className="bg-bg w-full h-full p-4">
        <KeyboardAwareScrollView extraHeight={200}>
          <View className="flex flex-col">{renderViewByType()}</View>
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* <Text>{type}</Text> */}
      {/* {renderViewByType()} */}
    </SafeAreaView>
  );
};

export default EditDietary;
