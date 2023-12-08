import { View, Text, Pressable } from "react-native";
import React from "react";
import UtilIcon from "./Icon";
import Modal from "react-native-modal";

const UtilModal = (props: {
  isShowModal?: boolean;
  iconName?: string;
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
  children?: React.ReactNode;
}) => {
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
          {/* </Text> */}
          {props.isMustInteract ? (
            <View className="flex flex-row w-full justify-center space-x-4">
              <Pressable
                onPress={props.handleDecline}
                className="w-[111px] flex flex-row bg-gray-3 py-2 rounded-xl"
              >
                <Text className="w-full text-black text-sub-header-1 font-medium text-center">
                  {props.declineText}
                </Text>
              </Pressable>
              <Pressable
                onPress={props.handleAccept}
                className={`w-[111px] flex flex-row py-2 rounded-xl ${props.primaryColor}`}
              >
                <Text className="w-full text-white text-sub-header-1 font-medium text-center">
                  {props.acceptText}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default UtilModal;
