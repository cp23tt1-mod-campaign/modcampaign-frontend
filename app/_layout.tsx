import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Pressable, View, useColorScheme } from "react-native";
import { store } from "../store/root.store";
import { Provider } from "react-redux";
import { router } from "expo-router";
import UtilIcon from "../Util/Icon";
import CampaignPage from "./(tabs)/campaign";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};
const Tab = createBottomTabNavigator();
const Campaign = createNativeStackNavigator();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
      {/* <NavigationContainer> */}
      {/* <Tab.Navigator>
        <Tab.Screen name="(tabs)" component={CampaignPage} />
      </Tab.Navigator> */}
      {/* </NavigationContainer> */}
      {/* <Campaign.Navigator>
        <Campaign.Screen name="(tabs)" component={}/>
        </Campaign.Navigator> */}
      <Stack>
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
      </Stack>
      {/* </ThemeProvider> */}
    </Provider>
  );
}
