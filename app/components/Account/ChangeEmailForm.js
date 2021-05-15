import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props) {
  const { email, setShowModal, toastRef, setReloadUserInfo } = props;
  const [formData, setFormData] = useState(defaulValue());
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSumit = () => {
    setErrors({});
    if (!formData.email || email === formData.email) {
      setErrors({
        email: "El email no ha cambiado",
      });
    } else if (!validateEmail(formData.email)) {
      setErrors({
        email: "Email incorrecto",
      });
    } else if (!formData.password) {
      setErrors({
        password: "La conteseña no puede estar vacia",
      });
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setIsLoading(false);
              setReloadUserInfo(true);
              toastRef.current.show("Email actualizado correctamente");
              setShowModal(false);
            })
            .catch(() => {
              setErrors({ email: "Error al actualizar el email" });
              setIsLoading(false);
            });
        })
        .catch(() => {
          setIsLoading(false);
          setErrors({ password: "La contraseña no es correcta" });
        });
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.text}>Cambiar correo electronico</Text>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        defaultValue={email}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errors.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSumit}
        loading={isLoading}
      />
    </View>
  );
}

function defaulValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    alignSelf: "flex-start",
    color: "#c2c2c2",
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#6600A1",
  },
});
