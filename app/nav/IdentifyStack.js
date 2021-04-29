import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import UserGuest from "../screens/Account/UserGuest";
import { identity } from "lodash";

const Stack = createStackNavigator();

const IdentifyStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="identify" headerMode="none">
      <Stack.Screen name="identify" component={UserGuest} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
};

export default IdentifyStack;
