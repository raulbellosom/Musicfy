import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login";
import Register from "../screens/Account/Register";
import UserLogged from "../screens/Account/UserLogged";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="logged">
      <Stack.Screen
        name="logged"
        component={UserLogged}
        options={{ title: "Mi Cuenta" }}
      />
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "Identificate" }}
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
