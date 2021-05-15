import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import firebase from "firebase/app";
import { firebaseApp } from "../../utils/firebase";
import "firebase/firestore";

import GuestProfile from "./GuestProfile";
import ProfileGrupo from "./ProfileGroup";
import { isEmpty } from "lodash";

const db = firebase.firestore(firebaseApp);

export default function Profile() {
  const [groupMusic, setGroupMusic] = useState(false);
  const [exist, setExist] = useState(false);

  useFocusEffect(
    useCallback(() => {
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
            setGroupMusic(resultGroup);
          }
        });
    }, [])
  );
  return groupMusic ? (
    groupMusic && <ProfileGrupo groupMusic={groupMusic} />
  ) : (
    <GuestProfile />
  );
}
