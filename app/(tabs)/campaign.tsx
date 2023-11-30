import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { Text as ThemeText } from "../../components/Themed";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  getCampaignList,
  getCampaignDetail,
  setDefaultState,
} from "../../store/campaign/campaign.slice";
import CampaignList from "../../components/Campaign/List";
import UtilIcon from "../../Util/Icon";
import { API_IOS_URL, API_ANDROID_URL } from "@env";
import { router } from "expo-router";
import axios from "axios";

const home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);
  const dispatch = useAppDispatch();
  const latestCampaignList = useAppSelector(
    (state) => state.campaign.latestCampaignList
  );
  const popularCampaignList = useAppSelector(
    (state) => state.campaign.popularCampaignList
  );
  const joinedCampaignList = useAppSelector(
    (state) => state.campaign.joinedCampaignList
  );
  const ownedCampaignList = useAppSelector(
    (state) => state.campaign.ownedCampaignList
  );

  useEffect(() => {
    // campaignData.ownedCampaign.isLoading = true;
    // campaignData.popularCampaign.isLoading = true;
    // campaignData.latestCampaign.isLoading = true;
    // campaignData.joinedCampaign.isLoading = true;
    if (refreshing) {
      dispatch(setDefaultState());

      setTimeout(() => {
        setRefreshing(false);
        dispatch(getCampaignList({ listType: "owned", userId: 1 }));
        campaignData.ownedCampaign.isLoading = false;
        dispatch(getCampaignList({ listType: "popular", userId: 1 }));
        campaignData.popularCampaign.isLoading = false;
        dispatch(getCampaignList({ listType: "latest", userId: 1 }));
        campaignData.latestCampaign.isLoading = false;
        dispatch(getCampaignList({ listType: "joined", userId: 1 }));
        campaignData.joinedCampaign.isLoading = false;
      }, 2000);
    } else {
      dispatch(getCampaignList({ listType: "owned", userId: 1 }));
      campaignData.ownedCampaign.isLoading = false;
      dispatch(getCampaignList({ listType: "popular", userId: 1 }));
      campaignData.popularCampaign.isLoading = false;
      dispatch(getCampaignList({ listType: "latest", userId: 1 }));
      campaignData.latestCampaign.isLoading = false;
      dispatch(getCampaignList({ listType: "joined", userId: 1 }));
      campaignData.joinedCampaign.isLoading = false;
      // console.log(
      //   "🚀 ~ file: campaign.tsx:74 ~ useEffect ~ campaignData:",
      //   campaignData
      // );
    }
  }, [dispatch, refreshing]);
  const campaignData = {
    ownedCampaign: {
      header: "My Campaign",
      data: ownedCampaignList,
      handleChange: () => {
        router.push({
          pathname: "/page/campaign/list",
          params: { listType: "owned" },
        });
      },
      isLoading: true,
    },
    popularCampaign: {
      header: "Popular Campaign",
      data: popularCampaignList,
      handleChange: () => {
        router.push({
          pathname: "/page/campaign/list",
          params: { listType: "popular" },
        });
      },
      isLoading: true,
    },
    latestCampaign: {
      header: "Latest Campaign",
      data: latestCampaignList,
      handleChange: () => {
        router.push({
          pathname: "/page/campaign/list",
          params: { listType: "latest" },
        });
      },
      isLoading: true,
    },
    joinedCampaign: {
      header: "Joined Campaign",
      data: joinedCampaignList,
      handleChange: () => {
        router.push({
          pathname: "/page/campaign/list",
          params: { listType: "joined" },
        });
      },
      isLoading: true,
    },
  };
  const createCampaign = () => {
    router.push({
      pathname: "/page/campaign/create",
    });
  };

  return (
    <SafeAreaView className="flex flex-col w-full h-full relative">
      {/* <View className="w-full flex-row justify-between px-4 my-5 items-center">
        <View className="flex flex-row space-x-4 items-center">
          <Image
            source={require("../../assets/images/headerIcon.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text className="text-header-3 font-semibold">Campaign</Text>
        </View>
        <Pressable
          style={({ pressed }) => [pressed ? { opacity: 0.5 } : { opacity: 1 }]}
        >
          <UtilIcon
            category="MaterialIcons"
            name={"notifications-none"}
            size={28}
            color="#000000"
          />
        </Pressable>
      </View> */}
      <Pressable
        className="absolute 
        flex items-center 
        justify-center bottom-0 
        right-0 mb-3 mr-3 bg-orange 
        w-16 h-16 rounded-full z-50 shadow-sm"
        onPress={createCampaign}
      >
        <UtilIcon
          category="MaterialIcons"
          name={"add"}
          size={52}
          color="#FFFFFF"
        />
      </Pressable>
      <ScrollView
        className="w-full h-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-col w-full h-full">
          {/* <Text> {JSON.stringify(campaignData)}</Text> */}
          {Object.entries(campaignData).map(([key, value], i) => {
            return (
              <CampaignList
                header={value.header}
                data={value.data}
                handlePress={value.handleChange}
                isLoading={value.isLoading}
                key={key}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
