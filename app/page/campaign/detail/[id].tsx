import { View, Text, BackHandler, Image, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import {
  getCampaignDetail,
  setDefaultState,
} from "../../../../store/campaign/campaign.slice";
import { ScrollView } from "react-native-gesture-handler";
import UtilIcon from "../../../../Util/Icon";
import dayjs from "dayjs";
// import UtilModal from "../../../../Util/Modal";
import Modal from "react-native-modal";
import UtilModal from "../../../../Util/Modal";

const pageCampaignDetail = () => {
  const { id, type } = useLocalSearchParams();
  // console.log(type);

  const dispatch = useAppDispatch();
  const selectedCampaign = useAppSelector(
    (state) => state.campaign.selectedCampaign
  );
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelSuccessModal, setShowCancelSuccessModal] = useState(false);
  useEffect(() => {
    dispatch(getCampaignDetail({ id: Number(id) }));
  }, [dispatch, id]);

  const modalData = {
    isShowModal: showAcceptModal,
    primaryColor: "bg-blue",
    iconText: "i",
    isMustInteract: true,
    acceptText: "Yes",
    declineText: "Not now",
    animationIn: "zoomIn",
    animationOut: "zoomOut",
    handleAccept: () => joinCampaign(selectedCampaign.id, 1),
    handleDecline: () => setShowAcceptModal(false),
    children: () => {
      return (
        <Text className="text-header-4 font-semibold text-center">
          Do you want to join{"\n"}"{selectedCampaign.name}"
        </Text>
      );
    },
  };
  const joinCampaign = (campaignId: any, userId: any) => {
    console.log("joinnn, ", campaignId, userId);
    setShowAcceptModal(false);

    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);

    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };
  const deleteCampaign = (campaignId: any, userId: any) => {
    console.log("delete, ", campaignId, userId);
    setShowCancelModal(false);

    setTimeout(() => {
      setShowCancelSuccessModal(true);
    }, 1000);

    setTimeout(() => {
      setShowCancelSuccessModal(false);
    }, 3000);
  };
  const timestamp = new Date().getTime();

  return (
    <View className="h-full bg-white p-4 flex flex-col space-y-3">
      <ScrollView className="flex flex-col space-y-5 h-full">
        <Image
          source={{
            uri: `https://drive.google.com/uc?id=${selectedCampaign.image}&t=${timestamp}`,
            // uri: `https://drive.google.com/uc?export=view&id=${selectedCampaign.image}`,
            // https://drive.google.com/uc?export=view&id=${props.data.image}
            // uri: "https://api.slingacademy.com/public/sample-photos/1.jpeg",
          }}
          style={{ width: "100%", height: 200 }}
          className="rounded-2xl"
        />
        {/* <Text>{`https://drive.google.com/uc?id=${selectedCampaign.image}&t=${timestamp}`}</Text> */}
        {/* <View className="flex flex-col justify-between"> */}
        <View className="flex flex-col space-y-4">
          <View className="flex flex-col space-y-2">
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
            <Text className="text-header-3 font-semibold">
              {selectedCampaign.name}
            </Text>
            <Text className="text-gray text-small font-medium">
              {selectedCampaign.type} | {selectedCampaign.category} | Number of
              Participants:{" "}
              {selectedCampaign.userLimit
                ? selectedCampaign.userLimit
                : "Unlimited"}
            </Text>
          </View>
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
      {type === "Joined Campaign" ? null : type === "My Campaign" ? (
        <Pressable
          onPress={() => setShowCancelModal(true)}
          className="flex flex-row justify-center"
        >
          <View className="bg-red mb-10 py-3 px-20 rounded-3xl">
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Delete this Campaign
            </Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => setShowAcceptModal(true)}
          className="flex flex-row justify-center"
        >
          <View className="bg-orange mb-10 py-3 px-20 rounded-3xl">
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Join this Campaign
            </Text>
          </View>
        </Pressable>
      )}

      <UtilModal
        primaryColor="bg-blue"
        iconText="i"
        isShowModal={showAcceptModal}
        isMustInteract={true}
        acceptText="Yes"
        declineText="Not now"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAccept={() => joinCampaign(selectedCampaign.id, 1)}
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
        handleAccept={() => deleteCampaign(selectedCampaign.id, 1)}
        handleDecline={() => setShowCancelModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
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
    </View>
  );
};

export default pageCampaignDetail;
