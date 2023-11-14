import { UtilIcon } from "../../Util/Icon";
import { View, Text, Image } from "react-native";
import React from "react";
import dayjs from "dayjs";

const CampaignCard = (props: { data: any; className?: any; type?: any }) => {
  if (props.type === "campaign") {
    return (
      <View className="flex flex-col shadow-sm">
        <Image
          source={{
            uri: "https://api.slingacademy.com/public/sample-photos/1.jpeg",
          }}
          style={{ width: 204, height: 132 }}
          className="rounded-t-lg"
        />
        <View className="bg-white rounded-b-lg px-3 py-2 space-y-1 w-[204px]">
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
