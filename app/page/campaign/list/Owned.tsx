import { View, Text, Pressable, Vibration } from "react-native";
import React, { useState } from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";

import ListOngoing from "./Ongoing";
import ListCompleted from "./Completed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import { CampaignEntity } from "../../../../store/campaign/campaign.entity";
import UtilModal from "../../../../Util/Modal";
import { useAppDispatch } from "../../../../store/root.store";
import { cancelCampaign } from "../../../../store/campaign/campaign.slice";

const TopTabs = createMaterialTopTabNavigator();

const OwnedCampaignList = () => {
  // const route = useRoute();
  // const { params } = route;
  const route = useRoute();
  // const { listType } = route.params as any;
  const dispatch = useAppDispatch();

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEntity>();

  const handleCancel = (item: any) => {
    Vibration.vibrate(1000);
    setSelectedCampaign(item);
    setShowCancelModal(true);
  };
  const deleteCampaignState = async (campaignId: any, userId: any) => {
    // console.log("delete, ", campaignId, userId);
    const res: any = await dispatch(cancelCampaign({ campaignId, userId }));
    setShowCancelModal(false);

    if (res.payload?.statusCode === 200) {
      setTimeout(() => {
        setShowCancelSuccessModal(true);
      }, 1000);

      setTimeout(() => {
        setShowCancelSuccessModal(false);
        router.push({
          pathname: "/(tabs)/Campaign",
        });
      }, 3000);
    }
  };
  const handleSelectCampaign = (item: any, routeName: any) => {
    setSelectedCampaign(item);
    router.push({
      pathname: "/page/campaign/detail/[id]",
      params: { id: item.id, type: routeName },
    });
  };
  const createCampaign = () => {
    router.push({
      pathname: "/page/campaign/Create",
    });
  };
  return (
    <View className="h-full bg-white">
      <TopTabs.Navigator
        className="mb-2"
        screenOptions={({ route, navigation }) => ({
          tabBarIndicatorStyle: {
            backgroundColor: "#FF7410",
            width: 180,
            marginLeft: 20,
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={[
                  focused ? styles.activeLabel : styles.pillLabel,
                  { fontSize: 14, fontWeight: "bold" },
                ]}
              >
                {route.name}
              </Text>
            );
          },
        })}
      >
        <TopTabs.Screen name="Ongoing Campaign">
          {(props) => (
            <ListOngoing
              {...props}
              handleCancel={handleCancel}
              handleSelectedCampaign={handleSelectCampaign}
            />
          )}
        </TopTabs.Screen>
        <TopTabs.Screen name="Completed Campaign">
          {(props) => (
            <ListCompleted
              {...props}
              handleSelectedCampaign={handleSelectCampaign}
            />
          )}
        </TopTabs.Screen>
      </TopTabs.Navigator>
      <Pressable
        onPress={() => createCampaign()}
        className="flex flex-row justify-center items-center"
      >
        <View className="bg-orange mb-10 py-3 px-20 rounded-3xl">
          <Text className="w-full text-white text-sub-header-1 font-medium text-center">
            Create a New Campaign
          </Text>
        </View>
      </Pressable>
      <UtilModal
        primaryColor="bg-red"
        iconCategory="MaterialCommunityIcons"
        iconName="close"
        isShowModal={showCancelModal}
        isMustInteract={true}
        acceptText="Confirm"
        declineText="Cancel"
        animationIn="shake"
        animationOut="zoomOut"
        handleAccept={() => deleteCampaignState(selectedCampaign?.id, 1)}
        handleDecline={() => setShowCancelModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          Do you want to cancel{"\n"}"
          <Text className="text-red">{selectedCampaign?.name}</Text>" ?
        </Text>
      </UtilModal>
      <UtilModal
        primaryColor="bg-green"
        iconCategory="MaterialCommunityIcons"
        iconName="check"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showCancelSuccessModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          Campaign cancelled{"\n"}successfully !
        </Text>
      </UtilModal>
    </View>
  );
};

export default OwnedCampaignList;
const styles = {
  borderActive: {
    borderColor: "#FF7410",
  },
  pillLabel: {
    color: "#929292",
  },
  activeLabel: {
    color: "#FF7410",
  },
  pilButton: {
    backgroundColor: "blue",
  },
};
