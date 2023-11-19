import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
// import { Text, View } from '../../components/Themed';
import AppleHealthKit, { HealthKitPermissions } from "react-native-health";
import { useEffect, useState } from "react";

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
export default function TabOneScreen() {
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
  //   const options = {
  //     startDate: new Date(
  //       new Date().setDate(new Date().getDate() - 1)
  //     ).toISOString(),
  //     endDate: new Date().toISOString(),
  //     includeManuallyAdded: true,
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
  return (
    <SafeAreaView className="bg-bg">
      <View className="flex h-full w-full items-center">
        {/* <Text className='text-red-500 text-2xl'>Tab One</Text> */}
        {/* <Text className="text-red-500 text-2xl">Step: {steps} </Text> */}
        {/* <Text className="text-red-500 text-2xl">
          Walking, Running Distance: {distance}{" "}
        </Text> */}
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
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
