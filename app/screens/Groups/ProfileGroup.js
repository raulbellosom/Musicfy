import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { Input, Icon, Button, Avatar } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { map, size, filter } from "lodash";
import * as ImagePicker from "expo-image-picker";
import uuid from "random-uuid-v4";

import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";
import { validateNumberPhone } from "../../utils/validations";

import { firebaseApp } from "../../utils/firebase";
import firebase, { storage } from "firebase/app";
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
  const [imageSelected, setImageSelected] = useState([]);
  const [newImageSelected, setNewImageSelected] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

  const [edith, setEdith] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  const updateGroup = () => {
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
          .doc(groupMusic.id)
          .update({
            name: groupName,
            address: groupAddress,
            numberPhone: groupNumber,
            description: groupDescription,
            images: response,
          })
          .then(() => {
            removeStorage()
              .then(() => {
                // navigation.navigate("profile");
                navigation.reset({
                  index: 0,
                  routes: [{ name: "profile" }],
                });
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
          })
          .catch((e) => {
            setIsLoading(false);
            setEdith(false);
            toastRef.current.show(
              "Error al intentar actualizar la información, intentelos más tarde."
            );
          });
      });
    }
  };

  const uploadImageStorage = async () => {
    const imageBlob = [...imageSelected];

    await Promise.all(
      map(newImageSelected, async (image) => {
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
              imageSelected.push(photoUrl);
            });
        });
      })
    );

    return imageBlob;
  };

  const removeStorage = async () => {
    await Promise.all(
      map(deleteImages, async (image) => {
        await firebase
          .storage()
          .refFromURL(image)
          .delete()
          .then(() => {
            setDeleteImages([]);
          })
          .catch(() => {
            toastRef.current.show("Error al intentar eliminar las imagenes.");
          });
      })
    );
  };

  const cancelar = () => {
    setEdith(!edith);
    setImageSelected(groupMusic.images);
    setNewImageSelected([]);
    setDeleteImages([]);
    navigation.navigate("profile");
  };

  return (
    <ScrollView vertical style={styles.viewBody}>
      <View
        style={{
          margin: 5,
          borderWidth: 2,
          borderColor: "#6600A1",
          padding: 5,
          backgroundColor: "#6600A1",
        }}
      >
        <Text style={styles.textActivate}>
          Esta cuenta aun no ha sido activada.
        </Text>
        <Button
          icon={
            <Icon
              type="material-community"
              name="check-circle-outline"
              iconStyle={{ color: "white", paddingRight: 10 }}
            />
          }
          title="Activar perfil"
          containerStyle={styles.btnContainerActivate}
        />
      </View>
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
      {edith && (
        <View>
          <Text style={styles.textImages}>Agrega hasta 4 imagenes</Text>
          <UploadImage
            toastRef={toastRef}
            imageSelected={imageSelected}
            setImageSelected={setImageSelected}
            newImageSelected={newImageSelected}
            setNewImageSelected={setNewImageSelected}
            setDeleteImages={setDeleteImages}
            deleteImages={deleteImages}
          />
        </View>
      )}

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
          onPress={() => cancelar()}
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

function UploadImage(props) {
  const {
    toastRef,
    imageSelected,
    setImageSelected,
    newImageSelected,
    setNewImageSelected,
    deleteImages,
  } = props;

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
        setNewImageSelected([...newImageSelected, result.uri]);
      }
    }
  };

  const removeImage = (image) => {
    const accion = () => {
      setImageSelected(filter(imageSelected, (imageUrl) => imageUrl !== image));
      deleteImages.push(image);
    };
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de que quieres eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            accion();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const removeImageUnload = (image) => {
    Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de que quieres eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setNewImageSelected(
              filter(newImageSelected, (imageUrl) => imageUrl !== image)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImages}>
      {size(imageSelected) + size(newImageSelected) < 4 && (
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
      {map(newImageSelected, (imageGroup, index) => (
        <Avatar
          key={index}
          style={styles.miniaturaStyles}
          source={{ uri: imageGroup }}
          onPress={() => removeImageUnload(imageGroup)}
        />
      ))}
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
  viewImages: {
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 20,
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
  textActivate: {
    color: "white",
    fontWeight: "bold",
    margin: 10,
    alignSelf: "center",
  },
  btnContainerActivate: {
    marginRight: 10,
    marginLeft: 10,
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
  textImages: {
    marginLeft: 20,
    color: "gray",
    fontWeight: "bold",
  },
});
