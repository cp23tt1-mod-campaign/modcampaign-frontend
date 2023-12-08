import {
  View,
  Text,
  Image,
  Pressable,
  Vibration,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/root.store";
import { getOnGoingCampaignList } from "../../../../store/campaign/campaign.slice";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";
import UtilIcon from "../../../../Util/Icon";
import UtilModal from "../../../../Util/Modal";
import { CampaignEntity } from "store/campaign/campaign.entity";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";

const Ongoing = (props: { handleCancel: any; handleSelectedCampaign: any }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOnGoingCampaignList({ userId: 1 }));
  }, [dispatch]);
  const onGoingCampaignList = useAppSelector(
    (state) => state.campaign.onGoingCampaignList
  );
  const timestamp = new Date().getTime();
  const route = useRoute();

  return (
    <View className="h-full bg-white flex flex-col">
      <FlatList
        className="px-4 py-5 mb-2"
        data={onGoingCampaignList}
        keyExtractor={(item) => {
          return String(item?.id);
        }}
        extraData={onGoingCampaignList}
        renderItem={({ item }) => {
          return (
            <View className="w-full mb-5 border-b-[0.2px] pb-3 border-gray flex-row  justify-between items-center">
              <TouchableOpacity
                onPress={() => props.handleSelectedCampaign(item, route.name)}
              >
                <View className="flex flex-row items-center space-x-3">
                  <Image
                    source={{
                      uri: `https://drive.google.com/uc?id=${item?.image}&t=${timestamp}`,
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
                        {`${dayjs(item?.start).format("DD/MM/YYYY")} - ${dayjs(
                          item?.end
                        ).format("DD/MM/YYYY")}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <Pressable
                className="flex items-center justify-center bg-red w-6 h-6 rounded-full"
                onPress={() => props.handleCancel(item)}
              >
                <UtilIcon
                  category="MaterialCommunityIcons"
                  name={"close"}
                  size={18}
                  color={"#FFFFFF"}
                />
              </Pressable>
              {/* <Text className="bg-gray">{JSON.stringify(item?.id)}</Text> */}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Ongoing;
