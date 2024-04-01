import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable, View, useColorScheme } from "react-native";
import { store, useAppDispatch } from "../store/root.store";
import { Provider, useDispatch } from "react-redux";
import { router } from "expo-router";
import UtilIcon from "../Util/Icon";
import TabLayout from "./(tabs)/_layout";
import ModalScreen from "./modal";
import CampaignList from "./page/campaign/list";
import CampaignOwnedList from "./page/campaign/list/Owned";
import CampaignDetail from "./page/campaign/detail/[id]";
import CampaignCreate from "./page/campaign/Create";
import LoginPage from "./page/login";
import PolicyPage from "./page/login/Policy";
import LoginConnectDevicePage from "./page/login/ConnectDevice";
import InformProfilePage from "./page/login/InformProfile";
import EditDietary from "./page/dietary/edit";
import EditProfile from "./page/profile/edit";
import { createCampaign } from "../store/campaign/campaign.slice";
import HeaderRight from "../components/Campaign/HeaderRight";
import CampaignConnect from "./page/campaign/ConnectDevice/index";
import LeaderBoardPage from "./page/campaign/detail/LeaderBoard";
import UserManagementPage from "./page/userManage/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: "(tabs)",
  initialRouteName: "page/login",
  // initialRouteName: "page/login/Policy",
  // initialRouteName: "page/login/InformProfile",
  // initialRouteName: "page/dietary/edit",
  // initialRouteName: "page/profile/edit",
};
const Stacks = createNativeStackNavigator();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // export default async function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // Inter: require('../assets/fonts/Inter-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // const isLogin = async () => {
  // const user = AsyncStorage.getItem("@user");

  // router.push({
  //   pathname: "/page/login",
  // });
  // return (
  // <Provider store={store}>
  //   <Stacks.Navigator screenOptions={{ headerBackTitleVisible: false }}>
  //     <Stacks.Screen
  //       name="page/login/index"
  //       component={LoginPage}
  //       options={{
  //         headerShown: false,
  //       }}
  //     />
  //   </Stacks.Navigator>
  // </Provider>
  // );
  //   if (user) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  // if (await isLogin()) {

  // }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const linking = {
  //   prefixes: ["modcampaign://"],
  // };
  // const createCampaignState = () => {
  //   // dispatch(createCampaign());
  //   console.log("create campaign");

  //   // dispatch(createCampaign())
  // };
  // const dispatch = useAppDispatch();
  return (
    <Provider store={store}>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      {/* <NavigationContainer linking={linking}> */}
      {/* <Campaign.Navigator>
        <Campaign.Screen name="(tabs)" component={}/>
        </Campaign.Navigator> */}
      <Stacks.Navigator screenOptions={{ headerBackTitleVisible: false }}>
        <Stacks.Screen
          name="page/login/index"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        />
        <Stacks.Screen
          name="page/login/Policy"
          component={PolicyPage}
          options={{
            title: "Privacy Policy",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            // headerRight: () => <HeaderRight />,
          }}
        />
        <Stacks.Screen
          name="page/login/ConnectDevice"
          component={LoginConnectDevicePage}
          options={{
            headerShown: false,
          }}
        />
        <Stacks.Screen
          name="page/login/InformProfile"
          component={InformProfilePage}
          options={{
            headerShown: false,
            // title: "New Campaign",
            // headerStyle: {
            //   backgroundColor: "#F5F5F5",
            // },
            // headerTintColor: "#000000",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            //   fontSize: 20,
            // },
            // headerShadowVisible: false,
            // headerRight: () => <HeaderRight />,
          }}
        />
        <Stacks.Screen
          name="page/dietary/edit/index"
          component={EditDietary}
          options={{
            // headerShown: false,
            title: "Edit Food Details",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            // headerRight: () => <HeaderRight />,
          }}
        />
        <Stacks.Screen
          name="page/profile/edit/index"
          component={EditProfile}
          options={{
            // headerShown: false,
            title: "Edit Profile",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            // headerRight: () => <HeaderRight />,
          }}
        />
        <Stacks.Screen
          name="page/campaign/detail/LeaderBoard"
          component={LeaderBoardPage}
          options={{
            // headerShown: false,
            title: "Leaderboard",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        />
        <Stacks.Screen
          name="page/userManage/index"
          component={UserManagementPage}
          options={{
            // headerShown: false,
            title: "User Management",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        />
        <Stacks.Screen
          name="(tabs)"
          component={TabLayout}
          options={{
            headerShown: false,
          }}
        />
        <Stacks.Screen
          name="ModalScreen"
          component={ModalScreen}
          options={{ presentation: "modal" }}
        />
        <Stacks.Screen
          name="page/campaign/list/index"
          // name="CampaignList"
          options={{
            // presentation: "modal",
            title: "Campaign",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
          component={CampaignList}
        />
        <Stacks.Screen
          // name="page/campaign/list/index"
          name="page/campaign/list/Owned"
          options={{
            // presentation: "modal",
            title: "My Campaign",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
          component={CampaignOwnedList}
        />
        <Stacks.Screen
          name="page/campaign/detail/[id]"
          component={CampaignDetail}
          options={{
            title: "Campaign Details",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        />
        <Stacks.Screen
          name="page/campaign/Create"
          component={CampaignCreate}
          options={{
            // headerShown: false,
            title: "New Campaign",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stacks.Screen
          name="page/campaign/ConnectDevice/index"
          component={CampaignConnect}
          options={{
            // headerShown: false,
            title: "Connect Device",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            // headerRight: () => <HeaderRight />,
          }}
        />
      </Stacks.Navigator>
      {/* </NavigationContainer> */}
      {/* <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen
          name="page/campaign/list/index"
          options={{
            // presentation: "modal",
            title: "Campaign",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="page/campaign/detail/[id]"
          options={{
            title: "Campaign Details",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="page/campaign/create"
          options={{
            // headerShown: false,
            title: "New Campaign",
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerTintColor: "#000000",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerShadowVisible: false,
            headerRight: () => (
              <Pressable
                onPress={() => console.log("create campaign")}
                className="flex flex-row justify-end"
              >
                <UtilIcon
                  category="MaterialCommunityIcons"
                  name="check"
                  size={28}
                />
              </Pressable>
              // <FontAwesome.Button
              //   name="check"
              //   backgroundColor="#F5F5F5"
              //   color="#000000"
              //   onPress={() => router.back()}
              // />
            ),
          }}
        />
      </Stack> */}
      {/* </ThemeProvider> */}
    </Provider>
  );
}
