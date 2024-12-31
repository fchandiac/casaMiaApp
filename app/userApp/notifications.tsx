import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, ScrollView } from "react-native";

export default function Notifications() {
  const [screenSize, setScreenSize] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  // Escucha los cambios en el tamaño de la pantalla
  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenSize({
        width: window.width,
        height: window.height,
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerContainer}>
        {/* Repetir la información de las notificaciones */}
        {Array(20) // Ajusta la cantidad de elementos aquí si es necesario
          .fill(null)
          .map((_, index) => (
            <View key={index} style={styles.notificationContainer}>
              <Text style={styles.title}>Notification {index + 1}</Text>
              <Text style={styles.text}>Ancho: {screenSize.width.toFixed(0)} px</Text>
              <Text style={styles.text}>Alto: {screenSize.height.toFixed(0)} px</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, // Asegura que el contenido ocupe el espacio disponible
    paddingBottom: 20, // Agrega espacio al final del contenido
    paddingHorizontal: 20, // Agrega espacio horizontal
    backgroundColor: "#f0f0f0",
  },
  innerContainer: {
    alignItems: "center", // Centra horizontalmente el contenido
  },
  notificationContainer: {
    marginBottom: 20, // Espacio entre cada notificación
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "black",
    marginVertical: 5,
  },
});
