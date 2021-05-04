import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountStack from "./AccountStack";
import SearchStack from "./SearchStack";
import MusicStack from "./MusicStack";

const Tab = createBottomTabNavigator();

const BottomNavUser = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="account"
      tabBarOptions={{
        inactiveTintColor: "#646464",
        activeTintColor: "#6600A1",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
      })}
    >
      <Tab.Screen
        name="account"
        component={AccountStack}
        options={{ title: "Mi Cuenta" }}
      />
    </Tab.Navigator>
  );
};

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "account":
      iconName = "account-circle-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "music":
      iconName = "music";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}

export default BottomNavGroup;
