import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Calendario from "../Calendario";

export default function AddEvenet(props) {
  const { navigation } = props;

  return (
    <View>
      <Calendario />
    </View>
  );
}

const styles = StyleSheet.create({});
