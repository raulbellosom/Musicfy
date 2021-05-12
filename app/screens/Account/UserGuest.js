import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();
  return (
    <View style={styles.viewBody}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/img/proMusicNew.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.textLogo}>MusicFy</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.title}>Comienza a sonar en todas partes</Text>
        <Text style={styles.text}>
          Incribe a tu grupo musical con nosotros y ponte en contacto con el
          publico.
        </Text>
        <View style={styles.viewBtn}>
          {/* <Button
            title="Soy un usuario"
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            onPress={() => navigation.navigate("login")}
          /> */}
          <Button
            title="Identificate"
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            onPress={() => navigation.navigate("login")}
          />
        </View>
      </View>
    </View>
  );
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#451776",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  image: {
    height: height_logo,
    width: height_logo,
  },
  textLogo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#6600A1",
  },
  text: {
    color: "grey",
    marginTop: 5,
    marginBottom: 10,
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#6600A1",
  },
  btnContainer: {
    width: "100%",
    margin: 20,
  },
  btnGrupo: {
    backgroundColor: "#fff",
  },
  btnContainerGrupo: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#6600A1",
  },
});
