import { View, Text, ScrollView, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/root.store";
import { getUserList, updateUserRole } from "../../../store/user/user.slice";
import { SelectList } from "react-native-dropdown-select-list";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "@bacons/react-views";
import UtilModal from "../../../Util/Modal";
import { set } from "lodash";

const UserManagement = () => {
  const dispatch = useAppDispatch();
  const userList = useAppSelector((state) => state.user.userList);
  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);
  const roleType = [
    { key: 1, value: "Attendees" },
    { key: 2, value: "Creator" },
  ];
  const emojisWithIcons = [
    { title: "Attendees" },
    { title: "Creator" },
    // { title: "Admin" },
  ];

  const [selectedRoleType, setSelectedRoleType] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState({
    primaryColor: "bg-blue",
    iconText: "i",
    iconCategory: "",
    iconName: "",
    isMustInteract: true,
    acceptText: "Yes",
    declineText: "No",
    animationIn: "zoomIn",
    animationOut: "zoomOut",
    handleAccept: function () {},
    handleDecline: function () {},
    children: <Text></Text>,
  });
  const updateRole = async (userId: Number, role: string) => {
    setShowModal(false);
    const res: any = await dispatch(
      updateUserRole({ userId, roleUpdate: role })
    );
    if (res.payload?.statusCode === 200) {
      setTimeout(() => {
        setShowSuccessModal(true);
        dispatch(getUserList());
      }, 1000);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
    // else if (res.payload?.statusCode === 400) {
    //   setTimeout(() => {
    //     setShowErrorModal(true);
    //   }, 1000);
    //   setTimeout(() => {
    //     setShowErrorModal(false);
    //   }, 3000);
    // } else {
    //   setTimeout(() => {
    //     setShowErrorLimitModal(true);
    //   }, 1000);
    //   setTimeout(() => {
    //     setShowErrorLimitModal(false);
    //   }, 3000);
    // }
  };
  return (
    <SafeAreaView className="bg-bg h-full">
      <ScrollView className="bg-bg mt-5 flex flex-col space-y-4 px-6">
        {userList.map((item: any, index: number) => {
          return (
            <View
              key={`user-management-${index}`}
              className="flex flex-row items-center px-4 space-x-3"
            >
              <View
                className={`w-[25px] h-[25px] flex items-center justify-center rounded-full`}
              >
                <Text className={`text-sub-header-1 font-medium text-gray`}>
                  {index + 1}
                </Text>
              </View>
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
                    className={`w-[80px] text-body-2 font-medium text-gray`}
                  >
                    {item.displayName}
                  </Text>
                </View>
                <View className={`flex `}>
                  {/* <SelectList
                    onSelect={() => {
                      const role = ["Attendees", "Admin", "Creator"];

                      const selectedRole = role[selectedRoleType];
                      if (item.role !== selectedRole) {
                        console.log(selectedRole);
                      }
                      // dispatch(setStateCampaignType(selectedCampaignType));
                    }}
                    // maxHeight={125}
                    setSelected={setSelectedRoleType}
                    data={roleType}
                    search={false}
                    disabledTextStyles={{ color: "#929292" }}
                    boxStyles={{
                      backgroundColor: "#ffffff",
                      borderWidth: 0,
                      shadowColor: "#000",
                      borderRadius: 8,
                      boxShadow: "0px 1px 1px rgba(0, 0, 0, 1)",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowRadius: 2,
                      shadowOpacity: 0.04,
                      // width: "100%",
                    }} //override default styles
                    dropdownStyles={{
                      backgroundColor: "#ffffff",
                      borderWidth: 0,
                      borderRadius: 8,
                      shadowColor: "#000000",
                      boxShadow: "10px 10px 10px rgba(0, 0, 0, 1)",
                      shadowOffset: {
                        width: 10,
                        height: 4,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 10,
                    }} //override default styles
                    placeholder={`${item.role}`}
                    inputStyles={{
                      color: "#929292",
                    }}
                  /> */}
                  <SelectDropdown
                    data={emojisWithIcons}
                    onSelect={(selectedItem, index) => {
                      if (item.role !== selectedItem.title) {
                        setModalData({
                          primaryColor: "bg-blue",
                          iconText: "i",
                          iconCategory: "",
                          iconName: "",
                          isMustInteract: true,
                          acceptText: "Yes",
                          declineText: "No",
                          animationIn: "zoomIn",
                          animationOut: "zoomOut",
                          handleAccept: () => {
                            updateRole(item.userId, selectedItem.title);
                          },
                          handleDecline: () => {
                            setShowModal(false);
                          },
                          children: (
                            <Text className="text-header-4 font-semibold text-center">
                              Do you want to change role {"\n"}{" "}
                              <Text className="text-header-4 font-semibold text-blue">
                                {item.displayName} to {selectedItem.title} ?
                              </Text>
                            </Text>
                          ),
                        });
                        setShowModal(true);

                        console.log(selectedItem, index);
                        // dispatch(
                        //   updateUserRole({
                        //     userId: item.userId,
                        //     roleUpdate: selectedItem.title,
                        //   })
                        // );
                      }
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {item.role}
                          </Text>
                          <Icon
                            name={isOpened ? "chevron-up" : "chevron-down"}
                            style={styles.dropdownButtonArrowStyle}
                          />
                        </View>
                      );
                    }}
                    renderItem={(item2, index, isSelected) => {
                      // if (item2.title === item.role) {
                      //   return <View></View>;
                      // }

                      return (
                        <View
                          style={{
                            ...styles.dropdownItemStyle,
                            // ...(isSelected && { backgroundColor: "#D2D9DF" }),
                          }}
                        >
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item2.title}
                          </Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                  {/* <Text className={`text-body-3 font-regular`}>
                    {item.role}
                  </Text> */}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <UtilModal
        primaryColor={modalData.primaryColor}
        iconText={modalData.iconText}
        isShowModal={showModal}
        isMustInteract={modalData.isMustInteract}
        acceptText={modalData.acceptText}
        declineText={modalData.declineText}
        animationIn={modalData.animationIn}
        animationOut={modalData.animationOut}
        handleAccept={modalData.handleAccept}
        handleDecline={modalData.handleDecline}
      >
        {modalData.children}
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
          Role Updated {"\n"} Successfully !
        </Text>
      </UtilModal>
    </SafeAreaView>
  );
};

export default UserManagement;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 100,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
    color: "#929292",
  },
  dropdownButtonArrowStyle: {
    fontSize: 18,
    color: "#929292",
  },
  // dropdownButtonIconStyle: {
  //   fontSize: 28,
  //   marginRight: 8,
  // },
  dropdownMenuStyle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },

  dropdownItemStyle: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
    color: "#929292",
  },
  // dropdownItemIconStyle: {
  //   fontSize: 28,
  //   marginRight: 8,
  // },
});
