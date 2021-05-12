// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import * as firebase from "firebase";

// import IdentifyStack from "./IdentifyStack";
// import BottomNavUser from "./BottomNavUser";

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

import AccountStack from "./AccountStack";
import SearchStack from "./SearchStack";
import MusicStack from "./MusicStack";
import AgendaStack from "./AgendaStack";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setUser(false) : setUser(true);
    });
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="music"
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
        {user && (
          <Tab.Screen
            name="agenda"
            component={AgendaStack}
            options={{ title: "Mi Agenda" }}
          />
        )}
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Mi cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
  // const [login, setLogin] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     !user ? setLogin(false) : setLogin(true);
  //     !user ? setLogin(false) : setUserInfo(user);
  //   });
  // }, []);

  // return (
  //   <NavigationContainer>
  //     {login !== false ? (
  //       userInfo && <BottomNavUser userInfo={userInfo} />
  //     ) : (
  //       <IdentifyStack />
  //     )}
  //   </NavigationContainer>
  // );
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
    case "agenda":
      iconName = "book-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
