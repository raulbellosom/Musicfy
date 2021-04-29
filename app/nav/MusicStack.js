import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Music from "../screens/Music";

const Stack = createStackNavigator();

export default function MusicStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="music"
        component={Music}
        options={{ title: "Encuentra tu banda ideal" }}
      />
    </Stack.Navigator>
  );
}
