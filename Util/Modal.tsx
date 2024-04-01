import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import UtilIcon from "./Icon";
import Modal from "react-native-modal";
// import { TouchableOpacity } from "react-native-gesture-handler";

const UtilModal = (props: {
  isShowModal?: boolean;
  iconName?: any;
  iconCategory?: string;
  iconText?: string;
  alertText?: string;
  primaryColor?: string | "bg-blue";
  isMustInteract?: boolean | true;
  acceptText?: string;
  declineText?: string;
  handleAccept?: any;
  handleDecline?: any;
  animationIn?: any | "zoomIn";
  animationOut?: any | "zoomOut";
  isAcceptPolicy?: boolean;
  children?: React.ReactNode;
}) => {
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  // const handleAcceptPolicy = () => {

  //   console.log("accept policy");
  // };

  return (
    <Modal
      isVisible={props.isShowModal}
      // isVisible={true}
      animationIn={props.animationIn ? props.animationIn : "zoomIn"}
      animationOut={props.animationOut ? props.animationOut : "zoomOut"}
      // coverScreen={true}
      hasBackdrop={true}
      backdropColor="#000000b3"
      onBackdropPress={props.handleDecline}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="w-[296px] bg-white px-8 pt-8 pb-5 rounded-xl flex flex-col  items-center space-y-4">
          <View
            className={`w-14 h-14 rounded-full flex items-center justify-center ${props.primaryColor}`}
          >
            {props.iconText ? (
              <Text className="text-white text-header-1 font-bold">
                {props.iconText}
              </Text>
            ) : (
              <UtilIcon
                category={props.iconCategory}
                name={props.iconName}
                size={32}
                color={"#FFFFFF"}
              />
            )}
          </View>
          {/* <Text className="text-header-4 font-semibold text-center"> */}
          {props.children}
          {props.isAcceptPolicy ? (
            <TouchableOpacity
              onPress={() => setAcceptPolicy(!acceptPolicy)}
              className="mb-3 flex flex-row space-x-2 w-auto items-center"
            >
              <View className="bg-gray-2 border-gray rounded-sm border w-[10px] h-[10px] flex items-center justify-center">
                {/* <View> */}
                {acceptPolicy ? (
                  <View className="bg-gray rounded-[1px] w-[6px] h-[6px]"></View>
                ) : null}
                {/* </View> */}
              </View>
              <Text className="text-small font-medium text-gray">
                I acknowledge and would like to proceed{"\n"}with creating the
                campaign.
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* </Text> */}
          {props.isMustInteract ? (
            <View className="flex  flex-row w-full justify-center space-x-3">
              <Pressable
                onPress={props.handleDecline}
                className="w-auto flex flex-row bg-gray-3 py-2 px-4 rounded-xl"
              >
                <Text className="w-auto text-black text-sub-header-1 font-medium text-center">
                  {props.declineText}
                </Text>
              </Pressable>
              {props.isAcceptPolicy ? (
                <Pressable
                  onPress={props.handleAccept}
                  className={`w-auto flex flex-row py-2 px-4 rounded-xl  ${
                    acceptPolicy ? props.primaryColor : "bg-gray-3"
                  }`}
                  disabled={!acceptPolicy}
                >
                  <Text className="w-auto text-white text-sub-header-1 font-medium text-center">
                    {props.acceptText}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={props.handleAccept}
                  className={`w-[100px] flex-row justify-center py-2 px-4 rounded-xl ${props.primaryColor}`}
                >
                  <Text className="w-auto text-white text-sub-header-1 font-medium text-center">
                    {props.acceptText}
                  </Text>
                </Pressable>
              )}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default UtilModal;
