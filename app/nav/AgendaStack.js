import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Agenda from "../screens/AgendaGroup/Agenda";

const Stack = createStackNavigator();

export default function AgendaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="agenda"
        component={Agenda}
        options={{ title: "Mi Agenda" }}
      />
    </Stack.Navigator>
  );
}
