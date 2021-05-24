import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/core";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListGroups from "../../components/Groups/ListGroups";

const db = firebase.firestore(firebaseApp);

export default function Music() {
  const [groups, setGroups] = useState([]);
  const [totalGroups, setTotalGroups] = useState(0);
  const [startGroups, setStartGroups] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitGroups = 10;

  useFocusEffect(
    useCallback(() => {
      db.collection("musicGroup")
        .get()
        .then((snap) => {
          setTotalGroups(snap.size);
        });

      const resultGroups = [];

      db.collection("musicGroup")
        .orderBy("createAt", "desc")
        .limit(limitGroups)
        .get()
        .then((response) => {
          setStartGroups(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const groups = doc.data();
            groups.id = doc.id;
            resultGroups.push(groups);
          });
          setGroups(resultGroups);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultGroups = [];
    groups.length < totalGroups && setIsLoading(true);

    db.collection("musicGroup")
      .orderBy("createAt", "desc")
      .startAfter(startGroups.data().createAt)
      .limit(limitGroups)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartGroups(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }
        response.forEach((doc) => {
          const group = doc.data();
          group.id = doc.id;
          resultGroups.push(group);
        });
        setGroups([...groups, ...resultGroups]);
      });
  };

  return (
    <View>
      <ListGroups
        groups={groups}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
