import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import UserGuest from "../screens/Account/UserGuest";
import Account from "../screens/Account/Account";

const Stack = createStackNavigator();

const IdentifyStack = ({ navigation }) => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     !user ? setUser(false) : setUser(true);
  //   });
  // }, []);

  return (
    <Stack.Navigator initialRouteName="account" headerMode="none">
      <Stack.Screen name="identify" component={UserGuest} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="account" component={Account} />
    </Stack.Navigator>
  );
};

export default IdentifyStack;
