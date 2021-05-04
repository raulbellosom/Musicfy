import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as firebase from "firebase";

import IdentifyStack from "./IdentifyStack";
import BottomNavUser from "./BottomNavUser";
import { isEmpty } from "lodash";

export default function Navigation() {
  const [login, setLogin] = useState(null);
  const [typeUser, setTypeUser] = useState(null);
  // console.log(typeUser);

  const user = async () => await firebase.auth().currentUser;
  // console.log(user);
  if (!isEmpty(user) && user !== null) {
    const email = user.email.split("-");
    setTypeUser(email);
    // console.log(email);
  }

  // console.log(email[0]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  return (
    <NavigationContainer>
      {/* {login !== false && generateFunction("usr")} */}

      {login !== false ? <BottomNavUser /> : <IdentifyStack />}
    </NavigationContainer>
  );
}

// function generateFunction(key){
//   switch (key) {
//     case "usr":
//       <BottomNavUser />
//       break;
//     case "gm":
//       <BottomNavGroup />
//       break
//     default:
//       <IdentifyStack />
//       break;
//   }
// }
