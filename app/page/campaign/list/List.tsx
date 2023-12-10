import { View, Text, Pressable, ActivityIndicator, Button } from "react-native";
import React, { useEffect } from "react";
import CampaignCard from "../../../../components/Campaign/Card";
import { ScrollView } from "react-native-gesture-handler";
import { Link, router } from "expo-router";

const CampaignList = (props: {
  header: string;
  data: Array<any>;
  handlePress: any;
  isLoading: boolean;
}) => {
  const selectCampaign = (id: number) => () => {
    router.push({
      pathname: "/page/campaign/detail/[id]",
      params: { id: id, type: props.header },
    });
  };
  // useEffect(() => {
  //   console.log(props.isLoading);
  // }, [props.isLoading]);
  return (
    <View className="w-full flex flex-cols mb-7">
      <View className="w-full flex flex-col space-y-2">
        <View className="w-full flex flex-row justify-between items-center px-4">
          <Text className="text-black text-header-4 font-semibold">
            {props.header}
          </Text>
          {/* <Button
            title="See all"
            color={"#FF7410"}
            onPress={props.handlePress}
          /> */}
          <Pressable onPress={props.handlePress}>
            <Text className="text-orange text-sub-header-1 font-medium">
              See all
            </Text>
          </Pressable>
          {/* </Link> */}
        </View>
        {/* <Text> {JSON.stringify(props.data.length)}</Text>
        <Text> {JSON.stringify(props.isLoading)}</Text> */}
        {props.isLoading && props.data.length === 0 ? (
          <ActivityIndicator size="large" color="#FF7410" className="py-10" />
        ) : (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="w-full pl-4 flex space-x-4 pb-2"
          >
            {/* skeleton card */}
            {/* <View className="flex flex-col bg-white w-[204px] h-full rounded-lg">
              <View className="w-full h-[132px] bg-slate-200 rounded-t-lg"></View>
              <View className="flex space-y-0.5">
                <View className="bg-slate-200 mx-3 mr-7 my-2 h-[15px] rounded-sm">
                  <Text className="text-slate-200">d</Text>
                </View>
                <View className="bg-slate-200 ml-3 mr-14 h-[10px] rounded-sm">
                  <Text className="text-slate-200">d</Text>
                </View>
              </View>
            </View> */}
            <View className="flex flex-row space-x-3 pr-8 w-full justify-center items-center">
              {props.data ? (
                props.data?.map((campaign: any) => {
                  return (
                    <Pressable
                      className="flex flex-col"
                      key={campaign.id}
                      onPress={selectCampaign(campaign.id)}
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
        )}
      </View>
    </View>
  );
};
export default CampaignList;
