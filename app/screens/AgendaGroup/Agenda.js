import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AddEvenet from "../../components/Agenda/AddEvenet";

export default function Agenda(props) {
  const { navigation } = props;
  return (
    <View>
      <AddEvenet navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
