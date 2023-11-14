import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import CampaignCard from "./Card";
import { ScrollView } from "react-native-gesture-handler";
import { API_URL } from "@env";

const CampaignList = (props: {
  header: string;
  data: any;
  handlePress: any;
  isLoading: boolean;
}) => {
  return (
    <View className="w-full flex flex-cols mb-7">
      <View className="w-full flex flex-col space-y-2">
        <View className="w-full flex flex-row justify-between px-4">
          <Text className="text-black text-header-4 font-semibold">
            {props.header}
          </Text>
          <Pressable onPress={props.handlePress}>
            <Text className="text-orange text-sub-header-1 font-medium">
              See all
            </Text>
          </Pressable>
        </View>
        {props.isLoading && props.data.length === 0 ? (
          <ActivityIndicator size="large" color="#FF7410" className="py-10" />
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="w-full pl-4 flex space-x-4 pb-2"
          >
            <View className="flex flex-row space-x-3 pr-8">
              {props.data?.map((campaign: any) => {
                return (
                  <View className="flex flex-col" key={campaign.id}>
                    <CampaignCard data={campaign} type={"campaign"} />
                  </View>
                );
              })}
              {/* <ThemeText>asdasd</ThemeText> */}
              {/* <Text>{API_URL}</Text> */}
              {/* {campaignList.data} */}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default CampaignList;
