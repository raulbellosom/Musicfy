import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import Music from "../screens/Music/Music";
import MusicInfo from "../screens/Music/MusicInfo";
import MusicSearch from "../screens/Music/MusicSearch";

const Stack = createStackNavigator();

export default function MusicStack(props) {
  const { navigation } = props;
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#6600A1",
        headerLeft: () => (
          <Icon
            type="material-community"
            name="menu"
            color="#6600A1"
            size={25}
            containerStyle={{ paddingLeft: 20 }}
            s
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    >
      <Stack.Screen
        name="music"
        component={Music}
        options={{ title: "Encuentra tu grupo musical" }}
      />
      <Stack.Screen
        name="search"
        component={MusicSearch}
        options={{ title: "Busca tu grupo musical" }}
      />
      <Stack.Screen name="info" component={MusicInfo} />
    </Stack.Navigator>
  );
}
