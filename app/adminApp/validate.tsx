import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
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
    console.log("Tipo:", type); // Mostrar el tipo de código escaneado
    setQrData(data); // Guardar el valor escaneado
    setScanned(true); // Marcar que el código ha sido escaneado
  };

  const handleValidate = () => {
    console.log("Validando misión con el QR:"); // Mostrar el valor al validar
    setScanned(false); // Resetear el estado de escaneo
  };

  return (
    
    <ScrollView 
    contentContainerStyle={{ flex: 1 }}
    keyboardShouldPersistTaps="handled"
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title title="Validar misión" />
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
              handleBarcodeScanned({ type: e.type, data: e.data });
            }} // Desactivar el escaneo una vez escaneado
          />
        </View>

        {scanned && (
          <View>
            <View
              style={{
                width: "100%",
                borderRadius: 10,
                padding: 10,
                marginVertical: 2,
                alignItems: "center", // Centrar el contenido horizontalmente
                justifyContent: "center", // Centrar el contenido verticalmente
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Código QR:
              </Text>
              <Text style={{ fontSize: 14, color: "#333" }}>{qrData}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleValidate}>
              <Text style={styles.buttonText}>Validar misión</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.buttonText}>Reinciar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
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
