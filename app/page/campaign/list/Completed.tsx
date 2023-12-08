import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../store/root.store";
import { getCompletedCampaignList } from "../../../../store/campaign/campaign.slice";
import { FlatList } from "react-native-gesture-handler";
import dayjs from "dayjs";
import UtilIcon from "../../../../Util/Icon";
import { CampaignEntity } from "store/campaign/campaign.entity";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";

const Completed = (props: { handleSelectedCampaign: any }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCompletedCampaignList({ userId: 1 }));
  }, [dispatch]);
  const completedCampaignList = useAppSelector(
    (state) => state.campaign.completedCampaignList
  );
  const timestamp = new Date().getTime();
  const route = useRoute();

  return (
    <View className="h-full bg-white flex flex-col">
      <FlatList
        className="px-4 py-5 mb-2"
        data={completedCampaignList}
        keyExtractor={(item) => {
          return String(item?.id);
        }}
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
            </View>
          );
        }}
      />
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
