import { View, Text, Pressable } from "react-native";
import { useState } from "react";
import UtilIcon from "../../Util/Icon";
import { useAppDispatch } from "../../store/root.store";
import { createCampaign } from "../../store/campaign/campaign.slice";
import UtilModal from "../../Util/Modal";
import { router } from "expo-router";

const HeaderRight = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);
  const createCampaignState = async () => {
    console.log("create");
    setShowCreateModal(false);

    // const res = await dispatch(createCampaign({ userId: 1 }));
    // console.log(res);
    // const res: any = await dispatch(createCampaign({ userId: 1 }));
    // if (res.payload?.statusCode === 200) {
    setTimeout(() => {
      setShowCreateSuccessModal(true);
    }, 1000);

    setTimeout(() => {
      setShowCreateSuccessModal(false);
      router.push({
        pathname: "/(tabs)/Campaign",
      });
    }, 3000);
    // }
  };
  return (
    <View>
      <Pressable
        onPress={() => setShowCreateModal(true)}
        className="flex flex-row justify-end"
      >
        <UtilIcon category="MaterialCommunityIcons" name="check" size={28} />
      </Pressable>
      <UtilModal
        primaryColor="bg-yellow"
        iconText="i"
        isShowModal={showCreateModal}
        isMustInteract={true}
        acceptText="Create Campaign"
        declineText="Cancel"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAccept={() => createCampaignState()}
        handleDecline={() => setShowCreateModal(false)}
        isAcceptPolicy={true}
      >
        <View className="space-y-1">
          <Text className="text-header-4 font-semibold text-center">
            Warning
          </Text>
          <Text className="text-body-1 font-regular">
            After launching a campaign, you won't{"\n"}be able to make changes
            to its details
          </Text>
        </View>
      </UtilModal>
      <UtilModal
        primaryColor="bg-green"
        iconCategory="MaterialCommunityIcons"
        iconName="check"
        animationIn="pulse"
        animationOut="zoomOut"
        isShowModal={showCreateSuccessModal}
        isMustInteract={false}
      >
        <Text className="text-header-4 font-semibold text-center mb-4">
          Campaign Created{"\n"}Successfully !
        </Text>
      </UtilModal>
    </View>
  );
};

export default HeaderRight;
