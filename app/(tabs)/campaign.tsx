import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import { Text as ThemeText } from "../../components/Themed";

import React, { useEffect } from "react";
// import { API_URL } from "@env";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  getCampaignList,
  getCampaignDetail,
} from "../../store/campaign/campaign.slice";
import { ScrollView } from "react-native-gesture-handler";
import { UtilIcon } from "../../Util/Icon";

const home = () => {
  const dispatch = useAppDispatch();
  const campaignList = useAppSelector((state) => state.campaign.campaignList);
  const selectedCampaign = useAppSelector(
    (state) => state.campaign.selectedCampaign
  );
  const seeAllCampaign = () => {
    console.log("you press it");
  };
  useEffect(() => {
    dispatch(getCampaignList());
    dispatch(getCampaignDetail(3));
  }, []);

  return (
    <SafeAreaView className="flex flex-col w-full">
      <ScrollView>
        <View className="w-full flex justify-center items-center mb-4">
          <Text className="text-header-1 font-bold">Navbar</Text>
        </View>
        <View className="flex flex-col space-y-7">
          <View className="w-full flex flex-cols ">
            <View className="w-full flex flex-col space-y-2">
              <View className="w-full flex flex-row justify-between px-4">
                <Text className="text-black text-header-4 font-bold">
                  Popular Campaign
                </Text>
                <Pressable onPress={seeAllCampaign}>
                  <Text className="text-orange text-sub-header-1 font-medium">
                    See all
                  </Text>
                </Pressable>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="pl-4 flex space-x-4"
              >
                <View className="flex flex-row space-x-3">
                  {/* <ThemeText>asdasd</ThemeText> */}
                  {/* <Text>{API_URL}</Text> */}
                  {/* {campaignList.data} */}
                  {campaignList.map((campaign) => {
                    return (
                      <View className="flex flex-col w-[12.75rem] h-full">
                        <Image
                          source={{
                            // uri: "https://reactjs.org/logo-og.png",
                            uri: "https://api.slingacademy.com/public/sample-photos/1.jpeg",
                          }}
                          style={{ width: 204, height: 132 }}
                          className="rounded-t-lg"
                        />
                        <View
                          key={campaign.id}
                          className="w-[204px] bg-white rounded-b-lg px-3 py-2 space-y-1"
                        >
                          <Text className="text-black text-sub-header-1 font-medium">
                            {campaign.name}
                          </Text>
                          <View className="flex flex-row space-x-1">
                            <UtilIcon
                              category="MaterialCommunityIcons"
                              name={"calendar-month"}
                              size={16}
                              color={"#929292"}
                            />
                            <Text className="text-gray text-small font-medium">
                              07/11/2023 - 31/12/2023
                            </Text>
                          </View>
                          {/* <Text>{campaign.description}</Text> */}
                          {/* <Text>{campaign.start}</Text>
              <Text>{campaign.end}</Text> */}
                          {/* <Text>{campaign.type}</Text>
                          <Text>{campaign.userLimit}</Text>
                          <Text>{campaign.category}</Text>
                          <Text>{campaign.categoryTarget}</Text> */}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>

          <View>
            <Text className="text-header-1 font-bold">CampaignDetail</Text>
            <Text>{selectedCampaign?.name}</Text>
            <Text>{selectedCampaign?.description}</Text>
            {/* <Text>{selectedCampaign.start}</Text>
          <Text>{selectedCampaign.end}</Text> */}
            <Text>{selectedCampaign?.type}</Text>
            <Text>{selectedCampaign?.userLimit}</Text>
            <Text>{selectedCampaign?.category}</Text>
            <Text>{selectedCampaign?.categoryTarget}</Text>
          </View>
        </View>

        {/* <View>
        <Text>asd</Text>
        <FlatList
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
