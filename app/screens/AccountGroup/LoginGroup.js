import React, { useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Divider, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginFormGroup from "../../components/AccountGroup/LoginFormGroup";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>¡Que no pare la musica!</Text>
        <Text style={styles.textHeader2}>El publico te esta esperando</Text>
      </View>
      <View style={styles.footer}>
        <LoginFormGroup toastRef={toastRef} />

        <Divider style={styles.divider} />
        <Text
          style={{
            color: "#6600A1",
            fontWeight: "900",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Inicia sesión con tu cuenta de Facebook
        </Text>
        <LoginFacebook />
        <CreateAccount />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no te has registrado?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("registerGroup")}
      >
        Registrarse aqui
      </Text>
    </Text>
  );
}

function LoginFacebook() {
  return (
    <Button
      title={"Sing In with Facebook"}
      buttonStyle={styles.btnFacebook}
      icon={{
        type: "material-community",
        name: "facebook",
        color: "#fff",
      }}
      onPress={() => console.log("loginFacebook")}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#451776",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textHeader2: {
    color: "#fff",
    fontSize: 20,
  },
  logo: {
    width: "100%",
    height: 200,
  },
  textRegister: {
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 40,
    color: "#6600A1",
  },
  btnRegister: {
    color: "#6600A1",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#DC4D4D",
    margin: 40,
  },
  btnFacebook: {
    backgroundColor: "#3b5998",
    height: 50,
    width: "100%",
    alignSelf: "center",
  },
});
