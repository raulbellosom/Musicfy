import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon, Avatar } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search(props) {
  const { navigation } = props;
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (search) {
      fireSQL
        .query(`SELECT * FROM musicGroup WHERE name LIKE '${search}%'`)
        .then((response) => {
          setGroups(response);
        });
    }
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      setSearch(null);
      setGroups([]);
    }, [])
  );

  return (
    <View>
      <SearchBar
        platform="default"
        lightTheme
        round
        placeholder="Buscar"
        onChangeText={(e) => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {groups.length === 0 ? (
        <NoFound />
      ) : (
        <FlatList
          data={groups}
          renderItem={(group) => (
            <Group group={group} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NoFound() {
  return (
    <View style={styles.noFound}>
      <Image
        source={require("../../../assets/img/no-result-found.png")}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
}

function Group(props) {
  const { group, navigation } = props;
  const { id, name, images, address } = group.item;

  return (
    <ListItem
      onPress={() =>
        navigation.navigate("info", {
          id: id,
          name: name,
        })
      }
    >
      <Avatar
        rounded
        source={
          images[0]
            ? { uri: images[0] }
            : require("../../../assets/img/no-photos.png")
        }
      />
      <ListItem.Content>
        <ListItem.Title>{name}</ListItem.Title>
        <ListItem.Subtitle>{address}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron
        onPress={() =>
          navigation.navigate("info", {
            id: id,
            name: name,
          })
        }
      />
    </ListItem>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
    // backgroundColor: "#fff",
    borderWidth: 0,
  },
  noFound: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
