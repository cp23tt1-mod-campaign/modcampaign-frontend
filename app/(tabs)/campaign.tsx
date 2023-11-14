import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Pressable,
  Image,
} from "react-native";
import { Text as ThemeText } from "../../components/Themed";
import { useEffect, useState, useCallback } from "react";
// import { API_URL } from "@env";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  getCampaignList,
  getCampaignDetail,
  setDefaultState,
} from "../../store/campaign/campaign.slice";
import { ScrollView } from "react-native-gesture-handler";
import CampaignList from "../../components/Campaign/List";
import { UtilIcon } from "../../Util/Icon";

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

  const campaignData = {
    popularCampaign: {
      header: "Popular Campaign",
      data: popularCampaignList,
      handleChange: () => {
        console.log(`you press see all ${campaignData.popularCampaign.header}`);
      },
      isLoading: true,
    },
    latestCampaign: {
      header: "Latest Campaign",
      data: latestCampaignList,
      handleChange: () => {
        console.log(`you press see all ${campaignData.latestCampaign.header}`);
      },
      isLoading: true,
    },
    joinedCampaign: {
      header: "Joined Campaign",
      data: joinedCampaignList,
      handleChange: () => {
        console.log(`you press see all ${campaignData.joinedCampaign.header}`);
      },
      isLoading: true,
    },
  };

  useEffect(() => {
    campaignData.latestCampaign.isLoading = true;
    campaignData.popularCampaign.isLoading = true;
    campaignData.joinedCampaign.isLoading = true;
    if (refreshing) {
      dispatch(setDefaultState());

      setTimeout(() => {
        setRefreshing(false);
        dispatch(getCampaignList({ listType: "latest" }));
        dispatch(getCampaignList({ listType: "popular" }));
        dispatch(getCampaignList({ listType: "joined", userId: 1 }));
        campaignData.latestCampaign.isLoading = false;
        campaignData.popularCampaign.isLoading = false;
        campaignData.joinedCampaign.isLoading = false;
      }, 2000);
    } else {
      dispatch(getCampaignList({ listType: "latest" }));
      dispatch(getCampaignList({ listType: "popular" }));
      dispatch(getCampaignList({ listType: "joined", userId: 1 }));
      campaignData.latestCampaign.isLoading = false;
      campaignData.popularCampaign.isLoading = false;
      campaignData.joinedCampaign.isLoading = false;
    }

    // dispatch(getCampaignDetail({ id: 3 }));
  }, [dispatch, refreshing]);

  return (
    <SafeAreaView className="flex flex-col w-full h-full relative">
      <View className="w-full flex-row justify-between px-4 my-5">
        <View className="flex flex-row space-x-4 items-center">
          <Image
            source={require("../../assets/images/headerIcon.png")}
            style={{ width: 45, height: 45 }}
          />
          <Text className="text-header-3 font-semibold">Campaign</Text>
        </View>
        <Pressable>
          <UtilIcon
            category="MaterialIcons"
            name={"notifications-none"}
            size={32}
            color="#000000"
          />
        </Pressable>
      </View>
      <Pressable className="absolute flex items-center justify-center bottom-0 right-0 mb-3 mr-3 bg-orange w-16 h-16 rounded-full z-50 shadow-sm">
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
