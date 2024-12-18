import React from "react";
import { Pressable, Text, View } from "react-native";
import { useGlobalContext } from "../../../globalContext";

export default function index() {
  const { pushNotifications } = useGlobalContext();
  return (
    <View>
      <Text>Admin missions</Text>
      <Pressable
        onPress={() => {
          console.log("Enviando notificación");
          pushNotifications.sendNotification(
            "Nuevo pedido",
            "Tienes un nuevo pedido pendiente"
          );
        }}
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
      >
        <Text>Enviar notificación</Text>
      </Pressable>
    </View>
  );
}
