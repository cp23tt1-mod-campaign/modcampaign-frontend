import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  router,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useRoute } from "@react-navigation/native";
import ListPopular from "./Popular";
import ListLatest from "./Latest";
import ListJoined from "./Joined";
import ListOngoing from "./Ongoing";
import ListCompleted from "./Completed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CampaignEntity } from "store/campaign/campaign.entity";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import {
  getCampaignDetail,
  getCampaignLeaderBoard,
  joinCampaign,
} from "../../../../store/campaign/campaign.slice";
import UtilModal from "../../../../Util/Modal";
import dayjs from "dayjs";

const TopTabs = createMaterialTopTabNavigator();

const CampaignList = () => {
  // const route = useRoute();
  // const { params } = route;
  const route = useRoute();
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const { listType } = route.params as any;
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showJoinSuccessModal, setShowJoinSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorLimitModal, setShowErrorLimitModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEntity>();
  // const glob = useGlobalSearchParams();
  // const { listType } = glob;
  // const local = useLocalSearchParams();
  const handleJoined = (item: any) => {
    setSelectedCampaign(item);
    setShowJoinModal(true);
  };
  const joinCampaignState = async (campaignId: any, userId: any) => {
    setShowJoinModal(false);
    const joinedDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss.SSS");
    const targetValue = 0;

    const res: any = await dispatch(
      joinCampaign({ campaignId, userId, targetValue, joinedDate })
    );
    if (res.payload?.statusCode === 200) {
      setTimeout(() => {
        setShowJoinSuccessModal(true);
      }, 1000);

      setTimeout(() => {
        setShowJoinSuccessModal(false);
        router.push({
          pathname: "/(tabs)/Campaign",
        });
      }, 3000);
    } else if (res.payload?.statusCode === 400) {
      setTimeout(() => {
        setShowErrorModal(true);
      }, 1000);
      setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);
    } else {
      setTimeout(() => {
        setShowErrorLimitModal(true);
      }, 1000);
      setTimeout(() => {
        setShowErrorLimitModal(false);
      }, 3000);
    }
  };
  const handleSelectCampaign = async (item: any, routeName: any) => {
    await dispatch(getCampaignDetail({ id: Number(item.id) }));
    if (routeName === "Joined Campaign") {
      await dispatch(
        getCampaignLeaderBoard({
          campaignId: Number(item.id),
          userId: userProfile.userId,
          limit: 3,
        })
      );
    }
    setSelectedCampaign(item);
    router.push({
      pathname: "/page/campaign/detail/[id]",
      params: { id: item.id, type: routeName },
    });
  };
  return (
    <View className="h-full">
      <TopTabs.Navigator
        initialRouteName={
          listType === "popular"
            ? "Popular Campaign"
            : listType === "latest"
            ? "Latest Campaign"
            : "Joined Campaign"
        }
        screenOptions={({ route, navigation }) => ({
          tabBarIndicatorStyle: {
            backgroundColor: "#FF7410",
            width: 125,
            marginLeft: 10,
          },
          tabBarLabel: ({ focused, color }) => {
            return (
              <Text
                style={[
                  focused ? styles.activeLabel : styles.pillLabel,
                  { fontSize: 14, fontWeight: "normal" },
                ]}
                className="text-center"
              >
                {route.name}
              </Text>
            );
          },
        })}
      >
        {/* <TopTabs.Screen
          name="Popular Campaign"
          component={ListPopular}
        /> */}
        <TopTabs.Screen name="Popular Campaign">
          {(props) => (
            <ListPopular
              {...props}
              handleJoined={handleJoined}
              handleSelectedCampaign={handleSelectCampaign}
            />
          )}
        </TopTabs.Screen>
        <TopTabs.Screen name="Latest Campaign">
          {(props) => (
            <ListLatest
              {...props}
              handleJoined={handleJoined}
              handleSelectedCampaign={handleSelectCampaign}
            />
          )}
        </TopTabs.Screen>
        <TopTabs.Screen name="Joined Campaign">
          {(props) => (
            <ListJoined
              {...props}
              handleSelectedCampaign={handleSelectCampaign}
            />
          )}
        </TopTabs.Screen>
      </TopTabs.Navigator>
      <UtilModal
        primaryColor="bg-blue"
        iconText="i"
        isShowModal={showJoinModal}
        isMustInteract={true}
        acceptText="Yes"
        declineText="Not now"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAccept={() =>
          joinCampaignState(selectedCampaign?.id, userProfile.userId)
        }
        handleDecline={() => setShowJoinModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center">
          Do you want to join{"\n"}"{selectedCampaign?.name}" ?
        </Text>
      </UtilModal>
      <UtilModal
        primaryColor="bg-green"
        iconCategory="MaterialCommunityIcons"
        iconName="check"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showJoinSuccessModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          You've Successfully{"\n"}Joined the Campaign !
        </Text>
      </UtilModal>
      <UtilModal
        primaryColor="bg-red"
        iconText="i"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showErrorModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          Error please contact admin.
        </Text>
      </UtilModal>
      <UtilModal
        primaryColor="bg-red"
        iconText="i"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showErrorLimitModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          This campaign is full.
        </Text>
      </UtilModal>
    </View>
  );
};

export default CampaignList;
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
