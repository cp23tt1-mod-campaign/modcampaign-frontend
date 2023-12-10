import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import { CampaignEntity } from "store/campaign/campaign.entity";
import { FlatList } from "react-native-gesture-handler";
import dayjs from "dayjs";
import UtilIcon from "../../../../Util/Icon";
import UtilModal from "../../../../Util/Modal";

const ListPopular = () => {
  const popularCampaignList = useAppSelector(
    (state) => state.campaign.popularCampaignList
  );
  const timestamp = new Date().getTime();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showJoinSuccessModal, setShowJoinSuccessModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignEntity>();
  const openJoinModal = (item: any) => {
    setSelectedCampaign(item);
    setShowJoinModal(true);
  };
  const joinCampaign = (campaignId: any, userId: any) => {
    console.log("join, ", campaignId, userId);
    setShowJoinModal(false);

    setTimeout(() => {
      setShowJoinSuccessModal(true);
    }, 1000);

    setTimeout(() => {
      setShowJoinSuccessModal(false);
    }, 3000);
  };
  return (
    <View className="h-full bg-white flex flex-col">
      <FlatList
        className="px-4 py-5 mb-2"
        data={popularCampaignList}
        keyExtractor={(item) => {
          return String(item?.id);
        }}
        extraData={popularCampaignList}
        renderItem={({ item }) => {
          return (
            <View className="w-full mb-5 border-b-[0.2px] pb-3 border-gray flex-row  justify-between items-center">
              <View className="flex flex-row items-center space-x-3">
                <Image
                  source={{
                    uri: `https://drive.google.com/uc?id=${item?.image}&t=${timestamp}`,
                    width: 142,
                    height: 92,
                  }}
                  className="rounded-lg bg-gray"
                />
                <View className="flex flex-col space-y-2">
                  <Text className="text-black text-sub-header-1 font-semibold">
                    {item?.name}
                  </Text>
                  <View className="flex flex-row space-x-1 items-center">
                    <UtilIcon
                      category="MaterialCommunityIcons"
                      name={"calendar-month"}
                      size={16}
                      color={"#929292"}
                    />
                    <Text className="text-gray text-small font-medium">
                      {`${dayjs(item?.start).format("DD/MM/YYYY")} - ${dayjs(
                        item?.end
                      ).format("DD/MM/YYYY")}`}
                    </Text>
                  </View>
                </View>
              </View>
              <Pressable
                className="flex items-center justify-center bg-orange w-6 h-6 rounded-full"
                onPress={() => openJoinModal(item)}
              >
                <UtilIcon
                  category="MaterialIcons"
                  name={"add"}
                  size={18}
                  color={"#FFFFFF"}
                />
              </Pressable>
              {/* <Text className="bg-gray">{JSON.stringify(item?.id)}</Text> */}
            </View>
          );
        }}
      />
      <UtilModal
        primaryColor="bg-blue"
        iconText="i"
        isShowModal={showJoinModal}
        isMustInteract={true}
        acceptText="Yes"
        declineText="Not now"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAccept={() => joinCampaign(selectedCampaign?.id, 1)}
        handleDecline={() => setShowJoinModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
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
    </View>
  );
};

export default ListPopular;
