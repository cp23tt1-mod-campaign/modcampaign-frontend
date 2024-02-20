import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Radio = (props: {
  data?: any;
  // isDescription?: boolean;
  // isSelected?: boolean;
  handleSelected?: any;
}) => {
  // const [isSelected, setIsSelected] = useState(false);
  // useEffect(() => {
  //   setIsSelected(props.data.isSelected);
  //   console.log("props.data.isSelected", props.data.isSelected);
  //   console.log("isSelected", isSelected);
  // }, [props.data]);
  return (
    <TouchableOpacity
      onPress={() => props.handleSelected(props.data)}
      className="flex flex-row space-x-3 items-start"
    >
      <View className="mt-1 bg-white rounded-full w-[20px] h-[20px] flex items-center justify-center">
        {props.data.isSelected ? (
          <View className="bg-orange rounded-full w-[10px] h-[10px]"></View>
        ) : null}
      </View>
      <View className="mt-1 flex flex-col">
        <Text className="text-sub-header-3 font-regular">
          {props.data.label}
        </Text>
        {props.data.description ? (
          <Text className="text-sub-header-3 font-regular text-gray">
            {props.data.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default Radio;
