import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Search from "../../components/Groups/Search";

export default function MusicSearch(props) {
  const { navigation } = props;
  return <Search navigation={navigation} />;
}

const styles = StyleSheet.create({});
