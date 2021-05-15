import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import UserLogged from "../screens/Account/UserLogged";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props}>
        <DrawerItem
          label="Cerrar drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
      </DrawerItemList>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Configuraciones"
        component={UserLogged}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function DrawerNavigation(props) {
  return (
    <View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}>
          <DrawerItem
            label="Cerrar drawer"
            onPress={() => props.navigation.closeDrawer()}
          />
        </DrawerItemList>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
