import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as firebase from "firebase";

import IdentifyStack from "./IdentifyStack";
import BottomNavUser from "./BottomNavUser";

export default function Navigation() {
  const [login, setLogin] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
      !user ? setLogin(false) : setUserInfo(user);
    });
  }, []);

  return (
    <NavigationContainer>
      {login !== false ? (
        userInfo && <BottomNavUser userInfo={userInfo} />
      ) : (
        <IdentifyStack />
      )}
    </NavigationContainer>
  );
}
