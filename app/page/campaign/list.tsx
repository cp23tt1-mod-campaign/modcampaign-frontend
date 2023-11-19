import { View, Text } from "react-native";
import React from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";

const pageCampaignList = () => {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  return (
    <View>
      <Text>
        campaign {glob.listType} {local.listType}
      </Text>
    </View>
  );
};

export default pageCampaignList;
