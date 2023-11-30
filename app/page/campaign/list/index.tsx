import { View, Text } from "react-native";
import React from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import Swiper from "react-native-screens-swiper";
import ListPopular from "./popular";
import ListLatest from "./latest";
import ListJoined from "./joined";

const pageCampaignList = () => {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const data = [
    {
      tabLabel: "Popular Campaign",
      component: ListPopular,
    },
    {
      tabLabel: "Latest Campaign",
      component: ListLatest,
    },
    {
      tabLabel: "Joined Campaign",
      component: ListJoined,
    },
  ];

  return (
    <View className="w-full">
      <Text>campaign list {local.listType}</Text>
      {/* <Swiper
        data={data}
        isStaticPills={true}
        style={styles}
        stickyHeaderEnabled={true}
        scrollableContainer={true}
      /> */}
    </View>

    // <View>
    //   <Text>
    //     campaign list {glob.listType}
    //     {local.listType}
    //   </Text>
    // </View>
  );
};

export default pageCampaignList;
const styles = {
  borderActive: {
    borderColor: "#ba2d65",
  },
  pillLabel: {
    color: "#000000",
  },
  activeLabel: {
    color: "#ba2d65",
  },
  pilButton: {
    backgroundColor: "blue",
  },
};
