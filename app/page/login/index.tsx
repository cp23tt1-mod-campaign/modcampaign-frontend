import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import Onboard from "../../../constants/OnboardPage";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
} from "react-native-reanimated";
import UtilIcon from "../../../Util/Icon";
import Modal from "react-native-modal";
import { useAppDispatch, useAppSelector } from "../../../store/root.store";
import {
  setDietary,
  setUserEmail,
  setUserFirstName,
  setUserLastName,
  setUserProfile,
  setUserProfileImage,
  signInWithGoogle,
} from "../../../store/user/user.slice";
import { UserEntity } from "../../../store/user/user.entity";

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.user.userProfile);
  const [userInfo, setUserInfo] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    // androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    androidClientId:
      "909091026524-hfug873n546rsbnk5qjpa507iesl3llh.apps.googleusercontent.com",
  });
  useEffect(() => {
    const check = async () => {
      // setIsLoading(true);
      const res: any = await handleSignInWithGoogle();
      // setIsLoading(false);
      console.log("🚀 ~ file: index.tsx:20 ~ check ~ status:", res);
      if (res.status === "already login") {
        // setTimeout(() => {
        const dietaryData = await AsyncStorage.getItem("@dietaryData");
        if (dietaryData) {
          dispatch(setDietary(JSON.parse(dietaryData)));
        }
        router.push({
          pathname: "/(tabs)/Home",
        });
        setIsLoading(false);
        // }, 2000);
      } else if (res.status === "login success") {
        if (res.type === "exist") {
          // const dietaryData = await AsyncStorage.getItem("@dietaryData");
          // if (dietaryData) {
          //   dispatch(setDietary(JSON.parse(dietaryData)));
          // }
          // setTimeout(() => {
          await AsyncStorage.setItem(
            "@dietaryData",
            JSON.stringify({
              food: {
                calories: 0,
                carb: 0,
                protien: 0,
                fat: 0,
              },
              exercise: {
                cal: 0,
              },
              water: {
                lit: 0,
              },
              caloriesRemain: {
                value: 0,
              },
            })
          );
          const dietaryData = await AsyncStorage.getItem("@dietaryData");

          if (dietaryData) {
            dispatch(setDietary(JSON.parse(dietaryData)));
          }
          router.push({
            pathname: "/(tabs)/Home",
          });
          setIsLoading(false);

          // }, 2000);
        } else {
          await AsyncStorage.setItem(
            "@dietaryData",
            JSON.stringify({
              food: {
                calories: 0,
                carb: 0,
                protien: 0,
                fat: 0,
              },
              exercise: {
                cal: 0,
              },
              water: {
                lit: 0,
              },
              caloriesRemain: {
                value: 0,
              },
            })
          );
          const dietaryData = await AsyncStorage.getItem("@dietaryData");

          if (dietaryData) {
            dispatch(setDietary(JSON.parse(dietaryData)));
          }
          // setTimeout(() => {
          router.push({
            pathname: "/page/login/Policy",
          });
          setIsLoading(false);
          // }, 2000);
        }

        // setIsLoading(false);
      } else {
        // router.push({
        //   pathname: "/page/profile/edit/",
        // });
        // router.push({
        //   pathname: "/(tabs)/Home",
        // });
        // setTimeout(() => {
        router.push({
          pathname: "/page/login/",
        });
        // }, 2000);
        setIsLoading(false);
        await AsyncStorage.setItem(
          "@dietaryData",
          JSON.stringify({
            food: {
              calories: 0,
              carb: 0,
              protien: 0,
              fat: 0,
            },
            exercise: {
              cal: 0,
            },
            water: {
              lit: 0,
            },
            caloriesRemain: {
              value: 0,
            },
          })
        );
        // setIsLoading(false);
      }

      // const dietaryData = await AsyncStorage.getItem("@dietaryData");
      // console.log(dietaryData);

      // if (dietaryData) {
      //   dispatch(setDietary(JSON.parse(dietaryData)));
      // } else {
      //   await AsyncStorage.setItem(
      //     "@dietaryData",
      //     JSON.stringify({
      //       food: {
      //         calories: 0,
      //         carb: 0,
      //         protien: 0,
      //         fat: 0,
      //       },
      //       exercise: {
      //         cal: 0,
      //       },
      //       water: {
      //         lit: 0,
      //       },
      //       caloriesRemain: {
      //         value: 0,
      //       },
      //     })
      //   );
      // }

      // router.push({
      //   pathname: "/(tabs)/Home",
      // });
    };
    check();
    console.log("login with google");
  }, [response, promptAsync]);

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    const user: any = await AsyncStorage.getItem("@user");
    const accessToken: any = await AsyncStorage.getItem("@accessToken");
    console.log("🚀 ~ handleSignInWithGoogle ~ user:111", user);

    if (!user) {
      // router.replace({
      //   pathname: "(tabs)/home",
      // });

      console.log(response);
      console.log(response?.type);

      if (response?.type === "success") {
        const { authentication } = response;
        console.log(authentication);

        // console.log(
        //   "🚀 ~ file: Home.tsx:51 ~ handleSignInWithGoogle ~ response:",
        //   response
        // );
        // console.log(
        //   "🚀 ~ file: Home.tsx:54 ~ handleSignInWithGoogle ~ authentication?.accessToken:",
        //   authentication?.accessToken
        // );

        const res = await getUserInfo(authentication?.accessToken);
        console.log(res);

        const responseAPI: any = await dispatch(
          signInWithGoogle({ email: res })
        );

        if (responseAPI.payload.data.status === "found") {
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
          } = responseAPI.payload.data.data;
          console.log(profileImage);

          await AsyncStorage.setItem(
            "@user",
            JSON.stringify(responseAPI.payload.data.data)
          );
          await AsyncStorage.setItem(
            "@accessToken",
            JSON.stringify(accessToken)
          );

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
          return { status: "login success", type: "exist" };
        } else {
          return { status: "login success", type: "notExist" };
        }
      } else {
        return { status: "not login" };
      }
    } else {
      // router.push({
      //   pathname: "../(tabs)/home",
      // });

      const userData = JSON.parse(user);
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
      } = userData;
      console.log(userData);

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
      // const { given_name, family_name, email, picture } = user;
      // const dataFromGoogle: Partial<UserEntity> = {
      //   firstName: given_name,
      //   lastName: family_name,
      //   email: email,
      //   profileImage: picture,
      // };
      // dispatch(setUserProfile(dataFromGoogle));
      // dispatch(setUserFirstName(given_name));
      // dispatch(setUserLastName(family_name));
      // dispatch(setUserEmail(email));
      // dispatch(setUserProfileImage(picture));
      // setUserInfo(JSON.parse(user));

      return { status: "already login" };
    }
  };

  const getUserInfo = async (token: any) => {
    if (!token) return;

    try {
      // const response = await fetch(
      //   "https://www.googleapis.com/userinfo/v2/me",
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
      );

      const user = await response.json();
      console.log("🚀 ~ getUserInfo ~ user:", user);

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      const { given_name, family_name, email, picture } = user;
      const lastIndex = picture.lastIndexOf("/a/");

      // Extract the substring starting from the last occurrence of '/a/' + its length
      const result =
        lastIndex !== -1
          ? picture.substring(lastIndex + "/a/".length)
          : picture;
      // const dataFromGoogle: Partial<UserEntity> = {
      //   firstName: given_name,
      //   lastName: family_name,
      //   email: email,
      //   profileImage: picture,
      // };
      // dispatch(setUserProfile(dataFromGoogle));
      dispatch(setUserFirstName(given_name));
      dispatch(setUserLastName(family_name));
      dispatch(setUserEmail(email));
      dispatch(setUserProfileImage(result));
      return user.email;
      // setUserInfo(user);
    } catch (error) {}
    // const response = await fetch(
    //   `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    // );
    // const userInfoResponse = await response.json();
    // setUserInfo(userInfoResponse);
    // await AsyncStorage.setItem("@user", JSON.stringify(userInfoResponse));
  };
  // const { width, height } = Dimensions.get("window");
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      // let index = Math.floor(event.contentOffset.x / 300);
      x.value = event.contentOffset.x;
      // currentPage.value = Math.floor(event.contentOffset.x / 300);
      // console.log(x.value);
      // console.log(currentPage.value);
    },
  });
  const RenderItem = ({ item, index }: any) => {
    const translateAnimation = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolate.CLAMP
      );
      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
      };
    });
    const translateImageAnimation = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      const translateYAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [100, 0, 100],
        Extrapolate.CLAMP
      );
      return {
        opacity: opacityAnimation,
        transform: [{ translateY: translateYAnimation }],
        height: 330,
      };
    });
    return (
      <View
        key={`page-${index}`}
        className="flex flex-col justify-center items-center h-full mt-6"
        style={{ width: SCREEN_WIDTH }}
      >
        <Animated.Image source={item.image} style={translateImageAnimation} />
        <Animated.View
          className="flex items-center space-y-5"
          style={translateAnimation}
        >
          <Text className="text-black text-header-2 font-bold">
            {item.title}
          </Text>
          <Text className="px-14 text-gray text-sub-header-3 font-regular text-center leading-6">
            {item.description}
          </Text>
        </Animated.View>
        {index === 2 ? (
          <Pressable
            onPress={() => promptAsync()}
            // onPress={() => console.log("pressed")}
            className="w-full flex flex-row justify-center items-center mt-16"
          >
            <View className="bg-orange py-2 px-14 rounded-3xl">
              <View className="flex flex-row space-x-2 items-center">
                <Image
                  source={require("../../../public/images/googleIcon.png")}
                  style={{ width: 22, height: 22 }}
                  className="rounded-full bg-white"
                />
                <Text className=" text-white text-sub-header-1 font-medium text-center">
                  Login with Google
                </Text>
              </View>
            </View>
          </Pressable>
        ) : null}

        {/* <Text>{SCREEN_WIDTH}</Text> */}
        {/* <Text>{height}</Text> */}
        {/* <Text>{width2}</Text> */}
      </View>
    );
  };
  const PaginationComp = ({ i }: any) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      const widthAnimation = interpolate(
        x.value,
        [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH],
        [10, 20, 10],
        Extrapolate.CLAMP
      );
      const opacityAnimation = interpolate(
        x.value,
        [(i - 1) * SCREEN_WIDTH, i * SCREEN_WIDTH, (i + 1) * SCREEN_WIDTH],
        [0.5, 1, 0.5],
        Extrapolate.CLAMP
      );

      return {
        width: widthAnimation,
        opacity: opacityAnimation,
      };
    });
    return (
      <Animated.View
        key={`${i}-dot`}
        style={animatedDotStyle}
        className={`w-2 h-2 rounded-full mr-3 bg-orange`}
      >
        {/* <Text>{i}</Text> */}
        {/* <Text>{currentPage.value}</Text> */}
        {/* <Text>{currentIndex}</Text> */}
      </Animated.View>
    );
  };
  return (
    // <SafeAreaView className="bg-white" style={{ width: SCREEN_WIDTH }}>
    <SafeAreaView
      className=" bg-white h-full w-full"
      // style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
    >
      <Modal
        isVisible={isLoading}
        animationIn={"zoomIn"}
        animationOut={"zoomOut"}
        coverScreen={true}
        hasBackdrop={true}
        backdropColor="#000000b3"
      >
        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View className="w-[296px] bg-white px-8 py-5 rounded-xl flex flex-col  items-center space-y-4">
            <ActivityIndicator size="large" color="#FF7410" className="py-5" />
          </View>
        </View>
      </Modal>
      <View className="w-full h-full flex flex-col justify-center items-center">
        <Animated.FlatList
          onScroll={onScroll}
          // contentOffset={{ x: currentPage }}
          className="w-full h-full"
          data={Onboard}
          keyExtractor={(item, index) => item.id}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return <RenderItem item={item} index={index} />;
          }}
        />
        <View
          className="flex flex-row justify-between items-center px-10 mb-12"
          style={{ width: SCREEN_WIDTH }}
        >
          <View className="flex flex-row">
            {Onboard.map((item, index) => {
              return <PaginationComp i={index} key={index} />;
            })}
          </View>
          {/* <Pressable
            onPress={() => {
              setCurrentPage(currentPage + 411);
            }}
            className="bg-orange w-12 h-12 rounded-full flex items-center justify-center"
          >
            <UtilIcon
              category="Octicons"
              name="arrow-right"
              color="#FFFFFF"
              size={28}
            />
          </Pressable> */}
        </View>
        {/* <Pressable
          onPress={() => promptAsync()}
          // onPress={() => console.log("pressed")}
          className="w-full flex flex-row justify-center items-center"
        >
          <View className="bg-orange py-2 px-14 rounded-3xl">
            <View className="flex flex-row space-x-2 items-center">
              <Image
                source={require("../../public/images/googleIcon.png")}
                style={{ width: 52, height: 52 }}
              />
            </View>
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Login with Google
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => signOut()}
          className="w-full flex flex-row justify-center items-center mt-2"
        >
          <View className="bg-red py-2 px-12 rounded-3xl">
            <Text className="w-full text-white text-sub-header-1 font-medium text-center">
              Clear Local Storage
            </Text>
          </View>
        </Pressable> */}
        {/* <View className="flex flex-col justify-center items-center">
          <Image
            source={{
              uri: userInfo?.picture,
              width: 100,
              height: 100,
            }}
            className="rounded-lg bg-gray"
          />
          <Text className="text-sub-header-1 font-medium text-center">
            Name: {userInfo?.name}
            {JSON.stringify(userInfo, null, 2)}
          </Text>
          <Text className="text-sub-header-1 font-medium text-center">
            Email: {userInfo?.email}
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Login;
