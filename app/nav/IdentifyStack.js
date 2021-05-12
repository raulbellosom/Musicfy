import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import UserGuest from "../screens/Account/UserGuest";
import LoginGroup from "../screens/AccountGroup/LoginGroup";
import RegisterGroup from "../screens/AccountGroup/RegisterGroup";
import AccountGroup from "../screens/AccountGroup/AccountGroup";
// import RegisterPhone from "../screens/AccountGroup/RegisterPhone";

const Stack = createStackNavigator();

const IdentifyStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="identify" headerMode="none">
      <Stack.Screen name="identify" component={UserGuest} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="loginGroup" component={LoginGroup} />
      <Stack.Screen name="registerGroup" component={RegisterGroup} />
      <Stack.Screen name="accountGroup" component={AccountGroup} />
      {/* <Stack.Screen name="num" component={RegisterPhone} /> */}
    </Stack.Navigator>
  );
};

export default IdentifyStack;
