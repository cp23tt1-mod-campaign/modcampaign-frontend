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
  updateCampaignLeaderBoard,
  setDefaultSelectedCampaign,
  sendEmailClaimReward,
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

const CampaignDetail = () => {
  const route = useRoute();
  const focus = useIsFocused();
  // console.log(route.params);

  const { id, type } = route.params as any;
  // console.log(type);

  const dispatch = useAppDispatch();
  const selectedCampaign = useAppSelector(
    (state) => state.campaign.selectedCampaign
  );
  const isConnectedThirdParty = useAppSelector((state) => {
    return state.campaign.isConnectThirdParty;
  });
  const userProfile = useAppSelector((state) => {
    return state.user.userProfile;
  });
  const leaderBoard = useAppSelector((state) => {
    return state.campaign.leaderBoard;
  });
  const leaderBoardLimit = useAppSelector((state) => {
    return state.campaign.leaderBoardLimit;
  });
  const [showModal, setShowModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorLimitModal, setShowErrorLimitModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showClaimSuccessModal, setShowClaimSuccessModal] = useState(false);
  const [campaignTargetValue, setCampaignTargetValue] = useState("");
  const today = new Date();
  const [isCompleted, setIsCompleted] = useState(false);
  // useEffect(() => {

  // }, [dispatch, id]);

  useEffect(() => {
    const checkLeaderBoard = async () => {
      const res: any = await getCampaignTargetValue();
      console.log(res);
      console.log(typeof res);

      // console.log(campaignTargetValue);

      // const intValue = parseInt(campaignTargetValue);
      const intValue = parseFloat(res);
      const leaderBoardCurrentValue: any = leaderBoardLimit.current.targetValue;
      console.log("🚀 ~ checkLeaderBoard ~ intValue:", intValue);
      console.log(
        "🚀 ~ checkLeaderBoard ~ leaderBoardCurrentValue:",
        leaderBoardCurrentValue
      );

      if (leaderBoardCurrentValue < intValue) {
        await dispatch(
          updateCampaignLeaderBoard({
            campaignId: id,
            userId: userProfile.userId,
            targetValue: intValue,
          })
        );
        await dispatch(
          getCampaignLeaderBoard({
            campaignId: id,
            userId: userProfile.userId,
            limit: 3,
          })
        );
      }
    };

    if (focus && type === "Joined Campaign") {
      // console.log(dayjs(selectedCampaign.end).isBefore(today));

      // setIsCompleted(dayjs(selectedCampaign.end).isBefore(today));
      // console.log("🚀 ~ useEffect ~ isCompleted:", isCompleted);

      if (dayjs(selectedCampaign.end).isAfter(today)) {
        checkLeaderBoard();
        dispatch(
          getCampaignLeaderBoard({
            campaignId: id,
            userId: userProfile.userId,
            limit: 3,
          })
        );
      }
    }

    return () => {
      // dispatch(setDefaultLeaderBoard());
      // dispatch(setDefaultSelectedCampaign());
    };
  }, [focus]);

  const getCampaignTargetValue = async () => {
    if (isConnectedThirdParty && dayjs(selectedCampaign.end).isAfter(today)) {
      const target: RecordType = selectedCampaign.categoryTarget as RecordType;
      // console.log(selectedCampaign.categoryTarget);

      // const target = "Distance";

      // console.log(
      //   "🚀 ~ getCampaignTargetValue ~ selectedCampaign.start:",
      //   selectedCampaign.start
      // );

      console.log(
        "🚀 ~ getCampaignTargetValue ~ leaderBoard.current.joinedDate:",
        leaderBoardLimit?.current?.joinedDate
      );
      console.log(
        "🚀 ~ getCampaignTargetValue ~ selectedCampaign.end:",
        selectedCampaign.end
      );

      // const startTime = selectedCampaign.start;
      // const endTime = selectedCampaign.end;
      const startTime = leaderBoardLimit?.current?.joinedDate;
      console.log(startTime);

      const endTime = selectedCampaign.end;
      console.log(new Date());

      const result = await readRecords(target, {
        timeRangeFilter: {
          operator: "between",
          startTime: String(startTime),
          endTime: String(endTime),
          // startTime: "2023-12-10T12:00:00.405Z",
          // endTime: "2023-12-12T23:53:15.405Z",
        },
      });
      // console.log(result);

      if (target === "Distance") {
        const totalDistance = result.reduce(
          (sum, cur: any) => sum + cur.distance.inKilometers,
          0
        );
        console.log(totalDistance);

        return totalDistance.toFixed(2);
        // setCampaignTargetValue(totalDistance.toFixed(2));
      } else {
        const totalSteps = result.reduce((sum, cur: any) => sum + cur.count, 0);

        return totalSteps;
        // setCampaignTargetValue(totalSteps.toLocaleString("en-US"));
      }
    }
  };
  // getCampaignTargetValue();

  const [modalData, setModalData] = useState({
    isShowModal: showModal,
    primaryColor: "bg-blue",
    iconText: "i",
    iconCategory: "",
    iconName: "",
    isMustInteract: true,
    acceptText: "Yes",
    declineText: "Not now",
    animationIn: "zoomIn",
    animationOut: "zoomOut",
    handleAccept: () => joinCampaignState(selectedCampaign.id, 1),
    handleDecline: () => setShowModal(false),
    children: (
      <Text className="text-header-4 font-semibold text-center">
        Do you want to join{"\n"}"{selectedCampaign.name}"
      </Text>
    ),
  });
  // const setShowAccept = (status:boolean)=>{
  //   if(status){

  //     setModalData({...modalData,isShowModal:true})
  //   }
  // }
  const joinCampaignState = async (campaignId: any, userId: any) => {
    // console.log(typeof campaignId, typeof userId);
    // dispatch(joinCampaign({ listType: "owned", userId: 1 }));
    // dispatch(getCampaignList({ listType: "owned", userId: 1 }));

    // console.log(res.payload);

    // modalData.primaryColor = "bg-green";
    // modalData.iconCategory = "MaterialCommunityIcons";
    // modalData.iconName = "check";
    // modalData.animationIn = "pulse";
    // modalData.animationOut = "zoomOut";
    // modalData.isMustInteract = false;
    // modalData.children = (
    //   <Text className="text-header-4 font-semibold text-center mb-4">
    //     You've Successfully{"\n"}Joined the Campaign !
    //   </Text>
    // );
    // setShowModal(false);

    // setTimeout(() => {
    //   setShowModal(true);
    // }, 1000);
    setShowAcceptModal(false);
    const joinedDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss.SSS");
    const targetValue = 0;

    const res: any = await dispatch(
      joinCampaign({ campaignId, userId, targetValue, joinedDate })
    );

    if (res.payload?.statusCode === 200) {
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1000);
      setTimeout(() => {
        setShowSuccessModal(false);
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
  const deleteCampaign = async (campaignId: any, userId: any) => {
    setShowCancelModal(false);

    const res: any = await dispatch(cancelCampaign({ campaignId, userId }));

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
  const claimReward = async (campaignId: any, userId: any) => {
    setShowClaimModal(false);
    const res: any = await dispatch(
      sendEmailClaimReward({ campaignId, userId })
    );

    if (res.payload?.statusCode === 200) {
      setTimeout(() => {
        setShowClaimSuccessModal(true);
      }, 1000);
      setTimeout(() => {
        setShowClaimSuccessModal(false);
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
    }
  };
  const connectDevice = () => {
    router.push({
      pathname: "/page/campaign/ConnectDevice/",
    });
  };
  return (
    <View className="h-full bg-bg p-4 flex flex-col space-y-3">
      <ScrollView className="flex flex-col space-y-5 h-full">
        <Image
          source={{
            uri: `https://storage.googleapis.com/modcampaign-images/${selectedCampaign.image}`,
          }}
          style={{ width: "100%", height: 200 }}
          className="rounded-2xl"
        />
        {/* <Text>{`https://drive.google.com/uc?id=${selectedCampaign.image}&t=${timestamp}`}</Text> */}
        {/* <View className="flex flex-col justify-between"> */}
        <View className="flex flex-col space-y-4 bg-[]">
          <View className="flex flex-col space-y-2">
            <View className="flex flex-row space-x-5 items-center">
              <View className="flex flex-row space-x-1 items-center">
                <UtilIcon
                  category="MaterialCommunityIcons"
                  name={"calendar-month"}
                  size={16}
                  color={"#929292"}
                />
                <Text className="text-gray text-small font-medium">
                  {`${dayjs(selectedCampaign.start).format(
                    "DD/MM/YYYY"
                  )} - ${dayjs(selectedCampaign.end).format("DD/MM/YYYY")}`}
                </Text>
              </View>
              {dayjs(selectedCampaign.end).isBefore(today) ? (
                <View className="bg-orange-2 rounded-xl flex flex-row justify-center px-3 py-1">
                  <Text className="text-orange text-small font-medium">
                    Completed
                  </Text>
                </View>
              ) : null}
            </View>
            <Text className="text-header-3 font-semibold">
              {selectedCampaign.name}
            </Text>
            <Text className="text-gray text-small font-medium">
              {selectedCampaign.type} | {selectedCampaign.category} | Number of
              Participants: {selectedCampaign.userCount} /
              {selectedCampaign.userLimit
                ? selectedCampaign.userLimit
                : "Unlimited"}
            </Text>
          </View>
          {type === "Joined Campaign" ? (
            <View className="flex flex-col space-y-6">
              <View className="flex flex-col space-y-2 bg-white w-full shadow-lg rounded-2xl py-3 px-4">
                <Text className="text-sub-header-2 font-medium">
                  My accumulated distance
                </Text>
                {/* {isConnectedThirdParty ? ( */}
                {isConnectedThirdParty ? (
                  <Text className="text-header-1 font-semibold text-orange">
                    {/* {campaignTargetValue}{" "} */}
                    {leaderBoardLimit.current?.targetValue?.toLocaleString(
                      "en-US"
                    )}{" "}
                    <Text className="text-sub-header-3 font-regular text-gray">
                      {selectedCampaign.categoryTarget === "Steps"
                        ? "steps"
                        : "km."}
                    </Text>
                  </Text>
                ) : (
                  <View>
                    <Text className="text-sub-header-3 font-regular text-gray">
                      You haven't connected your device yet.
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        connectDevice();
                      }}
                    >
                      <Text className="text-orange">Connect now</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View className="flex flex-col space-y-4 px-3">
                <View className="flex flex-row justify-between">
                  <Text className="text-sub-header-2 font-medium text-black">
                    Leaderboard
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: "/page/campaign/detail/LeaderBoard",
                      });
                    }}
                  >
                    <Text className="text-sub-header-2 font-medium text-gray">
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex flex-col space-y-4">
                  {leaderBoardLimit.list.map((item: any, index: number) => {
                    return (
                      <View
                        key={`leaderboard-${index}`}
                        className="flex flex-row items-center w-full px-4 space-x-3"
                      >
                        {item.rank === 1 ? (
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
                        {/* <View
                          className={`w-[25px] h-[25px] flex items-center justify-center rounded-full`}
                        >
                          <Text
                            className={`text-sub-header-1 font-medium ${
                              leaderBoardLimit.current.displayName ===
                              item.displayName
                                ? "text-orange"
                                : "text-gray"
                            }`}
                          >
                            {item.rank}
                          </Text>
                        </View> */}
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
                                leaderBoardLimit.current.displayName ===
                                item.displayName
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
                                leaderBoardLimit.current.displayName ===
                                item.displayName
                                  ? "text-orange"
                                  : "text-gray"
                              }`}
                            >
                              {item.targetValue.toLocaleString("en-US")}
                            </Text>
                            <Text
                              className={`text-body-3 font-regular ${
                                leaderBoardLimit.current.displayName ===
                                item.displayName
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
                </View>
              </View>
            </View>
          ) : null}
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium">Description</Text>
            <Text className="text-gray text-body-3 font-regular">
              {selectedCampaign.description}
            </Text>
          </View>
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium">
              Campaign Creator
            </Text>
            <Text className="text-gray text-body-3 font-regular">
              {selectedCampaign.userOwner}
            </Text>
          </View>
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium">
              Reward Details
            </Text>
            <Text className="text-gray text-body-3 font-regular">
              {selectedCampaign.reward}
            </Text>
          </View>
        </View>
      </ScrollView>
      {dayjs(selectedCampaign.end).isBefore(today) &&
      type === "Joined Campaign" ? (
        <Pressable
          onPress={() => setShowClaimModal(true)}
          className="flex flex-row justify-center"
        >
          {/* <Pressable
                 onPress={() => setShowModal(true)}
                 className="flex flex-row justify-center"
               > */}
          <View className="bg-orange mb-3 py-3 px-24 rounded-3xl">
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Claim Reward
            </Text>
          </View>
        </Pressable>
      ) : null}
      {type === "Joined Campaign" ||
      type === "Completed Campaign" ? null : type === "My Campaign" ||
        type === "Ongoing Campaign" ? (
        <Pressable
          onPress={() => {
            Vibration.vibrate(500);
            setShowCancelModal(true);
          }}
          className="flex flex-row justify-center"
        >
          <View className="bg-red mb-10 py-3 px-20 rounded-3xl">
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Cancel this Campaign
            </Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => setShowAcceptModal(true)}
          className="flex flex-row justify-center"
        >
          {/* <Pressable
          onPress={() => setShowModal(true)}
          className="flex flex-row justify-center"
        > */}
          <View className="bg-orange mb-10 py-3 px-20 rounded-3xl">
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Join this Campaign
            </Text>
          </View>
        </Pressable>
      )}
      {/* {showModal ? (
        <UtilModal {...modalData}>{modalData.children}</UtilModal>
      ) : null} */}

      <UtilModal
        primaryColor="bg-blue"
        iconText="i"
        isShowModal={showAcceptModal}
        isMustInteract={true}
        acceptText="Yes"
        declineText="Not now"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAccept={() =>
          joinCampaignState(selectedCampaign.id, userProfile.userId)
        }
        handleDecline={() => setShowAcceptModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center">
          Do you want to join{"\n"}"{selectedCampaign.name}" ?
        </Text>
      </UtilModal>
      <UtilModal
        primaryColor="bg-green"
        iconCategory="MaterialCommunityIcons"
        iconName="check"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showSuccessModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          You've Successfully{"\n"}Joined the Campaign !
        </Text>
      </UtilModal>
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
        handleAccept={() =>
          deleteCampaign(selectedCampaign.id, userProfile.userId)
        }
        handleDecline={() => setShowCancelModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center">
          Do you want to cancel{"\n"}"
          <Text className="text-red">{selectedCampaign.name}</Text>" ?
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
      <UtilModal
        primaryColor="bg-blue"
        iconText="i"
        isShowModal={showClaimModal}
        isMustInteract={false}
        isAcknowledge={true}
        acknowledgeText="Acknowledge"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAcknowledge={() =>
          claimReward(selectedCampaign.id, userProfile.userId)
        }
      >
        <View className="flex flex-col space-y-4">
          <Text className="text-header-4 font-semibold text-center">
            Congratulations!
          </Text>
          <Text className="text-small font-medium text-black">
            <Text className="text-blue text-body-1 font-bold">Prizes</Text> -
            The prizes awarded will be provided by the event organizer. They
            will contact you via the email address you used to register for this
            application to arrange prize distribution.
          </Text>
          <Text className="text-small font-medium text-black">
            <Text className="text-blue text-body-1 font-bold">Contact Us</Text>{" "}
            - For any further questions, please don't hesitate to contact us at{" "}
            <Text className="text-blue text-small font-medium">
              modcampaign.noreply@gmail.com
            </Text>
          </Text>
        </View>
      </UtilModal>
      <UtilModal
        primaryColor="bg-green"
        iconCategory="MaterialCommunityIcons"
        iconName="check"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showClaimSuccessModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          Email Successfully{"\n"} send to your email !
        </Text>
      </UtilModal>
    </View>
  );
};

export default CampaignDetail;
