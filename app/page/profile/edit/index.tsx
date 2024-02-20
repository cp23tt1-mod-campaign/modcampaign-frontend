import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Radio from "../../../../components/Form/Radio";
import UtilModal from "../../../../Util/Modal";
import { useAppDispatch, useAppSelector } from "../../../../store/root.store";
import {
  getUserProfile,
  setCloneUserProfile,
  setUserActivityLevel,
  setUserAge,
  setUserFirstName,
  setUserGender,
  setUserHeight,
  setUserLastName,
  setUserWeight,
  updateUserProfile,
} from "../../../../store/user/user.slice";
// import {
//   SCREEN_HEIGHT,
//   SCREEN_WIDTH,
// } from "../../../constants/ScreenDimension";

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const cloneUserProfile: any = useAppSelector(
    (state) => state.user.clonedUserProfile
  );
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  // const [isDataChanged, setIsDataChanged] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [genderList, setGenderList] = useState([
    {
      label: "Male",
      value: "male",
      isSelected: false,
    },
    {
      label: "Female",
      value: "female",
      isSelected: false,
    },
  ]);
  const [actMultiply, setActMultiply] = useState([
    {
      label: "Sedentary",
      description: "little or no exercise",
      value: 1,
      isSelected: false,
    },
    {
      label: "Lightly active",
      description: "light exercise or sports 1-3 days per week",
      value: 2,
      isSelected: false,
    },
    {
      label: "Moderately active",
      description: "moderate exercise or sports 3-5 days per week",
      value: 3,
      isSelected: false,
    },
    {
      label: "Very active",
      description: "hard exercise or sports 6-7 days per week",
      value: 4,
      isSelected: false,
    },
    {
      label: "Extra active",
      description: "very hard exercise or sports and a physical job",
      value: 5,
      isSelected: false,
    },
  ]);
  const handleSelectedGender = (selected: any) => {
    setGenderList((prevList) =>
      prevList.map((item) => ({
        ...item,
        isSelected: item.label === selected.label,
      }))
    );

    dispatch(setUserGender(selected.value));

    //checkbox
    // setGenderList((prevList) => {
    //   const updatedList = [...prevList];
    //   updatedList[index].isSelected = !updatedList[index].isSelected;
    //   return updatedList;
    // });

    // const updatedList = genderList.map((item) => ({
    //   ...item,
    //   isSelected: item.label === selected.label,
    // }));

    // setGenderList(updatedList);
  };
  const handleSelectedActMultiply = (selected: any) => {
    setActMultiply((prevList) =>
      prevList.map((item) => ({
        ...item,
        isSelected: item.label === selected.label,
      }))
    );
    dispatch(setUserActivityLevel(selected.value));
  };
  const confirmInformation = async () => {
    setShowAcceptModal(false);

    const res: any = await dispatch(updateUserProfile());
    console.log(res.payload);

    if (res.payload?.statusCode === 200) {
      dispatch(getUserProfile());
      setTimeout(() => {
        setShowSuccessModal(true);
      }, 1000);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.push({
          pathname: "/(tabs)/Profile",
        });
      }, 3000);
    }
  };

  useEffect(() => {
    const activityLevelState = userProfile.activityLevel;
    const genderState = userProfile.gender;
    setGenderList((prevList) =>
      prevList.map((item) => ({
        ...item,
        isSelected: item.value === genderState,
      }))
    );
    setActMultiply((prevList) =>
      prevList.map((item) => ({
        ...item,
        isSelected: item.value === activityLevelState,
      }))
    );
  }, [userProfile.activityLevel, userProfile.gender]);

  useEffect(() => {
    setFirstName(userProfile.firstName);
    setLastName(userProfile.lastName);
    setAge(userProfile.age.toString());
    setHeight(userProfile.height.toString());
    setWeight(userProfile.weight.toString());

    setGenderList((prevList) =>
      prevList.map((item) => ({
        ...item,
        isSelected: item.value === userProfile.gender,
      }))
    );
    setActMultiply((prevList) =>
      prevList.map((item) => ({
        ...item,
        isSelected: item.value === userProfile.activityLevel,
      }))
    );

    return () => {
      // console.log("close");
      // console.log(cloneUserProfile.firstName);
      // console.log(cloneUserProfile.lastName);
      // console.log(typeof cloneUserProfile.age);

      dispatch(setUserFirstName(cloneUserProfile.firstName));
      dispatch(setUserLastName(cloneUserProfile.lastName));
      dispatch(setUserGender(cloneUserProfile.gender));
      dispatch(setUserAge(cloneUserProfile.age));
      dispatch(setUserHeight(cloneUserProfile.height));
      dispatch(setUserWeight(cloneUserProfile.weight));
      dispatch(setUserActivityLevel(cloneUserProfile.actMultiply));
      setIsDisabled(true);
    };
    // console.log(
    //   "🚀 ~ useEffect ~ userProfile.firstName:",
    //   userProfile.firstName
    // );
    // console.log("🚀 ~ useEffect ~ firstName:", firstName);
  }, [dispatch]);
  useEffect(() => {
    // Check if any relevant piece of data has changed

    const gender = genderList.find((item) => item.isSelected);
    const actMult = actMultiply.find((item) => item.isSelected);

    // console.log("🚀 ~ gender ~ gender:", gender?.value);
    // console.log(
    //   "🚀 ~ useEffect ~ cloneData.firstName:",
    //   cloneUserProfile.gender
    // );

    // console.log("🚀 ~ useEffect ~ actMult:", actMult?.value);
    // console.log(
    //   "🚀 ~ useEffect ~ userProfile.activityLevel:",
    //   cloneUserProfile.actMultiply
    // );

    if (
      cloneUserProfile.firstName !== firstName ||
      cloneUserProfile.lastName !== lastName ||
      cloneUserProfile.age !== parseInt(age) ||
      cloneUserProfile.height !== parseInt(height) ||
      cloneUserProfile.weight !== parseInt(weight) ||
      cloneUserProfile.gender !== gender?.value ||
      cloneUserProfile.actMultiply !== actMult?.value
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName, age, weight, height, genderList, actMultiply]);

  return (
    <SafeAreaView
      style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
      className="flex flex-col items-center bg-bg"
    >
      <ScrollView style={{ width: SCREEN_WIDTH * 0.9 }}>
        <View className="flex flex-col space-y-4 pb-10">
          {/* <KeyboardAwareScrollView extraHeight={150}> */}
          {/* Gender */}
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium" nativeID="name">
              First name <Text className="text-red"> *</Text>
            </Text>
            <TextInput
              aria-aria-labelledby="name"
              className={`bg-white rounded-lg px-4 py-2 shadow-sm`}
              placeholder="Your name"
              placeholderTextColor={"#929292"}
              onChangeText={(text) => setFirstName(text)}
              onBlur={() => dispatch(setUserFirstName(firstName))}
              value={firstName}
              editable={true}
              area-label="Weight (Kg.)"
              maxLength={50}
              inputMode="text"
            />
            <Text className="text-gray text-body-3 font-regular text-right w-full">
              {firstName.length}/50
            </Text>
          </View>
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium" nativeID="name">
              Last name <Text className="text-red"> *</Text>
            </Text>
            <TextInput
              aria-aria-labelledby="name"
              className={`bg-white rounded-lg px-4 py-2 shadow-sm`}
              placeholder="Your name"
              placeholderTextColor={"#929292"}
              onChangeText={(text) => setLastName(text)}
              onBlur={() => dispatch(setUserLastName(lastName))}
              value={lastName}
              editable={true}
              area-label="Weight (Kg.)"
              maxLength={50}
              inputMode="text"
            />
            <Text className="text-gray text-body-3 font-regular text-right w-full">
              {lastName.length}/50
            </Text>
          </View>
          <View className="flex flex-col space-y-2">
            <Text
              className="text-sub-header-2 font-medium flex flex-row"
              nativeID="name"
            >
              Gender <Text className="text-red"> *</Text>
            </Text>
            <View className="flex flex-row space-x-20">
              {genderList.map((item, index) => {
                return (
                  <View key={`gender-${index}`}>
                    <Radio data={item} handleSelected={handleSelectedGender} />
                  </View>
                );
              })}
            </View>
          </View>
          {/* Age */}
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium" nativeID="name">
              Age (Years) <Text className="text-red"> *</Text>
            </Text>
            <TextInput
              aria-aria-labelledby="name"
              className={`bg-white rounded-lg px-4 py-2 shadow-sm`}
              placeholder="Age (Years)"
              placeholderTextColor={"#929292"}
              onChangeText={(text) => setAge(text)}
              onBlur={() => dispatch(setUserAge(parseInt(age)))}
              value={userProfile.age.toString()}
              editable={true}
              area-label="Age (Years)"
              // onSubmitEditing={() => console.log(campaignName)}
              // maxLength={50}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              inputMode="numeric"
              // secureTextEntry={true}
            />
          </View>
          {/* Height*/}
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium" nativeID="name">
              Height (Cm.) <Text className="text-red"> *</Text>
            </Text>
            <TextInput
              aria-aria-labelledby="name"
              className={`bg-white rounded-lg px-4 py-2 shadow-sm`}
              placeholder="Height (Cm.)"
              placeholderTextColor={"#929292"}
              onChangeText={(text) => setHeight(text)}
              onBlur={() => dispatch(setUserHeight(parseInt(height)))}
              value={userProfile.height.toString()}
              editable={true}
              area-label="Height (Cm.)"
              // onSubmitEditing={() => console.log(campaignName)}
              // maxLength={50}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              inputMode="numeric"
              // secureTextEntry={true}
            />
          </View>
          {/* Weight */}
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium" nativeID="name">
              Weight (Kg.) <Text className="text-red"> *</Text>
            </Text>
            <TextInput
              aria-aria-labelledby="name"
              className={`bg-white rounded-lg px-4 py-2 shadow-sm`}
              placeholder="Weight (Kg.)"
              placeholderTextColor={"#929292"}
              onChangeText={(text) => setWeight(text)}
              onBlur={() => dispatch(setUserWeight(parseInt(weight)))}
              value={userProfile.weight.toString()}
              editable={true}
              area-label="Weight (Kg.)"
              // onSubmitEditing={() => console.log(campaignName)}
              // maxLength={50}
              // onFocus={() => setFocused(true)}
              // onBlur={() => setFocused(false)}
              inputMode="numeric"
              // secureTextEntry={true}
            />
          </View>
          {/* Activity Multiplier */}
          <View className="flex flex-col space-y-2">
            <Text className="text-sub-header-2 font-medium">
              Activity Multiplier <Text className="text-red"> *</Text>
            </Text>
            <View className="flex flex-col space-y-3">
              {actMultiply.map((item, index) => {
                return (
                  <View key={`actMultiply-${index}`}>
                    <Radio
                      data={item}
                      handleSelected={handleSelectedActMultiply}
                    />
                  </View>
                );
              })}
            </View>
          </View>

          {/* </KeyboardAwareScrollView> */}
        </View>
      </ScrollView>
      <View style={{ width: SCREEN_WIDTH * 0.8 }} className="mt-8">
        <Pressable
          onPress={
            () => setShowAcceptModal(true)
            // router.push({
            //   pathname: "/page/campaign/ConnectDevice",
            // })
          }
          disabled={isDisabled}
          className={`py-2 px-12 rounded-3xl ${
            isDisabled ? "bg-gray" : "bg-orange"
          }`}
        >
          <Text className="w-full text-white text-sub-header-1 font-medium text-center">
            Save Changes
          </Text>
        </Pressable>
      </View>
      <UtilModal
        primaryColor="bg-blue"
        iconText="i"
        isShowModal={showAcceptModal}
        isMustInteract={true}
        acceptText="Yes"
        declineText="Not now"
        animationIn="zoomIn"
        animationOut="zoomOut"
        handleAccept={() => confirmInformation()}
        handleDecline={() => setShowAcceptModal(false)}
      >
        <Text className="text-header-4 font-semibold text-center">
          Do you want to confirm {"\n"} saving this profile?
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
          Account Created{"\n"}Successfully!
        </Text>
      </UtilModal>
    </SafeAreaView>
  );
};

export default EditProfile;
