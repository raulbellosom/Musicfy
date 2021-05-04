import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as firebase from "firebase";

export default function AccountGroup() {
  return (
    <View>
      <Text>Banda Loggeada</Text>
      <Button title="Cerrar sesión" onPress={() => firebase.auth().singOut()} />
    </View>
  );
}

const styles = StyleSheet.create({});
