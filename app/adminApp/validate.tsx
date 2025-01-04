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
import { useGlobalContext } from "../../globalContext";

export default function Validate() {
  const { webSocket, mission } = useGlobalContext();
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(""); // Guardar el valor escaneado del QR
  const [clientId, setClientId] = useState(null)
  const [missionId, setMissionId] = useState('')

  // Función para cambiar la dirección de la cámara
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };




  const handleBarcodeScanned = ({ type, data }) => {
    try {
      // Convertir la cadena escaneada en un objeto JSON
      const qrInfo = JSON.parse(data);

      // Mostrar el contenido del JSON
      console.log("Escaneado:", qrInfo);
      console.log("Mission ID:", qrInfo.missionId);
      console.log("Client ID:", qrInfo.clientId);

      // Guardar el valor escaneado
      setQrData(data);
      setClientId(qrInfo.clientId)
      setMissionId(qrInfo.missionId)
    } catch (error) {
      console.error("Error al analizar el código QR:", error);
      console.log("Tipo:", type); // Mostrar el tipo de código escaneado
    }

    // Marcar que el código ha sido escaneado
    setScanned(true);
  };

  const handleValidate = async () => {
    console.log("Validando misión...");
    const validate = await mission.validateMission(missionId)

    if (!validate) {
      console.log("Error al validar la misión");
      return;
    } 
    webSocket.validateMission(clientId); // Enviar la validación al servidor WebSocket
    setScanned(false); // Resetear el estado de escaneo
  };

  return (
    <View style={{ height: 500 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
 
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
    height: 200, // Tamaño fijo
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 2,
  }}
>
  <CameraView
    style={{
      width: "100%",
      height: "100%", // Asegurar que ocupe todo el contenedor
    }}
    barcodeScannerSettings={{
      barcodeTypes: ["qr"], // Especificar que solo se escaneen códigos QR
    }}
    onBarcodeScanned={(e) => {
      handleBarcodeScanned({ type: e.type, data: e.data });
    }}
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
