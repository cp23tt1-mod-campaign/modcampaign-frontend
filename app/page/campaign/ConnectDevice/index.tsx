import { View, Text, SafeAreaView, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";
import { platformColor } from "nativewind";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import { setConnectThirdParty } from "../../../../store/campaign/campaign.slice";

const ConnectDevice = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const isConnectedThirdParty = useAppSelector((state) => {
    return state.campaign.isConnectThirdParty;
  });
  const dispatch = useAppDispatch();
  const [androidPermissions, setAndroidPermissions] = useState<Permission[]>(
    []
  );

  const toggleSwitch = async () => {
    if (Platform.OS === "ios") {
      return;
    }
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
    setAndroidPermissions(grantedPermissions);

    // if (androidPermissions.length > 0) {
    //   dispatch(setConnectThirdParty(!isConnectedThirdParty));
    //   // dispatch(setConnectThirdParty(true));
    // }

    // console.log(totalDistance);
  };
  useEffect(() => {
    if (androidPermissions.length > 0) {
      dispatch(setConnectThirdParty(!isConnectedThirdParty));
    }
  }, [androidPermissions]);
  // const [androidOptions, setAndroidOptions] = useState<PermissionOptions[]>([]);
  const readSampleData = async () => {
    // const init = async () => {
    // initialize the client
    // const isInitialized = await initialize();
    // console.log("isInitialized", isInitialized);
    // if (!isInitialized) {
    //   console.log("Failed to initialize Health Connect");
    //   return;
    // }
    // // request permissions
    // const grantedPermissions = await requestPermission([
    //   { accessType: "read", recordType: "Steps" },
    //   { accessType: "read", recordType: "Distance" },
    //   // { accessType: "read", recordType: "FloorsClimbed" },
    // ]);
    // setAndroidPermissions(grantedPermissions);
    // console.log("grantedPermissions", grantedPermissions);
    // };
    // init();
    // {
    //   result: [
    //     {
    //       startTime: '2023-01-09T12:00:00.405Z',
    //       endTime: '2023-01-09T23:53:15.405Z',
    //       energy: {
    //         inCalories: 15000000,
    //         inJoules: 62760000.00989097,
    //         inKilojoules: 62760.00000989097,
    //         inKilocalories: 15000,
    //       },
    //       metadata: {
    //         id: '239a8cfd-990d-42fc-bffc-c494b829e8e1',
    //         lastModifiedTime: '2023-01-17T21:06:23.335Z',
    //         clientRecordId: null,
    //         dataOrigin: 'com.healthconnectexample',
    //         clientRecordVersion: 0,
    //         device: 0,
    //       },
    //     },
    //   ],
    // }
  };
  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     readSampleData();
  //   } else {
  //     return;
  //   }
  // }, []);
  return (
    <SafeAreaView className="w-full h-full mt-5">
      <View className="w-full h-full px-4 flex flex-col space-y-4">
        <Text className="text-sub-header-2 font-medium text-black">
          Select the application to connect
        </Text>
        <View className="bg-[#F9F9F9] shadow-sm rounded-2xl py-4 px-5 flex flex-row justify-between items-center">
          <View className="flex flex-row space-x-6 items-center">
            <View className="bg-white rounded-2xl shadow-sm p-1">
              {Platform.OS === "ios" ? (
                <Image
                  source={require("../../../../public/images/appleHealth.png")}
                  style={{ width: 52, height: 52 }}
                />
              ) : (
                <Image
                  source={require("../../../../public/images/healthConnect.png")}
                  style={{ width: 52, height: 52 }}
                />
              )}
            </View>

            <Text className="text-sub-header-1 font-medium text-black">
              {Platform.OS === "ios" ? "Apple Health" : "Health Connect"}
            </Text>
          </View>
          <View className="flex flex-row space-x-3 items-center">
            <Switch
              trackColor={{ false: "#D9D9D9", true: "#05AB58" }}
              // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#D9D9D9"
              onValueChange={toggleSwitch}
              value={isConnectedThirdParty}
            />
          </View>
        </View>
        <Text className="text-small font-medium text-gray">
          *The system will only count steps from the application you selected.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ConnectDevice;
