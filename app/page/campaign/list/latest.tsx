import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import { CampaignEntity } from "store/campaign/campaign.entity";
import {
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native-gesture-handler";
import dayjs from "dayjs";
import UtilIcon from "../../../../Util/Icon";
import UtilModal from "../../../../Util/Modal";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import {
  getCampaignList,
  setLoading,
} from "../../../../store/campaign/campaign.slice";
import { Animated } from "react-native";

const ListLatest = (props: {
  handleJoined: any;
  handleSelectedCampaign: any;
}) => {
  const latestCampaignList = useAppSelector(
    (state) => state.campaign.latestCampaignList
  );
  const route = useRoute();
  const dispatch = useAppDispatch();
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
        dispatch(
          getCampaignList({ listType: "latest", userId: userProfile.userId })
        );
      }, 2000);
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
      ) : latestCampaignList.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          className="px-4 py-5 mb-2"
          data={latestCampaignList}
          keyExtractor={(item) => {
            return String(item?.id);
          }}
          extraData={latestCampaignList}
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
                    </View>
                  </View>
                </TouchableOpacity>
                <Pressable
                  className="flex items-center justify-center bg-orange w-6 h-6 rounded-full"
                  onPress={() => props.handleJoined(item)}
                >
                  <UtilIcon
                    category="MaterialIcons"
                    name={"add"}
                    size={18}
                    color={"#FFFFFF"}
                  />
                </Pressable>
                {/* <Text className="bg-gray">{JSON.stringify(item?.id)}</Text> */}
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
            No latest campaign to display
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

export default ListLatest;
