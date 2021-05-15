import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";

import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const navigation = useNavigation();
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false);
  }, [reloadUserInfo]);

  return (
    <View style={styles.viewInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setLoading={setLoading}
          setLoadingText={setLoadingText}
        />
      )}
      {userInfo && (
        <AccountOptions
          userInfo={userInfo}
          toastRef={toastRef}
          setReloadUserInfo={setReloadUserInfo}
        />
      )}
      {/* <Button
        title="Configuraciones de la cuenta"
        buttonStyle={styles.btnConfig}
        titleStyle={styles.btnConfigText}
        icon={{
          type: "material-community",
          name: "cog-outline",
          color: "#6600A1",
        }}
        onPress={() => {
          console.log("ok");
        }}
      /> */}
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionText}
        icon={{
          type: "material-community",
          name: "logout",
          color: "#6600A1",
        }}
        onPress={() => {
          firebase.auth().signOut();
          navigation.navigate("music", { screen: "music" });
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSesion: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSesionText: {
    color: "#6600A1",
  },
  // btnConfig: {
  //   marginTop: 30,
  //   borderRadius: 0,
  //   backgroundColor: "#fff",
  //   borderTopWidth: 1,
  //   borderTopColor: "#e3e3e3",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#e3e3e3",
  // },
  // btnConfigText: {
  //   color: "#6600A1",
  // },
});
