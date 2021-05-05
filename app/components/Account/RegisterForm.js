import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("Ingrese un email valido");
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("Las contraseñas no son iguales");
    } else if (size(formData.password) < 6) {
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          "usr-" + formData.email,
          formData.password
        )
        .then((response) => {
          setLoading(false);
          navigation.navigate("identify");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("El email ya esta en uso, intente con otro");
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.formContainer}>
      <Text style={styles.txtRegistrar}>Registrarse es totalmente gratis</Text>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setshowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </View>
  );
}

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputForm: {
    width: "100%",
    // marginTop: 10,
  },
  txtRegistrar: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 10,
    color: "#6600A1",
  },
  btnContainRegister: {
    marginTop: 20,
    width: "100%",
  },
  btnRegister: {
    backgroundColor: "#6600A1",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
