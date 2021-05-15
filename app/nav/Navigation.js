// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import * as firebase from "firebase";

// import IdentifyStack from "./IdentifyStack";
// import BottomNavUser from "./BottomNavUser";

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";

import AccountStack from "./AccountStack";
import MusicStack from "./MusicStack";
import AgendaStack from "./AgendaStack";
import GroupStack from "./GroupStack";
import IdentifyStack from "./IdentifyStack";
import DrawerNavigation from "./DrawerNavigation";
import MainTabScreen from "./MainTabScreen";

// const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setUser(false) : setUser(true);
    });
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={MainTabScreen} />
        {/* <Drawer.Screen name="Mi Agenda" component={MainTabScreen} />
        <Drawer.Screen name="Mi Perfil" component={GroupStack} /> */}
        <Drawer.Screen name="Cuenta" component={AccountStack} />
      </Drawer.Navigator>
      {/* <Tab.Navigator
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
        {user && (
          <Tab.Screen
            name="group"
            component={GroupStack}
            options={{ title: "Mi Perfil" }}
          />
        )}
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator> */}
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
    case "group":
      iconName = "account-group-outline";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
