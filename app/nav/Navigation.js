import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";

import IdentifyStack from "./IdentifyStack";

import AccountStack from "./AccountStack";
import SearchStack from "./SearchStack";
import MusicStack from "./MusicStack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Navigation() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  return (
    <NavigationContainer>
      {login !== false ? (
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
            name="music"
            component={MusicStack}
            options={{ title: "Descubre" }}
          />

          <Tab.Screen
            name="search"
            component={SearchStack}
            options={{ title: "Buscar" }}
          />

          <Tab.Screen
            name="account"
            component={AccountStack}
            options={{ title: "Mi Cuenta" }}
          />
        </Tab.Navigator>
      ) : (
        <IdentifyStack />
      )}
    </NavigationContainer>
  );
}

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
