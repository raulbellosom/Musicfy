import React from "react";
import Navigation from "./app/nav/Navigation";
import { firebaseApp } from "./app/utils/firebase";
import IdentifyStack from "./app/nav/IdentifyStack";
// import { LogBox } from "react-native";
// LogBox.ignoreLogs("Setting a time");

export default function App() {
  return <Navigation />;
}
