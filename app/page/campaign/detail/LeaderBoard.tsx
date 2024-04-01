import {
  View,
  Text,
  BackHandler,
  Image,
  Pressable,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import {
  getCampaignDetail,
  setDefaultState,
  joinCampaign,
  cancelCampaign,
  getCampaignLeaderBoard,
  setDefaultLeaderBoard,
} from "../../../../store/campaign/campaign.slice";
import { ScrollView } from "react-native-gesture-handler";
import UtilIcon from "../../../../Util/Icon";
import dayjs from "dayjs";
// import UtilModal from "../../../../Util/Modal";
import Modal from "react-native-modal";
import UtilModal from "../../../../Util/Modal";
import {
  useNavigationState,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { readRecords } from "react-native-health-connect";
import {
  DistanceRecord,
  RecordResult,
  RecordType,
} from "react-native-health-connect/lib/typescript/types";
import { LeaderBoardEntity } from "store/campaign/campaign.entity";
import { SafeAreaView } from "react-native";

const LeaderBoard = () => {
  const focus = useIsFocused();

  const dispatch = useAppDispatch();
  const leaderBoard = useAppSelector((state) => {
    return state.campaign.leaderBoard;
  });
  const selectedCampaign = useAppSelector(
    (state) => state.campaign.selectedCampaign
  );
  const userProfile = useAppSelector((state) => {
    return state.user.userProfile;
  });
  const today = new Date();
  useEffect(() => {
    if (focus) {
      dispatch(
        getCampaignLeaderBoard({
          campaignId: selectedCampaign.id,
          userId: userProfile.userId,
          limit: 0,
        })
      );
    }
    return () => {
      dispatch(setDefaultLeaderBoard());
    };
  }, [focus]);
  return (
    <SafeAreaView className="bg-bg relative h-full w-full pb-[75px]">
      <ScrollView className="bg-bg mt-5 w-full h-full flex flex-col space-y-4 px-6">
        {leaderBoard.list.map((item: any, index: number) => {
          return (
            <View
              key={`leaderboard-${index}`}
              className="flex flex-row items-center w-full px-4 space-x-3"
            >
              {item.rank > 3 ? (
                <View
                  className={`w-[25px] h-[25px] flex items-center justify-center rounded-full`}
                >
                  <Text
                    className={`text-sub-header-1 font-medium ${
                      leaderBoard.current.displayName === item.displayName
                        ? "text-orange"
                        : "text-gray"
                    }`}
                  >
                    {item.rank}
                  </Text>
                </View>
              ) : item.rank === 1 ? (
                <Image
                  source={require(`../../../../public/images/rank1.png`)}
                  style={{ width: 30, height: 30 }}
                />
              ) : item.rank === 2 ? (
                <Image
                  source={require(`../../../../public/images/rank2.png`)}
                  style={{ width: 30, height: 30 }}
                />
              ) : item.rank === 3 ? (
                <Image
                  source={require(`../../../../public/images/rank3.png`)}
                  style={{ width: 30, height: 30 }}
                />
              ) : null}
              <View className="w-11/12 flex flex-row items-center justify-between">
                <View className="flex flex-row space-x-6 ml-3 items-center truncate">
                  <Image
                    source={{
                      uri: `https://lh3.googleusercontent.com/a/${item?.profileImage}`,
                      width: 40,
                      height: 40,
                    }}
                    className="rounded-full bg-gray"
                  />
                  <Text
                    className={`w-[80px] text-body-2 font-medium ${
                      leaderBoard.current.displayName === item.displayName
                        ? "text-orange"
                        : "text-gray"
                    }`}
                  >
                    {item.displayName}
                  </Text>
                </View>
                <View className="flex flex-row space-x-3 items-center">
                  <Text
                    className={`text-body-3 font-regular ${
                      leaderBoard.current.displayName === item.displayName
                        ? "text-orange"
                        : "text-gray"
                    }`}
                  >
                    {item.targetValue.toLocaleString("en-US")}
                  </Text>
                  <Text
                    className={`text-body-3 font-regular ${
                      leaderBoard.current.displayName === item.displayName
                        ? "text-orange"
                        : "text-gray"
                    }`}
                  >
                    {selectedCampaign.categoryTarget === "Steps"
                      ? "Steps"
                      : "km."}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View className="absolute bottom-0 bg-white w-full py-4 px-6">
        <View className="flex flex-row items-center w-full px-4 space-x-3">
          <View
            className={`w-[25px] h-[25px] flex items-center justify-center rounded-full`}
          >
            {leaderBoard?.current?.rank > 3 ? (
              <Text className={`text-sub-header-1 font-medium text-orange`}>
                {leaderBoard.current.rank}
              </Text>
            ) : leaderBoard.current.rank === 1 ? (
              <Image
                source={require(`../../../../public/images/rank1.png`)}
                style={{ width: 30, height: 30 }}
              />
            ) : leaderBoard.current.rank === 2 ? (
              <Image
                source={require(`../../../../public/images/rank2.png`)}
                style={{ width: 30, height: 30 }}
              />
            ) : leaderBoard.current.rank === 3 ? (
              <Image
                source={require(`../../../../public/images/rank3.png`)}
                style={{ width: 30, height: 30 }}
              />
            ) : null}
          </View>
          <View className="w-11/12 flex flex-row items-center justify-between">
            <View className="flex flex-row space-x-6 ml-3 items-center truncate">
              <Image
                source={{
                  uri: `https://lh3.googleusercontent.com/a/${leaderBoard.current.profileImage}`,
                  width: 40,
                  height: 40,
                }}
                className="rounded-full bg-gray"
              />
              <Text className={`w-[80px] text-body-2 font-medium text-orange`}>
                {leaderBoard.current.displayName}
              </Text>
            </View>
            {dayjs(selectedCampaign.end).isBefore(today) ? (
              <Pressable
                onPress={() => {}}
                className="flex flex-row justify-center"
              >
                {/* <Pressable
                 onPress={() => setShowModal(true)}
                 className="flex flex-row justify-center"
               > */}
                <View className="bg-orange py-1 px-2 rounded-3xl">
                  <Text className="w-full text-white text-body-2 font-medium text-center">
                    Claim Reward
                  </Text>
                </View>
              </Pressable>
            ) : (
              <View className="flex flex-row space-x-3 items-center">
                <Text className={`text-body-3 font-regular text-orange`}>
                  {leaderBoard.current?.targetValue?.toLocaleString("en-US")}
                </Text>
                <Text className={`text-body-3 font-regular text-orange`}>
                  {selectedCampaign.categoryTarget === "Steps"
                    ? "Steps"
                    : "km."}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* <Text>leaderBoard</Text> */}
    </SafeAreaView>
  );
};

export default LeaderBoard;
