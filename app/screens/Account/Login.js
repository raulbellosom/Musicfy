import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Divider, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../../components/Account/LoginForm";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView vertical style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Inicia sesión</Text>
      </View>
      <View style={styles.footer}>
        <LoginForm toastRef={toastRef} />

        <Divider style={styles.divider} />
        {/* <Text
          style={{
            color: "#6600A1",
            fontWeight: "900",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Inicia sesión con alguna red social
        </Text> */}
        {/* <LoginFacebook /> */}
        <CreateAccount />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={styles.textRegister}>
      ¿Aún no te has registrado?{" "}
      <Text
        style={styles.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Registrarse aqui
      </Text>
    </Text>
  );
}

// function LoginFacebook() {
//   return (
//     <Button
//       title={"Sing In with Facebook"}
//       buttonStyle={styles.btnFacebook}
//       icon={{
//         type: "material-community",
//         name: "facebook",
//         color: "#fff",
//       }}
//       onPress={() => console.log("loginFacebook")}
//     />
//   );
// }

const { height } = Dimensions.get("screen");

const headerPadding = height * 0.1;
const footerPadding = height * 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#451776",
  },
  header: {
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: headerPadding,
  },
  footer: {
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: footerPadding,
    marginBottom: 0,
  },
  textHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textRegister: {
    alignSelf: "center",
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
