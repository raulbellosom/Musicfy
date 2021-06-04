import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import { SocialIcon, Divider } from "react-native-elements";

import Loading from "../../components/Loading";
import Carousel from "../../components/Carousel";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function MusicInfo(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [group, setGroup] = useState(null);

  const handleWhatsappPress = () => {
    Linking.openURL("https://wa.me/+52" + group.numberPhone);
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  useEffect(() => {
    db.collection("musicGroup")
      .doc(id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setGroup(data);
      });
  }, []);

  if (!group) {
    return <Loading isVisble={true} text="Cargando..." />;
  }
  return (
    <ScrollView vertical style={styles.viewBody}>
      <Carousel arrayImages={group.images} height={350} width={screenWidth} />
      <TitleGroup
        name={group.name}
        address={group.address}
        description={group.description}
      />
      <Divider style={styles.divider} />
      <Contacto handleWhatsappPress={handleWhatsappPress} group={group} />
      <Divider style={styles.divider} />
      <Social />
    </ScrollView>
  );
}

function Social() {
  return (
    <View>
      <Text style={styles.social}>Redes Sociales</Text>
      {/* <SocialIcon button type="facebook" title="Los Tigres del Norte" />
      <SocialIcon
        button
        type="instagram"
        title="@LosTigresDelNorte"
        // style={{ backgroundColor: "red" }}
      />
      <SocialIcon button type="youtube" title="Los Tigres del Norte" /> */}
      <View style={{ flexDirection: "column" }}>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SocialIcon light type="facebook" />
          <Text>Los Patos Donalds</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SocialIcon light type="instagram" />
          <Text>Los Patos Donalds</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SocialIcon title="Los Patos Donalds" light type="youtube" />
          <Text>Los Patos Donalds</Text>
        </View> */}

        <SocialIcon button title="Los Patos Donalds" light type="facebook" />
        <SocialIcon button title="Los Patos Donalds" light type="instagram" />
        <SocialIcon button title="Los Patos Donalds" light type="youtube" />
      </View>
    </View>
  );
}
function Contacto(props) {
  const { handleWhatsappPress, group } = props;
  return (
    <View>
      <Text style={styles.contacto}>Contactanos via:</Text>
      {/* <SocialIcon button type="facebook" title="Los Tigres del Norte" /> */}
      <SocialIcon
        button
        icon
        type="whatsapp"
        title={group.numberPhone}
        onPress={handleWhatsappPress}
      />
    </View>
  );
}

function TitleGroup(props) {
  const { name, address, description } = props;
  return (
    <View style={styles.viewGroupTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameGroup}>{name}</Text>
        <Text style={styles.addressGroup}>Puntuación</Text>
      </View>
      <Text style={styles.descriptionGroup}>{address}</Text>
      <Text style={styles.descriptionGroup}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewGroupTitle: {
    padding: 15,
  },
  nameGroup: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addressGroup: {
    position: "absolute",
    right: 0,
  },
  descriptionGroup: {
    marginTop: 5,
    color: "grey",
  },
  divider: {
    margin: 10,
    borderColor: "#6600A1",
  },
  social: {
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#3e3e3e",
    marginLeft: 10,
  },
  contacto: {
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#3e3e3e",
    marginLeft: 10,
  },
});
