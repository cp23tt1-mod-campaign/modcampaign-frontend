import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";

import { useAppDispatch, useAppSelector } from "../../store/root.store";
import { useCallback, useEffect, useRef, useState } from "react";
import { getDiscoverList } from "../../store/discover/discover.slice";
import { RefreshControl } from "react-native-gesture-handler";
import { ExternalLink } from "../../components/ExternalLink";
import UtilIcon from "../../Util/Icon";
import dayjs from "dayjs";

export default function Discover() {
  // useAxios.get('http://localhost:8080/api/campaign/3').then(res => {
  //   console.log(res.data);
  // })
  // const res = await useAxios.get('http://localhost:8080/api/campaign/3')
  // console.log(res.data);
  const dispatch = useAppDispatch();
  const discoverList = useAppSelector((state) => state.discover.discoverList);
  // const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const isLoadingState = useAppSelector((state) => state.campaign.isLoading);
  // const onRefresh = useCallback(() => {
  //   // dispatch(setLoading(true));
  //   setRefreshing(true);
  // }, []);
  const skeletonAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const opacity = useRef(new Animated.Value(0));
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        dispatch(getDiscoverList());
        console.log(discoverList);
        setIsLoading(false);
      }, 1500);
    }
  }, [dispatch]);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity.current, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [isLoading]);

  const RenderItem = ({ item, index }: any) => {
    return (
      <ExternalLink
        key={`discover-${index}`}
        // style={styles.helpLink}
        className="bg-bg w-full"
        href={`https://www.thaihealth.or.th/${item?.discoverLink}`}
      >
        <View className="bg-bg w-full flex flex-row items-center border-b-[0.75px] py-4">
          <Image
            source={{
              uri: `https://storage.googleapis.com/modcampaign-images/${item?.discoverImage}`,
              width: 142,
              height: 92,
            }}
            className="rounded-lg bg-gray"
          />
          <View className="bg-bg px-3 py-2 space-y-1 w-[204px]">
            <Text className="w-full truncate text-black text-sub-header-1">
              {item?.discoverName}
            </Text>
            <View className="flex flex-row space-x-1 items-center bg-bg">
              <UtilIcon
                category="MaterialCommunityIcons"
                name={"calendar-month"}
                size={16}
                color={"#929292"}
              />
              <Text className="text-gray text-small font-medium">
                {`${dayjs(item?.discoverDate).format("DD/MM/YYYY")}`}
              </Text>
            </View>
          </View>
          {/* <Text>{item?.discoverId}</Text>
          <Text>{item?.discoverName}</Text>
          <View className="flex flex-row space-x-1 items-center bg-bg">
            <UtilIcon
              category="MaterialCommunityIcons"
              name={"calendar-month"}
              size={16}
              color={"#929292"}
            />
            <Text className="text-gray text-small font-medium">
              {`${dayjs(item?.discoverDate).format("DD/MM/YYYY")}`}
            </Text>
          </View>
          <Text>{item?.discoverLink}</Text> */}
        </View>
      </ExternalLink>
    );
  };
  return (
    <SafeAreaView className="w-full h-full flex flex-col bg-bg px-4 space-y-5">
      {/* <ScrollView className="w-full h-full"> */}
      <View className="bg-bg">
        <Text className="text-header-4 font-semibold text-black">
          Health & Wellness
        </Text>
      </View>
      {isLoading ? (
        <View className="bg-bg">
          {skeletonAmount.map((item) => {
            return (
              <View
                key={item}
                className="bg-bg w-full mb-5 border-b-[0.2px] pb-3  border-gray flex-row  justify-between items-center"
              >
                <View className="bg-bg flex flex-row items-center space-x-3">
                  <Animated.View
                    style={{ opacity: opacity.current }}
                    className="w-[142px] h-[92px] bg-gray-3 rounded-lg"
                  ></Animated.View>
                  <View className="bg-bg flex flex-col space-y-2">
                    <Animated.View
                      style={{ opacity: opacity.current }}
                      className="w-[150px] h-[20px] bg-gray-3 rounded-[4px]"
                    ></Animated.View>
                    <Animated.View
                      style={{ opacity: opacity.current }}
                      className="w-[150px] h-[14px] bg-gray-3 rounded-[4px]"
                    ></Animated.View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <FlatList
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          className="mb-2 w-full"
          data={discoverList}
          keyExtractor={(item) => {
            return String(item?.discoverId);
          }}
          extraData={discoverList}
          renderItem={({ item, index }) => {
            return <RenderItem item={item} index={index} />;
          }}
        />
      )}

      {/* <View style={styles.container}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink>
        <Text style={styles.title}>Tab Two</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        >
          <Text>asdasd asdasd</Text>
        </View>
        <EditScreenInfo path="app/(tabs)/two.tsx" />
      </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
