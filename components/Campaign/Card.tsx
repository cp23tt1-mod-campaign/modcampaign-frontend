import UtilIcon from "../../Util/Icon";
import { View, Text, Image } from "react-native";
import React from "react";
import dayjs from "dayjs";

const CampaignCard = (props: { data: any; className?: any; type?: any }) => {
  // const timestamp = new Date().getTime();
  const today = new Date();
  if (props.type === "campaign") {
    return (
      <View className="flex flex-col bg-white rounded-lg shadow-sm relative">
        {dayjs(props.data.end).isBefore(today) ? (
          <View className="absolute z-50 right-2 top-2 bg-orange-2 rounded-xl flex flex-row justify-center px-3 py-1">
            <Text className="text-orange text-small font-medium">
              Completed
            </Text>
          </View>
        ) : null}
        <Image
          source={{
            uri: `https://storage.googleapis.com/modcampaign-images/${props.data.image}`,
            width: 204,
            height: 132,
          }}
          className="rounded-t-lg bg-gray"
        />
        <View className="px-3 py-2 space-y-1 w-[204px]">
          <Text className="w-full truncate text-black text-sub-header-1">
            {props.data.name}
          </Text>
          <View className="flex flex-row space-x-1 items-center">
            <UtilIcon
              category="MaterialCommunityIcons"
              name={"calendar-month"}
              size={16}
              color={"#929292"}
            />
            <Text className="text-gray text-small font-medium">
              {`${dayjs(props.data.start).format("DD/MM/YYYY")} - ${dayjs(
                props.data.end
              ).format("DD/MM/YYYY")}`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

export default CampaignCard;
