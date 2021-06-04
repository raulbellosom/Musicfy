import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListGroups(props) {
  const { groups, handleLoadMore, isLoading } = props;
  const navigation = useNavigation();

  return (
    <View>
      {size(groups) > 0 ? (
        <FlatList
          data={groups}
          renderItem={(groups) => (
            <Group group={groups} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderGroups}>
          <ActivityIndicator size="large" color="#6600A1" />
          <Text>Cargando...</Text>
        </View>
      )}
    </View>
  );
}

function Group(props) {
  const { group, navigation } = props;
  const { id, images, name, address, description } = group.item;
  const imageGroup = images[0];

  const goGroup = () => {
    navigation.navigate("info", { id, name });
  };

  return (
    <TouchableOpacity onPress={goGroup}>
      <View style={styles.viewGroup}>
        <View style={styles.viewGroupImage}>
          <Image
            containerStyle={styles.imageGroup}
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#fff" />}
            source={
              imageGroup
                ? { uri: imageGroup }
                : require("../../../assets/img/no-photos.png")
            }
          />
        </View>
        <View>
          <Text style={styles.groupName}>{name}</Text>
          <Text style={styles.groupAddress}>
            {size(address) < 35 ? address : address.substr(0, 35) + "..."}
          </Text>
          <Text style={styles.groupDescription}>
            {size(description) < 100
              ? description
              : description.substr(0, 100) + "..."}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function FooterList(props) {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <View style={styles.loaderGroups}>
        <ActivityIndicator size="large" color="#6600A1" />
      </View>
    );
  } else {
    return (
      <View style={styles.notFoundGroups}>
        <Text style={styles.textNotFound}>No hay más grupos musicales</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderGroups: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  viewGroup: {
    backgroundColor: "#fff",
    flexDirection: "row",
    margin: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  viewGroupImage: {
    marginRight: 15,
    borderRadius: 5,
  },
  imageGroup: {
    width: 125,
    height: 125,
    backgroundColor: "#e3e3e3",
    borderRadius: 5,
  },
  groupName: {
    fontWeight: "bold",
    color: "#6600A1",
    marginTop: 5,
  },
  groupAddress: {
    paddingTop: 2,
    color: "black",
    width: 250,
  },
  groupDescription: {
    paddingTop: 2,
    maxWidth: "80%",
    color: "grey",
  },
  notFoundGroups: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  textNotFound: {
    color: "#c2c2c2",
    fontWeight: "bold",
  },
});
