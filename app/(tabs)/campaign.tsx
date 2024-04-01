import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Pressable,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { Text as ThemeText } from "../../components/Themed";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  getCampaignList,
  setDefaultState,
  setLoading,
} from "../../store/campaign/campaign.slice";
import UtilIcon from "../../Util/Icon";
import { API_IOS_URL, API_ANDROID_URL } from "@env";
const API_URL = Platform.OS === "ios" ? API_IOS_URL : API_ANDROID_URL;
import { router } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";
import CampaignList from "../../components/Campaign/List";

const Campaign = () => {
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute();

  const onRefresh = useCallback(() => {
    dispatch(setLoading(true));
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
  const userProfile = useAppSelector((state) => state.user.userProfile);
  // const [campaignData, setCampaignData] = useState({
  //   ownedCampaign: {
  //     header: "My Campaign",
  //     data: ownedCampaignList,
  //     handleChange: () => {
  //       // navigate("CampaignList");
  //       router.push({
  //         pathname: "/page/campaign/list/Owned",
  //         params: { listType: "owned" },
  //       });
  //     },
  //   },
  //   popularCampaign: {
  //     header: "Popular Campaign",
  //     data: popularCampaignList,
  //     handleChange: () => {
  //       router.push({
  //         pathname: "/page/campaign/list",
  //         params: { listType: "popular" },
  //       });
  //     },
  //   },
  //   latestCampaign: {
  //     header: "Latest Campaign",
  //     data: latestCampaignList,
  //     handleChange: () => {
  //       router.push({
  //         pathname: "/page/campaign/list",
  //         params: { listType: "latest" },
  //       });
  //     },
  //   },
  //   joinedCampaign: {
  //     header: "Joined Campaign",
  //     data: joinedCampaignList,
  //     handleChange: () => {
  //       router.push({
  //         pathname: "/page/campaign/list",
  //         params: { listType: "joined" },
  //       });
  //     },
  //   },
  // });
  const campaignData = {
    ownedCampaign: {
      header: "My Campaign",
      data: ownedCampaignList,
      handleChange: () => {
        // navigate("CampaignList");
        router.push({
          pathname: "/page/campaign/list/Owned",
          params: { listType: "owned" },
        });
      },
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
    },
  };
  useEffect(() => {
    // campaignData.ownedCampaign.isLoading = true;
    // campaignData.popularCampaign.isLoading = true;
    // campaignData.latestCampaign.isLoading = true;
    // campaignData.joinedCampaign.isLoading = true;
    // console.log(userProfile.role);

    if (refreshing) {
      // dispatch(setDefaultState());

      setTimeout(() => {
        setRefreshing(false);
        dispatch(setLoading(false));
        if (userProfile.role === "Creator" || userProfile.role === "Admin") {
          dispatch(
            getCampaignList({ listType: "owned", userId: userProfile.userId })
          );
          // setCampaignData((prev) => ({
          //   ...prev,
          //   ownedCampaign: {
          //     ...prev.ownedCampaign,
          //     data: ownedCampaignList,
          //   },
          // }));
        }
        dispatch(
          getCampaignList({ listType: "popular", userId: userProfile.userId })
        );
        // setCampaignData((prev) => ({
        //   ...prev,
        //   popularCampaign: {
        //     ...prev.popularCampaign,
        //     data: popularCampaignList,
        //   },
        // }));
        dispatch(
          getCampaignList({ listType: "latest", userId: userProfile.userId })
        );
        // setCampaignData((prev) => ({
        //   ...prev,
        //   latestCampaign: {
        //     ...prev.latestCampaign,
        //     data: latestCampaignList,
        //   },
        // }));
        dispatch(
          getCampaignList({ listType: "joined", userId: userProfile.userId })
        );
        // setCampaignData((prev) => ({
        //   ...prev,
        //   joinedCampaign: {
        //     ...prev.latestCampaign,
        //     data: joinedCampaignList,
        //   },
        // }));
      }, 2000);
    } else {
      dispatch(setLoading(true));

      if (userProfile.role === "Creator" || userProfile.role === "Admin") {
        dispatch(
          getCampaignList({ listType: "owned", userId: userProfile.userId })
        );
        // setCampaignData((prev) => ({
        //   ...prev,
        //   ownedCampaign: {
        //     ...prev.ownedCampaign,
        //     data: ownedCampaignList,
        //   },
        // }));
      }
      dispatch(
        getCampaignList({ listType: "popular", userId: userProfile.userId })
      );
      // setCampaignData((prev) => ({
      //   ...prev,
      //   popularCampaign: {
      //     ...prev.popularCampaign,
      //     data: popularCampaignList,
      //   },
      // }));
      dispatch(
        getCampaignList({ listType: "latest", userId: userProfile.userId })
      );
      // setCampaignData((prev) => ({
      //   ...prev,
      //   latestCampaign: {
      //     ...prev.latestCampaign,
      //     data: latestCampaignList,
      //   },
      // }));
      dispatch(
        getCampaignList({ listType: "joined", userId: userProfile.userId })
      );
      // setCampaignData((prev) => ({
      //   ...prev,
      //   joinedCampaign: {
      //     ...prev.latestCampaign,
      //     data: joinedCampaignList,
      //   },
      // }));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 2000);
    }
  }, [dispatch, refreshing, route]);

  const createCampaign = () => {
    router.push({
      pathname: "/page/campaign/Create",
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
      {/* <Text>{API_URL}</Text> */}
      {userProfile.role === "Creator" || userProfile.role === "Admin" ? (
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
      ) : null}
      <ScrollView
        className="w-full h-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex flex-col w-full h-full">
          {/* <Text> {JSON.stringify(campaignData)}</Text> */}
          {/* <Text> {API_URL}</Text> */}
          {Object.entries(campaignData).map(([key, value], i) => {
            return (
              <CampaignList
                header={value.header}
                data={value.data}
                handlePress={value.handleChange}
                key={key}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Campaign;
