import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackButton() {
  const router = useRouter();
  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={16} color="white" />
        <Text style={styles.text}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    marginTop: 10,
    backgroundColor: "white", // Fondo blanco debajo del botón
    borderRadius: 30, // Igual al del botón
    padding: 3, // Espaciado para que sobresalga
    alignSelf: "center", // Centra el botón si es necesario
  },
  button: {
    flexDirection: "row", // Icono y texto en la misma línea
    alignItems: "center", // Alinea verticalmente
    justifyContent: "center", // Centra contenido horizontalmente
    backgroundColor: "#1D1D1D", // Color de fondo del botón
    paddingVertical: 8, // Espaciado vertical reducido
    paddingHorizontal: 16, // Espaciado horizontal reducido
    borderRadius: 30, // Bordes redondeados
  },
  text: {
    color: "white", // Color del texto
    fontSize: 14, // Tamaño reducido
    fontWeight: "bold",
    marginLeft: 8, // Espaciado entre ícono y texto
  },
});
