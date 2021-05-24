import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { map, size, filter } from "lodash";

import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import { validateNumberPhone } from "../../utils/validations";

import { firebaseApp } from "../../utils/firebase";
import firebase, { firestore } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function ProfileGroup(props) {
  const { groupMusic, navigation } = props;
  const [groupName, setGroupName] = useState(groupMusic.name);
  const [groupAddress, setGroupAddress] = useState(groupMusic.address);
  const [groupDescription, setGroupDescription] = useState(
    groupMusic.description
  );
  const [groupNumber, setGroupNumber] = useState(groupMusic.numberPhone);
  const [edith, setEdith] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toastRef = useRef();

  const updateGroup = async () => {
    if (!groupName || !groupAddress || !groupDescription || !groupNumber) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateNumberPhone(groupNumber)) {
      toastRef.current.show(
        "Ingrese un numero de telefono valido a 10 digitos"
      );
    }
    // else if (size(imageSelected) === 0) {
    //   toastRef.current.show("Debes subir al menos una foto.");
    // }
    else {
      setIsLoading(true);
      await db
        .collection("musicGroup")
        .doc(groupMusic.id)
        .update({
          name: groupName,
          address: groupAddress,
          numberPhone: groupNumber,
          description: groupDescription,
        })
        .then(() => {
          navigation.navigate("profile");
          setIsLoading(false);
          setEdith(false);
        })
        .catch((e) => {
          setIsLoading(false);
          setEdith(false);
          toastRef.current.show(
            "Error al intentar actualizar la información, intentelos más tarde."
          );
        });
    }
  };

  return (
    <ScrollView vertical style={styles.viewBody}>
      <Carousel
        arrayImages={groupMusic.images}
        height={350}
        width={screenWidth}
      />
      <FormData
        groupMusic={groupMusic}
        edith={edith}
        setGroupName={setGroupName}
        setGroupAddress={setGroupAddress}
        setGroupDescription={setGroupDescription}
        setGroupNumber={setGroupNumber}
      />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Button
          title={edith ? "Cancelar" : "Editar Perfil"}
          containerStyle={styles.btnContainer}
          buttonStyle={
            edith ? { backgroundColor: "red" } : { backgroundColor: "#6600A1" }
          }
          onPress={() => setEdith(!edith)}
        />
        {edith && (
          <Button
            title="Guardar cambios"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnStyles}
            onPress={() => updateGroup()}
          />
        )}
      </View>
      <Loading isVisible={isLoading} text="Guardando cambios" />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function FormData(props) {
  const {
    groupMusic,
    edith,
    setGroupName,
    setGroupAddress,
    setGroupDescription,
    setGroupNumber,
  } = props;
  return (
    <View style={styles.FormContainer}>
      <Text style={styles.textInput}>Nombre del Grupo Musical</Text>
      <Input
        containerStyle={styles.inputForm}
        style={edith ? styles.active : styles.innactive}
        placeholder={groupMusic.name}
        defaultValue={groupMusic.name}
        editable={edith}
        rightIcon={
          <Icon
            type="material-community"
            name="pencil-outline"
            iconStyle={edith ? styles.active : styles.innactive}
          />
        }
        onChange={(e) => setGroupName(e.nativeEvent.text)}
      />
      <Text style={styles.textInput}>Dirección del Grupo Musical</Text>
      <Input
        containerStyle={styles.inputForm}
        style={edith ? styles.active : styles.innactive}
        placeholder={groupMusic.address}
        defaultValue={groupMusic.address}
        editable={edith}
        rightIcon={
          <Icon
            type="material-community"
            name="pencil-outline"
            iconStyle={edith ? styles.active : styles.innactive}
          />
        }
        onChange={(e) => setGroupAddress(e.nativeEvent.text)}
      />
      <Text style={styles.textInput}>Número de telefono del Grupo Musical</Text>
      <Input
        containerStyle={styles.inputForm}
        style={edith ? styles.active : styles.innactive}
        placeholder={groupMusic.numberPhone}
        defaultValue={groupMusic.numberPhone}
        keyboardType="phone-pad"
        maxLength={10}
        editable={edith}
        rightIcon={
          <Icon
            type="material-community"
            name="pencil-outline"
            iconStyle={edith ? styles.active : styles.innactive}
          />
        }
        onChange={(e) => setGroupNumber(e.nativeEvent.text)}
      />
      <Text style={styles.textInput}>Descripción del grupo musical</Text>
      <Input
        containerStyle={styles.inputForm}
        style={edith ? styles.active : styles.innactive}
        placeholder={groupMusic.description}
        defaultValue={groupMusic.description}
        multiline={true}
        editable={edith}
        rightIcon={
          <Icon
            type="material-community"
            name="pencil-outline"
            iconStyle={edith ? styles.active : styles.innactive}
          />
        }
        onChange={(e) => setGroupDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  FormContainer: {
    margin: 5,
  },
  textInput: {
    paddingLeft: 10,
    fontWeight: "bold",
    color: "#c1c1c1",
  },
  inputForm: {
    width: "100%",
    // marginTop: 20,
  },
  innactive: {
    color: "#c1c1c1",
  },
  active: {
    color: "#6600A1",
  },
  btnContainer: {
    justifyContent: "center",
    margin: 10,
    width: "45%",
  },
  btnStyles: {
    backgroundColor: "#6600A1",
  },
  btnStylesSave: {
    backgroundColor: "blue",
  },
});
