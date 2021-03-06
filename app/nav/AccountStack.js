import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import UserLogged from "../screens/Account/UserLogged";

const Stack = createStackNavigator();

export default function AccountStack(props) {
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
      initialRouteName="account"
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Mi cuenta" }}
      />
      <Stack.Screen
        name="logged"
        component={UserLogged}
        options={{ title: "Mi cuenta" }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Iniciar Sesión" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Registrarse" }}
      />
    </Stack.Navigator>
  );
}
