import { View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import UtilIcon from "../../Util/Icon";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  createCampaign,
  setStateCampaignImageUrl,
  uploadCampaignImage,
} from "../../store/campaign/campaign.slice";
import UtilModal from "../../Util/Modal";
import { router } from "expo-router";

const HeaderRight = () => {
  const dispatch = useAppDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateSuccessModal, setShowCreateSuccessModal] = useState(false);

  const campaignName = useAppSelector((state) => state.campaign.campaignName);
  const campaignDetail = useAppSelector(
    (state) => state.campaign.campaignDetail
  );
  const campaignStart = useAppSelector((state) => state.campaign.campaignStart);
  const campaignEnd = useAppSelector((state) => state.campaign.campaignEnd);
  const campaignType = useAppSelector((state) => state.campaign.campaignType);
  const campaignCategoryId = useAppSelector(
    (state) => state.campaign.campaignCategoryId
  );
  const campaignReward = useAppSelector(
    (state) => state.campaign.campaignReward
  );
  const campaignImageObject = useAppSelector(
    (state) => state.campaign.campaignImageObject
  );

  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (
      campaignName &&
      campaignDetail &&
      campaignStart &&
      campaignEnd &&
      campaignType &&
      campaignCategoryId &&
      campaignReward &&
      campaignImageObject
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    campaignName,
    campaignCategoryId,
    campaignDetail,
    campaignEnd,
    campaignImageObject,
    campaignReward,
    campaignStart,
    campaignType,
  ]);
  const createCampaignState = async () => {
    console.log("create");

    setShowCreateModal(false);

    const resUpload: any = await dispatch(
      uploadCampaignImage({ image: campaignImageObject })
    );

    if (resUpload?.payload?.statusCode === 200) {
      dispatch(setStateCampaignImageUrl(resUpload?.payload?.data));
    }

    const res: any = await dispatch(createCampaign({ userId: 1 }));
    if (res.payload?.statusCode === 200) {
      setTimeout(() => {
        setShowCreateSuccessModal(true);
      }, 1000);

      setTimeout(() => {
        setShowCreateSuccessModal(false);
        router.push({
          pathname: "/(tabs)/Campaign",
        });
      }, 3000);
    }
  };

  return (
    <View>
      <Pressable
        onPress={() => setShowCreateModal(true)}
        className="flex flex-row justify-end"
        disabled={isDisabled}
      >
        <UtilIcon
          category="MaterialCommunityIcons"
          name="check"
          size={28}
          color={isDisabled ? "#929292" : "#000000"}
        />
      </Pressable>
      {showCreateModal ? (
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
      ) : null}

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
