import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as firebase from "firebase";

import AccountStack from "./AccountStack";
import SearchStack from "./SearchStack";
import MusicStack from "./MusicStack";
import AgendaStack from "./AgendaStack";

const Tab = createBottomTabNavigator();

export default function BottomNavUser(props) {
  const { userInfo } = props;
  const [type, setType] = useState(userInfo.email.split("-"));
  // console.log(type);
  // const typeUser = userInfo.email.split("-");

  return (
    <Tab.Navigator
      initialRouteName="identify"
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
      {type[0] == "usr" && (
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
      )}
      {type[0] == "gm" && (
        <Tab.Screen
          name="agenda"
          component={AgendaStack}
          options={{ title: "Mi Agenda" }}
        />
      )}
      <Tab.Screen
        name="identify"
        component={AccountStack}
        options={{ title: "Mi Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "identify":
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

// export default BottomNavUser;
