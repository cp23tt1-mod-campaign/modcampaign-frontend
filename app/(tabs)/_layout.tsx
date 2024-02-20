import FontAwesome from "@expo/vector-icons/FontAwesome";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UtilIcon from "../../Util/Icon";
import { Link, Tabs } from "expo-router";
import { Image, Pressable, Text, View, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./Home";
import DiaryPage from "./Diary";
import CampaignPage from "./Campaign";
import DiscoverPage from "./Discover";
import ProfilePage from "./Profile";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconCategory;
          if (route.name === "Home") {
            iconName = focused ? "home-filled" : "home-filled";
            iconCategory = "MaterialIcons";
          } else if (route.name === "Dietary") {
            iconName = focused ? "nutrition" : "nutrition";
            iconCategory = "Ionicons";
          } else if (route.name === "Campaign") {
            iconName = focused ? "trophy" : "trophy";
            iconCategory = "Ionicons";
          } else if (route.name === "Discover") {
            iconName = focused ? "explore" : "explore";
            iconCategory = "MaterialIcons";
          } else if (route.name === "Profile") {
            iconName = focused ? "account-circle" : "account-circle";
            iconCategory = "MaterialIcons";
          }
          return (
            <UtilIcon
              category={iconCategory}
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          height: 90,
          paddingBottom: 25,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: "normal",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            height: 90,
          },
          headerLeft: () => (
            <Image
              source={require("../../assets/images/headerIcon.png")}
              style={{ width: 45, height: 45 }}
              className="ml-4"
            />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => [
                pressed ? { opacity: 0.5 } : { opacity: 1 },
              ]}
              onPress={() => console.log("notification")}
              className="mr-4"
            >
              <UtilIcon
                category="MaterialIcons"
                name={"notifications-none"}
                size={28}
                color="#000000"
              />
            </Pressable>
          ),
          headerBackground: () => <View className="bg-bg"></View>,
        }}
      />
      <Tab.Screen
        name="Dietary"
        component={DiaryPage}
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            height: 90,
          },
          headerLeft: () => (
            <Image
              source={require("../../assets/images/headerIcon.png")}
              style={{ width: 45, height: 45 }}
              className="ml-4"
            />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => [
                pressed ? { opacity: 0.5 } : { opacity: 1 },
              ]}
              onPress={() => console.log("notification")}
              className="mr-4"
            >
              <UtilIcon
                category="MaterialIcons"
                name={"notifications-none"}
                size={28}
                color="#000000"
              />
            </Pressable>
          ),
          headerBackground: () => <View className="bg-bg"></View>,
        }}
      />
      <Tab.Screen
        name="Campaign"
        component={CampaignPage}
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            height: 90,
          },
          headerLeft: () => (
            <Image
              source={require("../../assets/images/headerIcon.png")}
              style={{ width: 45, height: 45 }}
              className="ml-4"
            />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => [
                pressed ? { opacity: 0.5 } : { opacity: 1 },
              ]}
              onPress={() => console.log("notification")}
              className="mr-4"
            >
              <UtilIcon
                category="MaterialIcons"
                name={"notifications-none"}
                size={28}
                color="#000000"
              />
            </Pressable>
          ),
          headerBackground: () => <View className="bg-bg"></View>,
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            height: 90,
          },
          headerLeft: () => (
            <Image
              source={require("../../assets/images/headerIcon.png")}
              style={{ width: 45, height: 45 }}
              className="ml-4"
            />
          ),
          headerRight: () => (
            <Pressable
              style={({ pressed }) => [
                pressed ? { opacity: 0.5 } : { opacity: 1 },
              ]}
              onPress={() => console.log("notification")}
              className="mr-4"
            >
              <UtilIcon
                category="MaterialIcons"
                name={"notifications-none"}
                size={28}
                color="#000000"
              />
            </Pressable>
          ),
          headerBackground: () => <View className="bg-bg"></View>,
        }}
      />
    </Tab.Navigator>
    // <Tabs
    //   screenOptions={{
    //     // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //     tabBarStyle: {
    //       height: 90,
    //       paddingBottom: 25,
    //       // marginBotto  m: 50,
    //     },
    //     tabBarLabelStyle: {
    //       fontFamily: "Inter",
    //       fontSize: 12,
    //       fontWeight: "normal",
    //     },
    //   }}
    //   // tabBar={(props) => (
    //   //   <View className="bg-red">
    //   //     <Text>asd</Text>
    //   //   </View>
    //   // )}

    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //       // headerShown: false,
    //       unmountOnBlur: true,
    //       // headerBackground: () => <View className="bg-bg"></View>,
    //       // headerLeft: () => (
    //       //   <Pressable>
    //       //     <Text>Left</Text>
    //       //   </Pressable>
    //       // ),
    //       tabBarIcon: ({ color }) => (
    //         <UtilIcon
    //           category="MaterialIcons"
    //           name="home-filled"
    //           size={28}
    //           color={color}
    //         />
    //         // <MaterialIcons name="home" size={32} color={color} />
    //       ),
    //     }}
    //     // listeners={{
    //     //   tabPress: (e) => {
    //     //     e.preventDefault();
    //     //   },
    //     // }}
    //   />
    //   <Tabs.Screen
    //     name="diary"
    //     options={{
    //       title: "Diary",
    //       headerShown: false,
    //       // headerTitle: () => (
    //       //   <View>
    //       //     <Text style={{fontFamily: 'Inter'}}>Tab One</Text>
    //       //   </View>
    //       // ),
    //       tabBarIcon: ({ color }) => (
    //         <UtilIcon
    //           category="MaterialIcons"
    //           name="auto-stories"
    //           size={28}
    //           color={color}
    //         />
    //       ),
    //     }}
    //     listeners={{
    //       tabPress: (e) => {
    //         e.preventDefault();
    //       },
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="campaign"
    //     options={{
    //       title: "Campaign",
    //       // headerShown: false,
    //       unmountOnBlur: true,
    //       headerTitleAlign: "left",
    //       headerTitleStyle: {
    //         fontSize: 20,
    //       },
    //       headerStyle: {
    //         height: 120,
    //       },
    //       headerLeft: () => (
    //         <Image
    //           source={require("../../assets/images/headerIcon.png")}
    //           style={{ width: 45, height: 45 }}
    //           className="ml-4"
    //         />
    //       ),
    //       headerRight: () => (
    //         <Pressable
    //           style={({ pressed }) => [
    //             pressed ? { opacity: 0.5 } : { opacity: 1 },
    //           ]}
    //           onPress={() => console.log("notification")}
    //           className="mr-4"
    //         >
    //           <UtilIcon
    //             category="MaterialIcons"
    //             name={"notifications-none"}
    //             size={28}
    //             color="#000000"
    //           />
    //         </Pressable>
    //       ),
    //       headerBackground: () => <View className="bg-bg"></View>,
    //       // headerShown: false,
    //       tabBarIcon: ({ color }) => (
    //         <UtilIcon
    //           category="Ionicons"
    //           name="trophy"
    //           size={28}
    //           color={color}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="discover"
    //     options={{
    //       title: "Discover",
    //       headerBackground: () => <View className="bg-bg"></View>,
    //       // headerShown: false,
    //       tabBarIcon: ({ color }) => (
    //         <UtilIcon
    //           category="MaterialIcons"
    //           name="explore"
    //           size={28}
    //           color={color}
    //         />
    //       ),
    //     }}
    //     listeners={{
    //       tabPress: (e) => {
    //         e.preventDefault();
    //       },
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //       headerBackground: () => <View className="bg-bg"></View>,
    //       // headerShown: false,
    //       tabBarIcon: ({ color }) => (
    //         <UtilIcon
    //           category="MaterialIcons"
    //           name="account-circle"
    //           size={28}
    //           color={color}
    //         />
    //       ),
    //     }}
    //     listeners={{
    //       tabPress: (e) => {
    //         e.preventDefault();
    //       },
    //     }}
    //   />
    // </Tabs>
  );
}
