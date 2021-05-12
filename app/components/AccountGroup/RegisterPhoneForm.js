// import React, { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { Input, Icon, Button } from "react-native-elements";
// import Loading from "../Loading";
// import { size, isEmpty } from "lodash";
// import * as firebase from "firebase";
// import { useNavigation } from "@react-navigation/native";

// export default function RegisterPhoneForm(props) {
//   const { toastRef } = props;
//   const [numberUser, setNumberUser] = useState("");
//   const [formData, setFormData] = useState(defaultFormValue());
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation();

//   const onSubmit = () => {
//     if (isEmpty(formData.num)) {
//       toastRef.current.show("Todos los campos son obligatorios");
//     } else {
//       setLoading(true);
//       firebase
//         .auth()
//         .signInWithPhoneNumber("+52" + formData)
//         .then((confirmationResult) => {
//           setLoading(false);
//           navigation.navigate("accountGroup");
//         })
//         .catch(() => {
//           setLoading(false);
//           toastRef.current.show(
//             "El número de telefono ya esta en uso, intente con otro"
//           );
//         });
//     }
//   };

//   const onChange = (e) => {
//     // setFormData({ ...formData, [type]: e.nativeEvent.text });
//     setNumberUser(e);
//   };
//   return (
//     <View style={styles.formContainer}>
//       <Text style={styles.txtRegistrar}>
//         Inicia sesión con tu número de telefono
//       </Text>
//       <Input
//         placeholder="Numero de telefono"
//         containerStyle={styles.inputForm}
//         onChange={(e) => onChange(e)}
//         rightIcon={
//           <Icon
//             type="material-community"
//             name="cellphone"
//             iconStyle={styles.iconRight}
//           />
//         }
//       />
//       <Button
//         title="Unirse"
//         containerStyle={styles.btnContainRegister}
//         buttonStyle={styles.btnRegister}
//         onPress={onSubmit}
//       />
//       <Loading isVisible={loading} text="Creando cuenta" />
//     </View>
//   );
// }

// function defaultFormValue() {
//   return {
//     num: "",
//   };
// }

// const styles = StyleSheet.create({
//   formContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   inputForm: {
//     width: "100%",
//   },
//   txtRegistrar: {
//     fontWeight: "bold",
//     fontSize: 18,
//     paddingBottom: 10,
//     color: "#6600A1",
//   },
//   btnContainRegister: {
//     marginTop: 20,
//     width: "100%",
//   },
//   btnRegister: {
//     backgroundColor: "#6600A1",
//   },
//   iconRight: {
//     color: "#c1c1c1",
//   },
// });

import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import auth from "firebase";

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber("+52 322-265-2650")}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}
