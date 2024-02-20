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
import { TextInput } from "react-native-gesture-handler";
import Radio from "../../../components/Form/Radio";
import UtilModal from "../../../Util/Modal";
import { useAppDispatch, useAppSelector } from "../../../store/root.store";
import {
  setUserActivityLevel,
  setUserAge,
  setUserBMR,
  setUserGender,
  setUserHeight,
  setUserProfile,
  setUserWeight,
  signUpWithGoogle,
} from "../../../store/user/user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserEntity } from "store/user/user.entity";
// import {
//   SCREEN_HEIGHT,
//   SCREEN_WIDTH,
// } from "../../../constants/ScreenDimension";

const InformProfile = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
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
  const calcBMR = (
    gender: string,
    weight: number,
    height: number,
    age: number,
    activityLevel: number
  ) => {
    // BMR calculation based on Harris-Benedict equation
    let bmr = 0;
    const multiplyValue = [1.2, 1.375, 1.55, 1.725, 1.9];

    if (gender.toLowerCase() === "male") {
      bmr = 66 + 13.37 * weight + 5 * height - 6.8 * age;
    } else if (gender.toLowerCase() === "female") {
      bmr = 665 + 9.6 * weight + 1.8 * height - 4.7 * age;
    }
    bmr = bmr * multiplyValue[activityLevel - 1];

    return bmr;
  };

  const confirmInformation = async () => {
    const { gender, weight, height, age, activityLevel } = userProfile;
    console.log(userProfile.gender);
    console.log(userProfile.weight);
    console.log(userProfile.height);
    console.log(userProfile.age);
    console.log(userProfile.activityLevel);
    const bmr = calcBMR(gender, weight, height, age, activityLevel);
    dispatch(setUserBMR(bmr));
    console.log(bmr);
    const res: any = await dispatch(signUpWithGoogle());
    // console.log("🚀 ~ confirmInformation ~ res.payload:", res.payload.data);
    // console.log(
    //   "🚀 ~ confirmInformation ~ res.payload:",
    //   res.payload.statusCode
    // );

    if (res.payload.statusCode === 200) {
      const {
        userId,
        firstName,
        lastName,
        email,
        gender,
        height,
        weight,
        age,
        profileImage,
        bmr,
        activityLevel,
        role,
        accessToken,
      } = res.payload.data;
      console.log("🚀 ~ confirmInformation ~ userId:", userId);

      await AsyncStorage.setItem("@user", JSON.stringify(res.payload.data));
      await AsyncStorage.setItem("@accessToken", JSON.stringify(accessToken));
      console.log(userId);

      const dataFormAPI: UserEntity = {
        userId,
        firstName,
        lastName,
        email,
        gender,
        height,
        weight,
        age,
        profileImage,
        bmr,
        activityLevel,
        role,
      };
      dispatch(setUserProfile(dataFormAPI));
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
    setShowAcceptModal(false);

    // const res: any = await dispatch(joinCampaign({ campaignId, userId }));

    // if (res.payload?.statusCode === 200) {

    // }
  };

  useEffect(() => {
    const { gender, age, weight, height, activityLevel } = userProfile;
    if (gender && age && weight && height && activityLevel) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userProfile]);
  return (
    <SafeAreaView
      style={{ width: SCREEN_WIDTH }}
      className="flex flex-col items-center bg-bg h-full"
    >
      <View className="mt-5 mb-6">
        <Text className="text-header-3 font-semibold">Profile information</Text>
      </View>
      {/* <Text>{JSON.stringify(userProfile)}</Text> */}

      <View
        style={{ width: SCREEN_WIDTH * 0.9 }}
        className="flex flex-col space-y-4 pb-10"
      >
        {/* <KeyboardAwareScrollView extraHeight={150}> */}
        {/* Gender */}
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
            value={age}
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
            value={height}
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
            value={weight}
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
      <View style={{ width: SCREEN_WIDTH * 0.8 }} className="mt-6">
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
            Confirm
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

export default InformProfile;
