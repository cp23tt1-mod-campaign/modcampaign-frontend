import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const pageCampaignDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>detail campaign id: {id}</Text>
    </View>
  );
};

export default pageCampaignDetail;
