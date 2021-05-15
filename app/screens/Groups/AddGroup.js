import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import AddGroupForm from "../../components/Groups/AddGroupForm";

export default function AddGroup(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  return (
    <View>
      <AddGroupForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Creando grupo musical" />
    </View>
  );
}

const styles = StyleSheet.create({});
