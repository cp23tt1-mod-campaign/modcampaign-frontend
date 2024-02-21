import {
  View,
  Text,
  Platform,
  Pressable,
  SafeAreaView,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import { TouchableOpacity } from "react-native-gesture-handler";
import UtilIcon from "../../Util/Icon";
import { setCloneUserProfile } from "../../store/user/user.slice";
const API_URL =
  Platform.OS === "ios" ? process.env.API_IOS_URL : process.env.API_ANDROID_URL;
const Profile = () => {
  const signOut = async () => {
    console.log("sign out");

    router.push({
      pathname: "/page/login",
    });
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@accessToken");
    await AsyncStorage.removeItem("@dietaryData");
  };
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const userState = useAppSelector((state) => state.user);
  const activityLevel = [
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
    "Extra Active",
  ];
  const [profileData, setProfileData] = useState([
    {
      title: "Gender",
      value: userProfile.gender,
    },
    {
      title: "Age",
      value: userProfile.age,
    },
    {
      title: "Height",
      value: userProfile.height,
    },
    {
      title: "Weight",
      value: userProfile.weight,
    },
    {
      title: "Activity Multiplier",
      value: activityLevel[userProfile.activityLevel - 1],
    },
  ]);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  useEffect(() => {
    const clone = {
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      gender: userProfile.gender,
      age: userProfile.age,
      height: userProfile.height,
      weight: userProfile.weight,
      activityLevel: userProfile.activityLevel,
      bmr: userProfile.bmr,
      email: userProfile.email,
      profileImage: userProfile.profileImage,
      role: userProfile.role,
      userId: userProfile.userId,
    };

    dispatch(setCloneUserProfile(clone));
    console.log(userState.clonedUserProfile);
  }, [dispatch]);
  useEffect(() => {
    // const genderFirstLetterUpper =
    //   userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1);
    // setProfileData((prevList) => {
    //   return prevList.map((item) => {
    //     if (item.title === "Gender") {
    //       return {
    //         ...item,
    //         value: genderFirstLetterUpper,
    //       };
    //     }
    //     return item;
    //   });
    // });
  }, [userProfile, dispatch]);
  return (
    <SafeAreaView className="bg-bg h-full" style={{ width: SCREEN_WIDTH }}>
      {/* https://lh3.googleusercontent.com/a/ */}
      <ScrollView>
        <View className="flex flex-col items-center space-y-4 pb-5">
          <View className="flex flex-col space-y-2 items-center">
            <Image
              source={{
                uri: `https://lh3.googleusercontent.com/a/${userProfile?.profileImage}`,
                width: 100,
                height: 100,
              }}
              className="rounded-full "
            />
            <View className="flex flex-col items-center">
              <Text className="text-header-4 font-semibold">
                {userProfile?.firstName} {userProfile?.lastName}{" "}
              </Text>
              <Text className="text-body-3 font-regular text-gray">
                {userProfile?.email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/page/profile/edit/",
                })
              }
              className="bg-orange px-3 py-1 rounded-[20px]"
            >
              <Text className="text-sub-header-2 font-medium text-white">
                Edit Profile {">"}{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-col space-y-4">
            <View
              style={{ width: SCREEN_WIDTH * 0.9 }}
              className="flex flex-col bg-white rounded-[20px]"
            >
              {profileData.map((item, index) => {
                return (
                  <View key={index} className="">
                    <View
                      className={`${
                        index === profileData.length - 1 ? "" : "border-b-0.5"
                      } border-gray p-4 flex flex-row justify-between`}
                    >
                      <Text
                        style={{ width: SCREEN_WIDTH * 0.425 }}
                        className="text-sub-header-2 font-medium text-black"
                      >
                        {item.title}
                      </Text>
                      <View
                        style={{ width: SCREEN_WIDTH * 0.375 }}
                        className="flex flex-row justify-end pr-4 "
                      >
                        <Text className="text-sub-header-3 font-regular text-gray">
                          {item.value}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            <View className="bg-white rounded-[20px]">
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/page/campaign/ConnectDevice/",
                  })
                }
                className="border-b-0.5 border-gray p-4 flex flex-row justify-between"
              >
                <Text
                  style={{ width: SCREEN_WIDTH * 0.6 }}
                  className="text-sub-header-2 font-medium text-black"
                >
                  Connect Device
                </Text>
                <View
                  style={{ width: SCREEN_WIDTH * 0.2 }}
                  className="flex flex-row justify-end pr-4"
                >
                  <UtilIcon
                    category="MaterialCommunityIcons"
                    name={"chevron-right"}
                    size={18}
                    color="#929292"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() =>
                //   router.push({
                //     pathname: "/page/login/Policy",
                //   })
                // }
                className="p-4 flex flex-row justify-between"
              >
                <Text
                  style={{ width: SCREEN_WIDTH * 0.6 }}
                  className="text-sub-header-2 font-medium text-black"
                >
                  Privacy Center
                </Text>
                <View
                  style={{ width: SCREEN_WIDTH * 0.2 }}
                  className="flex flex-row justify-end pr-4"
                >
                  <UtilIcon
                    category="MaterialCommunityIcons"
                    name={"chevron-right"}
                    size={18}
                    color="#929292"
                  />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => signOut()}
              className="bg-white rounded-[20px]"
            >
              <View className="p-4 flex flex-row justify-between">
                <Text
                  style={{ width: SCREEN_WIDTH * 0.6 }}
                  className="text-sub-header-2 font-medium text-red"
                >
                  Log out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <Text>{JSON.stringify(userProfile, null, 2)}</Text> */}
        </View>
        {/* <View className="flex h-full w-full flex-col">
        <View className="flex flex-col items-center">
          <Pressable
            onPress={() => signOut()}
            className="w-full flex flex-row justify-center items-center mt-2"
          >
            <View className="bg-red py-2 px-12 rounded-3xl">
              <Text className="w-full text-white text-sub-header-1 font-medium text-center">
                Sign out
              </Text>
            </View>
          </Pressable>
          <Text>
            Mod Campaign -
            {process.env.NODE_ENV === "development" ? "Dev." : "Prod."}
          </Text>
          <Text>API: {API_URL}</Text>
          <Text>
            OS: {Platform.OS} {Platform.Version}
          </Text>
        </View>
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
