import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as firebase from "firebase";

import AccountStack from "./AccountStack";
import MusicStack from "./MusicStack";
import AgendaStack from "./AgendaStack";
import IdentifyStack from "./IdentifyStack";
import GroupStack from "./GroupStack";

const Tab = createBottomTabNavigator();

export default function BottomNavUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setUser(false) : setUser(true);
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={user ? "identify" : "music"}
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
          name="perfil"
          component={GroupStack}
          options={{ title: "Mi Perfil" }}
        />
      )}
      {!user && (
        <Tab.Screen
          name="register"
          component={IdentifyStack}
          options={{ title: "Registrarse" }}
        />
      )}
    </Tab.Navigator>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "register":
      iconName = "account-circle-outline";
      break;
    case "perfil":
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
