import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { CameraView } from "expo-camera";
import Title from "../../components/commons/Title";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Validate() {
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(""); // Guardar el valor escaneado del QR

  // Función para cambiar la dirección de la cámara
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Callback para manejar el escaneo del código QR
  //@ts-ignore
  const handleBarcodeScanned = ({ type, data }) => {
    console.log("Escaneado:", data); // Mostrar el valor escaneado
    // setScanned(true); // Marcar que el código ha sido escaneado
  };

  const handleValidate = () => {
    console.log("Validando misión con el QR:"); // Mostrar el valor al validar
    setScanned(false); // Resetear el estado de escaneo
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title title="Validar misión" />
        <Pressable onPress={() => setScanned(false)}>
          <Ionicons name="refresh-circle" size={35} color="black" />
        </Pressable>
      </View>

      <View
        style={{
          width: "100%",
          height: "50%",
          borderRadius: 10,
          overflow: "hidden",
          marginVertical: 2,
        }}
      >
        <CameraView
          style={{
            width: "100%",
            height: "100%",
          }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"], // Especificar que solo se escaneen códigos QR
          }}
          onBarcodeScanned={(e) => {
            handleBarcodeScanned({type: e.type, data: e.data});
          }} // Desactivar el escaneo una vez escaneado
        />
      </View>

      {scanned && (
        <View>
          <Text>Código QR: </Text> {/* Mostrar el valor del QR escaneado */}
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleValidate}>
        <Text style={styles.buttonText}>Validar misión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: "#1D1D1D",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 15,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
