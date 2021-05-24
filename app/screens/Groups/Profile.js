import React, { useState, useCallback } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { isEmpty } from "lodash";

import firebase from "firebase/app";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";

import GuestProfile from "./GuestProfile";
import ProfileGrupo from "./ProfileGroup";
import Loading from "../../components/Loading";

const db = firebase.firestore(firebaseApp);

export default function Profile(props) {
  const { navigation } = props;
  const [groupMusic, setGroupMusic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const resultGroup = [];

      db.collection("musicGroup")
        .where("idUser", "==", firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            const group = doc.data();
            group.id = doc.id;
            resultGroup.push(group);
          });
          if (isEmpty(resultGroup)) {
            setGroupMusic(false);
          } else {
            setGroupMusic(...resultGroup);
          }
        });
    }, [])
  );

  function Activity() {
    return (
      <View style={styles.LoaderGroups}>
        <ActivityIndicator size="large" color="#6600A1" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  function TypeScren() {
    if (groupMusic) {
      return (
        groupMusic && (
          <ProfileGrupo groupMusic={groupMusic} navigation={navigation} />
        )
      );
    } else if (groupMusic === false) {
      return <GuestProfile />;
    } else {
      return <Activity />;
    }
    // return groupMusic ? (
    //   groupMusic && <ProfileGrupo groupMusic={groupMusic} />
    // ) : (
    //   <GuestProfile />
    // );
  }
  return <TypeScren />;
}

const styles = StyleSheet.create({
  LoaderGroups: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});
