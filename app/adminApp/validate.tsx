import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGlobalContext } from "../../globalContext";
import { CameraView } from "expo-camera"; // Importar CameraView desde expo-camera

export default function validate() {
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState("");

  // Función para cambiar la dirección de la cámara
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Callback para manejar el escaneo del código QR
  //@ts-ignore
  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrCode(data); // Guardar el código QR escaneado
  };

  const handleValidate = () => {
    setScanned(false);
  };

  return (
    <View>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"], // Especificar que solo se escaneen códigos QR
          }}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} // Desactivar el escaneo una vez escaneado
        />
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Cambiar cámara</Text>
        </TouchableOpacity>
      </View>

      {scanned && (
        <View style={styles.resultContainer}>
          <Text style={styles.message}>
            Código QR:
            <br />
            {qrCode}
          </Text>
          <TouchableOpacity
            onPress={() => setScanned(false)}
            style={styles.button}
          >
            <Text style={styles.text}>Escanear de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleValidate()}
            style={styles.button}
          >
            <Text style={styles.text}>Validar missión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  cameraContainer: {
    width: "100%", // Ajustar el tamaño del contenedor de la cámara
    height: 400, // Ajustar la altura de la cámara
    borderRadius: 20,
    overflow: "hidden", // Asegura que los bordes redondeados se apliquen correctamente
  },
  camera: {
    borderRadius: 20,
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    position: "absolute", // Poner los controles por encima de la cámara
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end", // Colocar los controles en la parte inferior
    padding: 20,
  },
  resultContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    flexDirection: "row", // Icono y texto en la misma línea
    alignItems: "center", // Alinea verticalmente
    justifyContent: "center", // Centra contenido horizontalmente
    backgroundColor: "#1D1D1D", // Color de fondo del botón
    paddingVertical: 8, // Espaciado vertical reducido
    paddingHorizontal: 16, // Espaciado horizontal reducido
    borderRadius: 30, // Bordes redondeados
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
