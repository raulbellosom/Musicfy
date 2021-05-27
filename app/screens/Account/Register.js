import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { Divider, Button, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  const toastRef = useRef();
  return (
    <ScrollView vertical style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeaderTitle}>Registrate</Text>
        <Text style={styles.textHeaderSub}>
          Crea un perfil para tu grupo musical
        </Text>
      </View>

      <View style={styles.footer}>
        <RegisterForm toastRef={toastRef} />
        <Divider style={styles.divider} />
        {/* <Text
          style={{
            color: "#6600A1",
            fontWeight: "900",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Registrate con tu cuenta de Facebook
        </Text> */}
        {/* <LoginFacebook /> */}
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

// function LoginFacebook() {
//   return (
//     <Button
//       title={"Sing Up with Facebook"}
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
  textHeaderTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textHeaderSub: {
    color: "#fff",
    fontSize: 20,
  },
  viewForm: {
    marginRight: 30,
    marginLeft: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
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
