import React, { useRef } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Divider, Button, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  const toastRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeaderTitle}>Registrate</Text>
        <Text style={styles.textHeaderSub}>Es totalmente gratis</Text>
      </View>

      <View style={styles.footer}>
        <RegisterForm toastRef={toastRef} />
        {/* <Divider style={styles.divider} /> */}
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
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#451776",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    padding: 10,
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
