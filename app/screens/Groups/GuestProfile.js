import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function GuestProfile() {
  const navigation = useNavigation();
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        Comienza a crear el perfil de tu grupo musical
      </Text>
      <Text style={styles.subTitle}>
        Da clic en el siguiente botón y comienza a diseñar el perfil de tu grupo
        musical
      </Text>
      <Button
        title="Crear perfil"
        titleStyle={{ color: "#6600A1" }}
        icon={{
          type: "material-community",
          name: "account-multiple-plus-outline",
          color: "#6600A1",
        }}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={() => navigation.navigate("add-group")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#6600A1",
    paddingHorizontal: 20,
  },
  btnContainer: {
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#6600A1",
    width: "90%",
    padding: 10,
    margin: 20,
  },
  btnStyle: {
    backgroundColor: "#fff",
    color: "#6600A1",
  },
  subTitle: {
    paddingHorizontal: 20,
    alignSelf: "center",
    color: "grey",
  },
});
