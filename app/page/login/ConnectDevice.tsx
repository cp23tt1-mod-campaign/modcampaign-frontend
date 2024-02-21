import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../../store/root.store";
import { setConnectThirdParty } from "../../../store/campaign/campaign.slice";
import { initialize, requestPermission } from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";

const ConnectDevice = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isConnectedThirdParty = useAppSelector((state) => {
    return state.campaign.isConnectThirdParty;
  });
  const dispatch = useAppDispatch();
  const [androidPermissions, setAndroidPermissions] = useState<Permission[]>(
    []
  );

  const connectHealth = async () => {
    if (Platform.OS === "ios") {
      return;
    }
    dispatch(setConnectThirdParty(!isConnectedThirdParty));
    // setIsEnabled((previousState) => !previousState);

    const isInitialized = await initialize();
    // console.log("isInitialized", isInitialized);

    if (!isInitialized) {
      dispatch(setConnectThirdParty(false));
      return;
    }

    // request permissions
    const grantedPermissions = await requestPermission([
      { accessType: "read", recordType: "Steps" },
      { accessType: "read", recordType: "Distance" },
      // { accessType: "read", recordType: "FloorsClimbed" },
    ]);
    console.log("grantedPermissions", grantedPermissions);

    setAndroidPermissions(grantedPermissions);

    // console.log(totalDistance);
  };
  useEffect(() => {
    if (androidPermissions.length > 0) {
      router.push({
        pathname: "/page/login/InformProfile",
      });
      // dispatch(setConnectThirdParty(false));
      // console.log(isConnectedThirdParty);
    }
  }, [androidPermissions]);
  return (
    <SafeAreaView
      style={{ width: SCREEN_WIDTH }}
      className="flex flex-col items-center bg-bg h-full"
    >
      <View className="flex flex-col h-[600px]">
        <View className="mt-5 mb-6">
          <Text className="text-header-3 font-semibold">Connect Device</Text>
        </View>

        <View style={{ width: SCREEN_WIDTH * 0.8 }} className="h-full">
          <View className="flex flex-col space-y-5 pb-5">
            <Text className="text-sub-header-1 font-regular leading-6 text-gray">
              ModCampaign can automatically add data from Apple Health to help
              you track your health and fitness, and personalize your
              experience.
            </Text>
            <Text className="text-sub-header-1 font-regular leading-6 text-gray mr-6">
              To turn this connection off later, go to Profile {">"} Settings{" "}
              {">"} Connect Device
            </Text>
            <Image
              source={require("../../../public/images/onboardConnect.png")}
              style={{ width: SCREEN_WIDTH * 0.8, height: 300 }}
            />
          </View>
        </View>
      </View>
      <View
        style={{ width: SCREEN_WIDTH * 0.8 }}
        className=" flex flex-row justify-between space-x-7 my-9"
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/page/login/InformProfile",
            })
          }
          className="py-2 rounded-3xl"
        >
          <Text className="w-full text-gray text-sub-header-1 font-medium text-center">
            Not now
          </Text>
        </Pressable>
        <Pressable
          onPress={
            () => connectHealth()
            // router.push({
            //   pathname: "/page/campaign/ConnectDevice",
            // })
          }
          className={`py-2 px-12 rounded-3xl bg-orange`}
        >
          <Text className="w-full text-white text-sub-header-1 font-medium text-center">
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ConnectDevice;
