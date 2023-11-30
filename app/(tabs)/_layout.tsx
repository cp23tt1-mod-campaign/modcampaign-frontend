import FontAwesome from "@expo/vector-icons/FontAwesome";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import UtilIcon from "../../Util/Icon";
import { Link, Tabs } from "expo-router";
import { Image, Pressable, Text, View, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          height: 90,
          paddingBottom: 25,
          // marginBotto  m: 50,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: "normal",
        },
      }}
      // tabBar={(props) => (
      //   <View className="bg-red">
      //     <Text>asd</Text>
      //   </View>
      // )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // headerShown: false,
          unmountOnBlur: true,
          // headerBackground: () => <View className="bg-bg"></View>,
          // headerLeft: () => (
          //   <Pressable>
          //     <Text>Left</Text>
          //   </Pressable>
          // ),
          tabBarIcon: ({ color }) => (
            <UtilIcon
              category="MaterialIcons"
              name="home-filled"
              size={28}
              color={color}
            />
            // <MaterialIcons name="home" size={32} color={color} />
          ),
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault();
        //   },
        // }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: "Diary",
          headerShown: false,
          // headerTitle: () => (
          //   <View>
          //     <Text style={{fontFamily: 'Inter'}}>Tab One</Text>
          //   </View>
          // ),
          tabBarIcon: ({ color }) => (
            <UtilIcon
              category="MaterialIcons"
              name="auto-stories"
              size={28}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="campaign"
        options={{
          title: "Campaign",
          // headerShown: false,
          unmountOnBlur: true,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerStyle: {
            height: 120,
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
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <UtilIcon
              category="Ionicons"
              name="trophy"
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerBackground: () => <View className="bg-bg"></View>,
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <UtilIcon
              category="MaterialIcons"
              name="explore"
              size={28}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerBackground: () => <View className="bg-bg"></View>,
          // headerShown: false,
          tabBarIcon: ({ color }) => (
            <UtilIcon
              category="MaterialIcons"
              name="account-circle"
              size={28}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tabs>
  );
}
