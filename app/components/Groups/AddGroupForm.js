import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  Text,
} from "react-native";
import { Icon, Avatar, Input, Button } from "react-native-elements";
import uuid from "random-uuid-v4";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";
import { validateNumberPhone } from "../../utils/validations";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;

export default function AddGroupForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [groupName, setGroupName] = useState("");
  const [groupAddress, setGroupAddress] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);

  const addGroup = () => {
    if (!groupName || !groupAddress || !groupDescription || !groupNumber) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateNumberPhone(groupNumber)) {
      toastRef.current.show(
        "Ingrese un numero de telefono valido a 10 digitos"
      );
    } else if (size(imageSelected) === 0) {
      toastRef.current.show("Debes subir al menos una foto.");
    } else {
      setIsLoading(true);
      uploadImageStorage().then((response) => {
        db.collection("musicGroup")
          .add({
            name: groupName,
            address: groupAddress,
            description: groupDescription,
            numberPhone: groupNumber,
            images: response,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            idUser: firebase.auth().currentUser.uid,
          })
          .then(() => {
            setIsLoading(false);
            navigation.navigate("profile");
          })
          .catch(() => {
            setIsLoading(false);
            toastRef.current.show(
              "Error al crear grupo musical, intentelo mas tarde"
            );
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imageBlob = [];

    await Promise.all(
      map(imageSelected, async (image) => {
        const response = await fetch(image);
        const blob = await response.blob();
        const ref = firebase.storage().ref("musicGroups").child(uuid());
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`musicGroups/${result.metadata.name}`)
            .getDownloadURL()
            .then((photoUrl) => {
              imageBlob.push(photoUrl);
            });
        });
      })
    );

    return imageBlob.reverse();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ImageGroup imagenGroup={imageSelected[0]} />
      <FormAdd
        setGroupName={setGroupName}
        setGroupAddress={setGroupAddress}
        setGroupDescription={setGroupDescription}
        groupNumber={groupNumber}
        setGroupNumber={setGroupNumber}
      />
      <Text style={styles.textImages}>Agrega hasta 4 imagenes</Text>
      <UploadImage
        toastRef={toastRef}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />
      <Button
        title="Crear Grupo Musical"
        buttonStyle={styles.btnAddGroup}
        onPress={addGroup}
      />
    </ScrollView>
  );
}

function ImageGroup(props) {
  const { imagenGroup } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={
          imagenGroup
            ? { uri: imagenGroup }
            : require("../../../assets/img/no-photos.png")
        }
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

function FormAdd(props) {
  const { setGroupName, setGroupAddress, setGroupDescription, setGroupNumber } =
    props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del grupo musical"
        style={styles.input}
        onChange={(e) => setGroupName(e.nativeEvent.text)}
        textContentType="name"
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        onChange={(e) => setGroupAddress(e.nativeEvent.text)}
        textContentType="fullStreetAddress"
      />
      <Input
        placeholder="Número de telefono formato 123 456 7890"
        containerStyle={styles.input}
        onChange={(e) => setGroupNumber(e.nativeEvent.text)}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Input
        placeholder="Descripción del grupo musical "
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setGroupDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImage(props) {
  const { toastRef, imageSelected, setImageSelected } = props;

  const imageSelect = async () => {
    const resultPermissions =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    const resultPermissionsCamera = resultPermissions.status;
    if (resultPermissionsCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes", 2000);
      } else {
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de que quieres eliminar esta imagen?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setImageSelected(
              filter(imageSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImages}>
      {size(imageSelected) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {map(imageSelected, (imageGroup, index) => (
        <Avatar
          key={index}
          style={styles.miniaturaStyles}
          source={{ uri: imageGroup }}
          onPress={() => removeImage(imageGroup)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
    backgroundColor: "#fff",
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddGroup: {
    backgroundColor: "#6600A1",
    margin: 20,
  },
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniaturaStyles: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
    backgroundColor: "#e3e3e3",
  },
  textImages: {
    marginLeft: 20,
    color: "gray",
    fontWeight: "bold",
  },
});
