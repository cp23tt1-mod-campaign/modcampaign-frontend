import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { Animated } from "react-native";
import { ScrollViewIndicator } from "@fanchenbao/react-native-scroll-indicator";
import { useIsFocused, useRoute } from "@react-navigation/native";
// import ScrollViewIndicator from "react-native-scroll-indicator";
// import { ScrollViewIndicator } from "react-native-scrollview-indicator";

const Policy = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [acceptFirstPolicy, setAcceptFirstPolicy] = useState(false);
  const [acceptSecondPolicy, setAcceptSecondPolicy] = useState(false);
  const policy = [
    {
      header: "Introduction",
      detail: `Welcome to ModCampaign ("us," "we," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, ModCampaign (the "App"). Please read this Privacy Policy carefully. By accessing or using the App, you consent to the practices described in this policy.`,
    },
    {
      header: "Information We Collect",
      detail: `a. Personal Information:When you create an account, we may collect personal information such as your name, email address, and profile picture.

b. Usage Data: We may collect information on how the App is accessed and used, including device information, IP addresses, and usage patterns.`,
    },
    {
      header: "How We Use Your Information",
      detail: `a. Provide and Maintain the App: We use the collected information to create and maintain user accounts, personalize content, and provide necessary features of the App.
      
b. Improve and Analyze: We may use your information to analyze user trends, track the performance of the App, and improve user experience.`,
    },
    {
      header: "Data Security",
      detail: `We prioritize the security of your data and employ industry-standard measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.`,
    },
    {
      header: "Third-Party Services",
      detail: `The App may integrate with third-party services. Please review the privacy policies of these third-party services, as we do not control and are not responsible for their practices.`,
    },
    {
      header: "Children's Privacy",
      detail: `The App is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take appropriate action.`,
    },
    {
      header: "Changes to This Privacy Policy",
      detail: `We may update our Privacy Policy from time to time. You will be notified of any changes by posting the new Privacy Policy on this page.`,
    },
    {
      header: "Contact Us",
      detail: `If you have any questions or concerns about our Privacy Policy, please contact us at [ModCampaign@gmail.com].`,
    },
  ];
  const route = useRoute();
  // const focus = useIsFocused();
  // console.log(route.params);

  const { form } = route.params as any;
  // useEffect(() => {
  //   console.log(form);

  //   // if (type === "Joined Campaign") {
  //   //   getCampaignTargetValue();
  //   // }
  // }, [focus]);
  return (
    <SafeAreaView
      style={{ width: SCREEN_WIDTH }}
      className="flex flex-col items-center h-full"
    >
      {/* <View className="mt-5 mb-6">
        <Text className="text-header-3 font-semibold">Privacy Policy</Text>
      </View> */}

      <ScrollView style={{ width: SCREEN_WIDTH * 0.8 }} className="mb-5">
        <Text className="text-sub-header-3 font-regular mb-4">
          Last Updated: 13 February 2024
        </Text>
        <View className="flex flex-col space-y-5 mr-6 pb-5">
          {policy.map((item, index) => {
            return (
              <View key={index} className="flex flex-col space-y-5">
                <Text className="text-sub-header-1 font-medium">
                  {index + 1}. {item.header}
                </Text>
                <Text className="text-sub-header-3 font-regular leading-6">
                  {item.detail}
                </Text>
              </View>
            );
          })}
          {/* <Text className="text-sub-header-1 font-regular leading-6">
            1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            incidunt odio quibusdam. Culpa accusamus, quisquam, autem doloribus
            commodi excepturi expedita illum, assumenda incidunt reiciendis
            itaque quod facere tempore eum amet.
          </Text>
          <Text className="text-sub-header-1 font-regular leading-6">
            2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            incidunt odio quibusdam. Culpa accusamus, quisquam, autem doloribus
            commodi excepturi expedita illum, assumenda incidunt reiciendis
            itaque quod facere tempore eum amet.
          </Text>
          <Text className="text-sub-header-1 font-regular leading-6">
            3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            incidunt odio quibusdam. Culpa accusamus, quisquam, autem doloribus
            commodi excepturi expedita illum, assumenda incidunt reiciendis
            itaque quod facere tempore eum amet.
          </Text>
          <Text className="text-sub-header-1 font-regular leading-6">
            4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            incidunt odio quibusdam. Culpa accusamus, quisquam, autem doloribus
            commodi excepturi expedita illum, assumenda incidunt reiciendis
            itaque quod facere tempore eum amet.
          </Text>
          <Text className="text-sub-header-1 font-regular leading-6">
            5. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            incidunt odio quibusdam. Culpa accusamus, quisquam, autem doloribus
            commodi excepturi expedita illum, assumenda incidunt reiciendis
            itaque quod facere tempore eum amet.
          </Text> */}
          {form === "loginPage" ? (
            <View className="flex flex-col space-y-5 pt-5">
              <View className="border-b-[0.5px] border-black"></View>
              <View className="flex flex-col mr-6 space-y-2">
                <TouchableOpacity
                  onPress={() => setAcceptFirstPolicy(!acceptFirstPolicy)}
                  className="flex flex-row space-x-3"
                >
                  <View className="mt-3 bg-white rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    {acceptFirstPolicy ? (
                      <View className="bg-orange rounded-full w-[10px] h-[10px]"></View>
                    ) : null}
                  </View>
                  <Text className="text-sub-header-1 font-regular leading-6">
                    I acknowledge that I have read and understood the
                    ModCampaign Privacy Policy, which explains how my personal
                    information is collected, used, and disclosed.
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setAcceptSecondPolicy(!acceptSecondPolicy)}
                  className="flex flex-row space-x-3"
                >
                  <View className="mt-3 bg-white rounded-full w-[20px] h-[20px] flex items-center justify-center">
                    {acceptSecondPolicy ? (
                      <View className="bg-orange rounded-full w-[10px] h-[10px]"></View>
                    ) : null}
                  </View>
                  <Text className="text-sub-header-1 font-regular leading-6">
                    I agree to the terms and conditions of the ModCampaign
                    Privacy Policy, which govern my use of the app and my rights
                    and responsibilities.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
      {form === "loginPage" ? (
        <View
          style={{ width: SCREEN_WIDTH * 0.8 }}
          className=" flex flex-row justify-between space-x-7 my-9"
        >
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/page/login",
              })
            }
            className="py-2 rounded-3xl"
          >
            <Text className="w-full text-gray text-sub-header-1 font-medium text-center">
              Decline
            </Text>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/page/login/ConnectDevice",
              })
            }
            disabled={!acceptFirstPolicy || !acceptSecondPolicy}
            className={`py-2 px-12 rounded-3xl  ${
              acceptFirstPolicy && acceptSecondPolicy ? "bg-orange" : "bg-gray"
            }`}
          >
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Accept
            </Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Policy;
