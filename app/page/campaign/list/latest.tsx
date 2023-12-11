import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import { CampaignEntity } from "store/campaign/campaign.entity";
import { FlatList } from "react-native-gesture-handler";
import dayjs from "dayjs";
import UtilIcon from "../../../../Util/Icon";
import UtilModal from "../../../../Util/Modal";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";

const ListLatest = (props: {
  handleJoined: any;
  handleSelectedCampaign: any;
}) => {
  const latestCampaignList = useAppSelector(
    (state) => state.campaign.latestCampaignList
  );
  const timestamp = new Date().getTime();
  const route = useRoute();

  return (
    <View className="h-full bg-white flex flex-col">
      <FlatList
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
                        {`${dayjs(item?.start).format("DD/MM/YYYY")} - ${dayjs(
                          item?.end
                        ).format("DD/MM/YYYY")}`}
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
    </View>
  );
};

export default ListLatest;
