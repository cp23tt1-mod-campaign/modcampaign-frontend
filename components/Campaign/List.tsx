import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Button,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import CampaignCard from "./Card";
import { ScrollView } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import { useAppSelector, useAppDispatch } from "../../store/root.store";
import {
  getCampaignDetail,
  getCampaignLeaderBoard,
} from "../../store/campaign/campaign.slice";

const CampaignList = (props: {
  header: string;
  data: Array<any>;
  handlePress: any;
}) => {
  const isLoadingState = useAppSelector((state) => state.campaign.isLoading);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const skeletonAmount = [1, 2, 3];
  const opacity = useRef(new Animated.Value(0));
  const dispatch = useAppDispatch();
  const selectCampaign = async (id: number) => {
    await dispatch(getCampaignDetail({ id: Number(id) }));
    if (props.header === "Joined Campaign") {
      await dispatch(
        getCampaignLeaderBoard({
          campaignId: id,
          userId: userProfile.userId,
          limit: 3,
        })
      );
    }

    router.push({
      pathname: "/page/campaign/detail/[id]",
      params: { id: id, type: props.header },
    });
  };
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [isLoadingState]);
  const renderViewByType = () => {
    if (props.header === "My Campaign") {
      if (userProfile.role === "Creator" || userProfile.role === "Admin") {
        return (
          <View className="w-full flex flex-cols mb-7">
            <View className="w-full flex flex-col space-y-2">
              <View className="w-full flex flex-row justify-between items-center px-4">
                <Text className="text-black text-header-4 font-semibold">
                  {props.header}
                </Text>
                <Pressable onPress={props.handlePress}>
                  <Text className="text-orange text-sub-header-1 font-medium">
                    See all
                  </Text>
                </Pressable>
              </View>
              {isLoadingState ? (
                //  skeleton card
                // <ActivityIndicator size="large" color="#FF7410" className="py-10" />
                <View className="w-full pl-4 flex flex-row space-x-4 pb-2">
                  {skeletonAmount.map((item) => {
                    return (
                      <View
                        key={item}
                        className="flex flex-col bg-white w-[204px]  rounded-lg"
                      >
                        <Animated.View
                          style={{ opacity: opacity.current }}
                          className="w-full h-[132px] bg-gray-3 rounded-t-lg"
                        ></Animated.View>
                        <View className="flex pb-3">
                          <Animated.View
                            style={{ opacity: opacity.current }}
                            className="bg-gray-3 mx-3 mr-7 my-2 h-[11px] rounded-[4px]"
                          ></Animated.View>
                          <Animated.View
                            style={{ opacity: opacity.current }}
                            className="bg-gray-3 ml-3 mr-14 h-[8px] rounded-[4px]"
                          ></Animated.View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ) : props.data.length > 0 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="w-full pl-4 flex flex-row space-x-4 pb-2"
                >
                  <View className="flex flex-row space-x-3 pr-8 w-full justify-center items-center">
                    {props.data ? (
                      props.data?.map((campaign: any) => {
                        return (
                          <Pressable
                            className="flex flex-col"
                            key={campaign.id}
                            onPress={() => selectCampaign(campaign.id)}
                          >
                            {/* <View className="flex flex-col" key={campaign.id}> */}
                            <CampaignCard
                              data={campaign}
                              type={"campaign"}
                              key={campaign.id}
                            />
                            {/* </View> */}
                          </Pressable>
                        );
                      })
                    ) : (
                      <Text className="text-center">No data</Text>
                    )}
                  </View>
                </ScrollView>
              ) : (
                <Text className="text-sub-header-2 text-gray pl-6">
                  No display data
                </Text>
              )}
              {/* {: (
            <Text>No data</Text>
          )} */}
            </View>
          </View>
        );
      }
    } else {
      return (
        <View className="w-full flex flex-cols mb-7">
          <View className="w-full flex flex-col space-y-2">
            <View className="w-full flex flex-row justify-between items-center px-4">
              <Text className="text-black text-header-4 font-semibold">
                {props.header}
              </Text>
              <Pressable onPress={props.handlePress}>
                <Text className="text-orange text-sub-header-1 font-medium">
                  See all
                </Text>
              </Pressable>
            </View>
            {isLoadingState ? (
              //  skeleton card
              // <ActivityIndicator size="large" color="#FF7410" className="py-10" />
              <View className="w-full pl-4 flex flex-row space-x-4 pb-2">
                {skeletonAmount.map((item) => {
                  return (
                    <View
                      key={item}
                      className="flex flex-col bg-white w-[204px]  rounded-lg"
                    >
                      <Animated.View
                        style={{ opacity: opacity.current }}
                        className="w-full h-[132px] bg-gray-3 rounded-t-lg"
                      ></Animated.View>
                      <View className="flex pb-3">
                        <Animated.View
                          style={{ opacity: opacity.current }}
                          className="bg-gray-3 mx-3 mr-7 my-2 h-[11px] rounded-[4px]"
                        ></Animated.View>
                        <Animated.View
                          style={{ opacity: opacity.current }}
                          className="bg-gray-3 ml-3 mr-14 h-[8px] rounded-[4px]"
                        ></Animated.View>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : props.data.length > 0 ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="w-full pl-4 flex flex-row space-x-4 pb-2"
              >
                <View className="flex flex-row space-x-3 pr-8 w-full justify-center items-center">
                  {props.data ? (
                    props.data?.map((campaign: any) => {
                      return (
                        <Pressable
                          className="flex flex-col"
                          key={campaign.id}
                          onPress={() => selectCampaign(campaign.id)}
                        >
                          {/* <View className="flex flex-col" key={campaign.id}> */}
                          <CampaignCard
                            data={campaign}
                            type={"campaign"}
                            key={campaign.id}
                          />
                          {/* </View> */}
                        </Pressable>
                      );
                    })
                  ) : (
                    <Text className="text-center">No data</Text>
                  )}
                </View>
              </ScrollView>
            ) : (
              <Text className="text-sub-header-2 text-gray pl-6">
                No display data
              </Text>
            )}
            {/* {: (
          <Text>No data</Text>
        )} */}
          </View>
        </View>
      );
    }
  };
  return <View>{renderViewByType()}</View>;
};
export default CampaignList;
