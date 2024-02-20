import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

const EditBlock = (props: {
  data?: any;
  handleDecrease?: any;
  handleIncrease?: any;
}) => {
  // {
  //   propertiedName: "Carb",
  //   value: 0,
  //   unit: "g.",
  //   adjustValue: 0,
  // },
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [value, setValue] = useState("");
  const [isDecreaseDisabled, setIsDecreaseDisabled] = useState(false);
  const [isIncreaseDisabled, setIsIncreaseDisabled] = useState(false);
  useEffect(() => {
    if (value === "") {
      setIsDecreaseDisabled(true);
      setIsIncreaseDisabled(true);
    } else {
      const parsedValue = parseInt(value);
      const checkedValue = props.data.value - parsedValue;

      if (checkedValue <= 0) {
        setIsDecreaseDisabled(true);
      } else {
        setIsDecreaseDisabled(false);
      }

      // ถ้า parsedValue เป็น 0 จะ disable ทั้งปุ่ม increase และ decrease
      if (parsedValue === 0) {
        setIsIncreaseDisabled(true);
        setIsDecreaseDisabled(true);
      } else {
        setIsIncreaseDisabled(false);
      }
    }
  }, [value]);
  return (
    <View className="flex flex-col mx-4 border-b border-gray pb-5 mb-5">
      <View className="flex flex-col space-y-6">
        <Text className="text-header-4 font-semibold text-black">
          {props.data.propertiedName}
        </Text>
        <View className="flex flex-row space-x-5">
          <Text
            style={{ width: SCREEN_WIDTH * 0.3 }}
            className="text-sub-header-2 font-medium text-black"
          >
            Current {props.data.propertiedName}:
          </Text>
          <Text className="text-sub-header-2 font-medium text-black pl-3">
            {props.data.value} &nbsp; {props.data.unit}
          </Text>
        </View>
        <View className="flex flex-row space-x-5 items-center">
          <Text
            style={{ width: SCREEN_WIDTH * 0.3 }}
            className="text-sub-header-2 font-medium text-black"
          >
            Adjust {props.data.propertiedName}:
          </Text>
          <TextInput
            style={{ width: SCREEN_WIDTH * 0.5 }}
            aria-aria-labelledby="name"
            className={`bg-white rounded-lg px-4 py-2 shadow-sm`}
            placeholder={`${props.data.propertiedName} (${props.data.unit})`}
            placeholderTextColor={"#929292"}
            onChangeText={(text) => setValue(text)}
            onBlur={() => setValue(value)}
            value={value}
            editable={true}
            area-label="Age (Years)"
            inputMode="numeric"
          />
        </View>
        <View className="flex flex-row space-x-5 justify-center">
          <TouchableOpacity
            disabled={isDecreaseDisabled}
            className={`py-2 flex flex-row justify-center rounded-[20px]  ${
              isDecreaseDisabled ? "bg-gray" : "bg-red"
            }`}
            style={{ width: SCREEN_WIDTH * 0.33 }}
            onPress={() => {
              props.handleDecrease(props.data.propertiedName, value);
              setValue("");
            }}
          >
            <Text className="text-sub-header-1 font-medium text-white">
              Decrease
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isIncreaseDisabled ? true : false}
            className={`py-2 flex flex-row justify-center rounded-[20px]  ${
              isIncreaseDisabled ? "bg-gray" : "bg-green"
            }`}
            style={{ width: SCREEN_WIDTH * 0.33 }}
            onPress={() => {
              props.handleIncrease(props.data.propertiedName, value);
              setValue("");
            }}
          >
            <Text className="text-sub-header-1 font-medium text-white">
              Increase
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditBlock;
