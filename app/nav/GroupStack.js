import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

import Profile from "../screens/Groups/Profile";
import GuestProfile from "../screens/Groups/GuestProfile";
import AddGroup from "../screens/Groups/AddGroup";
import ProfileGroup from "../screens/Groups/ProfileGroup";

const Stack = createStackNavigator();

export default function GroupStack(props) {
  const { navigation } = props;
  return (
    <Stack.Navigator
      initialRouteName="profile"
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
        name="profile"
        component={Profile}
        options={{ title: "Mi perfil" }}
      />
      <Stack.Screen
        name="guest"
        component={GuestProfile}
        options={{ title: "Crear perfil" }}
      />
      <Stack.Screen
        name="add-group"
        component={AddGroup}
        options={{ title: "Añadir Grupo" }}
      />
      <Stack.Screen
        name="profile-group"
        component={ProfileGroup}
        options={{ title: "Mi Perfil" }}
      />
    </Stack.Navigator>
  );
}
