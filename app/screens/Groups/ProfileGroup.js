import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileGroup(props) {
  const { groupMusic } = props;
  console.log(groupMusic);
  return (
    <View>
      <Text>Perfil del grupo musical</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
