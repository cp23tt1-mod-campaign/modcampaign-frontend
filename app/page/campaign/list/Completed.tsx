import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/root.store";
import {
  getCompletedCampaignList,
  setLoading,
} from "../../../../store/campaign/campaign.slice";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import dayjs from "dayjs";
import UtilIcon from "../../../../Util/Icon";
import { CampaignEntity } from "store/campaign/campaign.entity";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";

const Completed = (props: { handleSelectedCampaign: any }) => {
  const dispatch = useAppDispatch();

  const completedCampaignList = useAppSelector(
    (state) => state.campaign.completedCampaignList
  );
  const today = new Date();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const isLoadingState = useAppSelector((state) => state.campaign.isLoading);
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const onRefresh = useCallback(() => {
    dispatch(setLoading(true));
    setRefreshing(true);
  }, []);

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
        dispatch(setLoading(false));
        dispatch(getCompletedCampaignList({ userId: userProfile.userId }));
      }, 2000);
    } else {
      dispatch(getCompletedCampaignList({ userId: userProfile.userId }));
    }
  }, [dispatch, refreshing]);
  const skeletonAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const opacity = useRef(new Animated.Value(0));
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
  return (
    <View className="h-full bg-white flex flex-col">
      {isLoadingState ? (
        <View className="px-4 py-5 mb-2">
          {skeletonAmount.map((item) => {
            return (
              <View
                key={item}
                className="w-full mb-5 border-b-[0.2px] pb-3 border-gray flex-row  justify-between items-center"
              >
                <View className="flex flex-row items-center space-x-3">
                  <Animated.View
                    style={{ opacity: opacity.current }}
                    className="w-[142px] h-[92px] bg-gray-3 rounded-lg"
                  ></Animated.View>
                  <View className="flex flex-col space-y-2">
                    <Animated.View
                      style={{ opacity: opacity.current }}
                      className="w-[150px] h-[20px] bg-gray-3 rounded-[4px]"
                    ></Animated.View>
                    <Animated.View
                      style={{ opacity: opacity.current }}
                      className="w-[150px] h-[14px] bg-gray-3 rounded-[4px]"
                    ></Animated.View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : completedCampaignList.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="px-4 py-5 mb-2"
          data={completedCampaignList}
          keyExtractor={(item) => {
            return String(item?.id);
          }}
          renderItem={({ item }) => {
            return (
              <View className="w-full mb-5 border-b-[0.2px] pb-3 border-gray flex-row  justify-between items-center">
                <TouchableOpacity
                  className="max-w-[300px]"
                  onPress={() => props.handleSelectedCampaign(item, route.name)}
                >
                  <View className="flex flex-row items-center space-x-3">
                    <Image
                      source={{
                        uri: `https://storage.googleapis.com/modcampaign-images/${item?.image}`,
                        width: 142,
                        height: 92,
                      }}
                      className="rounded-lg bg-gray"
                    />
                    <View className="flex flex-col space-y-2">
                      <Text className="text-black text-sub-header-1 font-semibold">
                        {item?.name}
                      </Text>
                      <View className="flex flex-row space-x-1 items-center">
                        <UtilIcon
                          category="MaterialCommunityIcons"
                          name={"calendar-month"}
                          size={16}
                          color={"#929292"}
                        />
                        <Text className="text-gray text-small font-medium">
                          {`${dayjs(item?.start).format(
                            "DD/MM/YYYY"
                          )} - ${dayjs(item?.end).format("DD/MM/YYYY")}`}
                        </Text>
                      </View>
                      {dayjs(item?.end).isBefore(today) ? (
                        <View className="bg-orange-2 rounded-xl flex flex-row justify-center w-[80px] px-3 py-1">
                          <Text className="text-orange text-small font-medium">
                            Completed
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <ScrollView
          className="flex flex-col h-full w-full "
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text className="text-center text-gray text-small font-medium mt-10">
            You have no completed campaign
          </Text>
        </ScrollView>
      )}
    </View>
  );
};
// const styles = StyleSheet.create({
//   triangle: {
//     width: 0,
//     height: 0,
//     backgroundColor: "transparent",
//     borderStyle: "solid",
//     borderLeftWidth: 60,
//     borderRightWidth: 60,
//     borderBottomWidth: 100,
//     // borderRadius: 30,
//     borderLeftColor: "transparent",
//     borderRightColor: "transparent",
//     borderBottomColor: "#F9A407",
//   },
//   getStartedContainer: {
//     alignItems: "center",
//     marginHorizontal: 50,
//   },
//   homeScreenFilename: {
//     marginVertical: 7,
//   },
//   codeHighlightContainer: {
//     borderRadius: 3,
//     paddingHorizontal: 4,
//   },
//   getStartedText: {
//     fontSize: 17,
//     lineHeight: 24,
//     textAlign: "center",
//   },
//   helpContainer: {
//     marginTop: 15,
//     marginHorizontal: 20,
//     alignItems: "center",
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     textAlign: "center",
//   },
// });
export default Completed;
