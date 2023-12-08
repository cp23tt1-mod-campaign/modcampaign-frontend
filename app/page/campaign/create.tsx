import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { useMemo, useState } from "react";
import { router } from "expo-router";
import UtilIcon from "../../../Util/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";
import { SelectList } from "react-native-dropdown-select-list";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const CampaignCreate = () => {
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [image, setImage] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState("DD/MM/YYYY");
  const [openStartDate, setOpenStartDate] = useState(false);

  const [endDate, setEndDate] = useState(new Date());
  const [showEndDate, setShowEndDate] = useState("DD/MM/YYYY");
  const [openEndDate, setOpenEndDate] = useState(false);

  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "Jammu & Kashmir" },
    { key: "2", value: "Gujrat" },
    { key: "3", value: "Maharashtra" },
    { key: "4", value: "Goa" },
  ];
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Unlimited",
        value: "unlimited",
        color: "#FF7410",
        borderColor: "#FFFFFF",
        borderSize: 12,
      },
      {
        id: "2",
        label: "Limited to : ",
        value: "limited",
        color: "#FF7410",
        borderColor: "#FFFFFF",
        borderSize: 12,
      },
    ],
    []
  );
  const [selectedId, setSelectedId] = useState("1");

  const imagePicker = async () => {
    console.log(status);
    // status?.granted ? console.log("access") : requestPermission();
    // requestPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result.assets[0].uri);

      setImage(result.assets[0].uri);
    }

    // const result = await launchImageLibrary({ mediaType: "photo" });
    // console.log(result);
    // let options = {
    //   storageOptions: {
    //     // skipBackup: true,
    //     path: "images",
    //   },
    //   mediaType: "photo",
    // };
    // launchImageLibrary(options, (response) => {
    //   console.log("response", response);
    // });
  };
  return (
    <SafeAreaView className="bg-bg w-full h-full">
      {/* <View className="flex flex-row justify-between items-center py-5 ">
        <Pressable onPress={() => router.back()} className="w-1/3 pl-1">
          <UtilIcon category="Feather" name="chevron-left" size={32} />
        </Pressable>
        <Text className="text-black text-header-3 font-bold  text-center">
          New Campaign
        </Text>
        <Pressable
          onPress={() => console.log("create campaign")}
          className="w-1/3 flex flex-row justify-end pr-4"
        >
          <UtilIcon category="MaterialCommunityIcons" name="check" size={28} />
        </Pressable>
      </View> */}

      <ScrollView className="bg-bg w-full h-full p-4">
        <KeyboardAwareScrollView extraHeight={150}>
          <View className="flex flex-col space-y-4 pb-10">
            <View className="flex flex-col space-y-2">
              <Text className="text-sub-header-2 font-medium" nativeID="name">
                Campaign Name <Text className="text-red">*</Text>
              </Text>
              <TextInput
                aria-aria-labelledby="name"
                className={`bg-white rounded-lg p-4 shadow-sm`}
                placeholder="Campaign Name"
                placeholderTextColor={"#929292"}
                onChangeText={(text) => setName(text)}
                value={name}
                editable={true}
                area-label="Campaign Name"
                onSubmitEditing={() => console.log(name)}
                maxLength={50}
                // onFocus={() => setFocused(true)}
                // onBlur={() => setFocused(false)}
                // inputMode="numeric"
                // secureTextEntry={true}
              />
              <Text className="text-gray text-body-3 font-regular text-right w-full">
                {name.length}/50
              </Text>
            </View>
            <View className="flex flex-col space-y-2">
              <Text className="text-sub-header-2 font-medium">
                Campaign Banner <Text className="text-red">*</Text>
              </Text>
              <TouchableOpacity
                onPress={imagePicker}
                className="h-[140px] shadow-sm"
              >
                <View className="flex flex-row justify-center items-center bg-white rounded-lg p-3 w-full h-full">
                  {/* <View className=" bg-red w-full h-full">
                  <Text className="text-black text-header-3 font-semibold">
                    asd
                  </Text>
                </View> */}
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                      className="rounded-lg"
                    />
                  ) : (
                    <UtilIcon
                      category="MaterialCommunityIcons"
                      name="file-image-plus-outline"
                      size={49}
                      color="#929292"
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex flex-col space-y-2">
              <Text className="text-sub-header-2 font-medium">
                Description <Text className="text-red">*</Text>
              </Text>
              <TextInput
                className={`bg-white rounded-lg p-4 shadow-sm`}
                placeholder="Description"
                placeholderTextColor={"#929292"}
                multiline={true}
                numberOfLines={4}
                style={{ height: 120, textAlignVertical: "top" }}
                onChangeText={(text) => setDescription(text)}
                editable={true}
                area-label="Campaign Description"
                onSubmitEditing={() => console.log(description)}
                maxLength={500}
              />
              <Text className="text-gray text-body-3 font-regular text-right w-full">
                {description.length}/500
              </Text>
            </View>
            <View className="flex flex-row">
              <View className="flex flex-col space-y-2 w-1/2 pr-2">
                <Text className="text-sub-header-2 font-medium">
                  Start Date <Text className="text-red">*</Text>
                </Text>
                <TouchableOpacity onPress={() => setOpenStartDate(true)}>
                  <View className="flex flex-row items-center bg-white shadow-sm rounded-lg px-4 py-3 space-x-7">
                    <UtilIcon
                      category="MaterialCommunityIcons"
                      name="calendar-month-outline"
                      size={24}
                      color="#929292"
                    />
                    <Text className="text-gray text-sub-header-3 font-regular">
                      {showStartDate}
                    </Text>
                    <DatePicker
                      modal
                      open={openStartDate}
                      date={startDate}
                      mode="date"
                      locale="en"
                      minimumDate={new Date()}
                      onConfirm={(date) => {
                        setOpenStartDate(false);
                        setStartDate(date);
                        setShowStartDate(dayjs(date).format("DD/MM/YYYY"));
                        console.log(
                          dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS")
                        );
                      }}
                      onCancel={() => {
                        setOpenStartDate(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex flex-col space-y-2 w-1/2 pl-2">
                <Text className="text-sub-header-2 font-medium">
                  End Date <Text className="text-red">*</Text>
                </Text>
                <TouchableOpacity onPress={() => setOpenEndDate(true)}>
                  <View className="flex flex-row items-center bg-white shadow-sm rounded-lg px-4 py-3 space-x-7">
                    <UtilIcon
                      category="MaterialCommunityIcons"
                      name="calendar-month-outline"
                      size={24}
                      color="#929292"
                    />
                    <Text className="text-gray text-sub-header-3 font-regular">
                      {showEndDate}
                    </Text>
                    <DatePicker
                      modal
                      open={openEndDate}
                      date={endDate}
                      mode="date"
                      locale="en"
                      minimumDate={new Date()}
                      onConfirm={(date) => {
                        setOpenEndDate(false);
                        setEndDate(date);
                        setShowEndDate(dayjs(date).format("DD/MM/YYYY"));
                        console.log(
                          dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS")
                        );
                      }}
                      onCancel={() => {
                        setOpenEndDate(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-col space-y-2">
              <Text className="text-sub-header-2 font-medium">
                Reward Details <Text className="text-red">*</Text>
              </Text>
              <TextInput
                className={`bg-white rounded-lg p-4 shadow-sm`}
                placeholder="Reward Details"
                placeholderTextColor={"#929292"}
                onChangeText={(text) => setReward(text)}
                editable={true}
                area-label="Campaign Description"
                onSubmitEditing={() => console.log(reward)}
                maxLength={50}
              />
              <Text className="text-gray text-body-3 font-regular text-right w-full">
                {description.length}/50
              </Text>
            </View>
            <View className="flex flex-col mb-2">
              <Text className="text-sub-header-2 font-medium mb-2">
                Campaign Category <Text className="text-red">*</Text>
              </Text>
              <SelectList
                // onSelect={() => alert(selected)}
                maxHeight={125}
                setSelected={setSelected}
                data={data}
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
                  width: "100%",
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
                placeholder="Campaign Category"
                inputStyles={{
                  color: selected === "" ? "#929292" : "#000000",
                }}
                // defaultOption={{ key: "1", value: "Jammu & Kashmir" }} //default selected option
              />
            </View>
            <View className="flex flex-col mb-2">
              <Text className="text-sub-header-2 font-medium mb-2">
                Campaign Type <Text className="text-red">*</Text>
              </Text>
              <SelectList
                // onSelect={() => alert(selected)}
                maxHeight={125}
                setSelected={setSelected}
                data={data}
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
                  width: "100%",
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
                placeholder="Campaign Type"
                inputStyles={{
                  color: selected === "" ? "#929292" : "#000000",
                }}
                // defaultOption={{ key: "1", value: "Jammu & Kashmir" }} //default selected option
              />
            </View>
            <View className="flex flex-row relative">
              <View className="flex flex-col space-y-2">
                <Text className="text-sub-header-2 font-medium">
                  Number of participants
                </Text>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  containerStyle={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    // backgroundColor: "#ffffff",
                  }}
                />
              </View>
              {selectedId === "2" ? (
                <View className="absolute z-10 bottom-0 left-32">
                  <TextInput
                    className={`bg-white rounded-lg p-2 shadow-sm w-16`}
                    placeholder=""
                    placeholderTextColor={"#929292"}
                    onChangeText={(text) =>
                      setReward(String(Math.floor(parseInt(text))))
                    }
                    editable={true}
                    area-label="Campaign Description"
                    onSubmitEditing={() => console.log(reward)}
                    keyboardType="number-pad"
                  />
                </View>
              ) : null}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CampaignCreate;
