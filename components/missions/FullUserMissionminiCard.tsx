import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

interface MissionCardProps {
  id?: string;
  name?: string;
  description?: string;
  points?: number;
  clp?: number;
  imageUrl?: string;
  clientSocket?: string;
}

export default function FullUserMissionminiCard({
  id = "mission-123",
  name = "Mission Title",
  points = 0,
  clp = 0,
  description = "Mission description",
  imageUrl = "https://www.somoselcafe.com.ar/img/novedades/9.webp",
  clientSocket = "socket",
}: MissionCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  const qrInfo = {
    missionId: id,
    clientId: clientSocket,
  };

  const qrInfoString = JSON.stringify(qrInfo);

  return (
    <View
      style={{
        marginTop: 20,
        justifyContent: "center", // Centra verticalmente
        alignItems: "center", // Centra horizontalmente
        backgroundColor: "white", // Fondo blanco
      }}
    >
      <View style={styles.cardContainer}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={[styles.image, styles.imageBorder]}
          onLoad={() => setIsLoading(false)} // Detecta cuando la imagen ha terminado de cargar
        >
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FF6347" />
            </View>
          )}

          {!isLoading && (
            <>
              <View
                style={{
                  alignItems: "center",
                  marginHorizontal: 20,
                  marginBottom: 50,
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <QRCode value={qrInfoString} size={300} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>

              <View style={styles.rewardsContainer}>
                <Text style={styles.rewardText}>
                  Premio:{" "}
                  {clp.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </Text>
                <Text style={styles.rewardText}>Puntos: {points}</Text>
              </View>
            </>
          )}
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 580,
    width: 350, // Añadido para definir el ancho de la tarjeta
    borderRadius: 15,
    overflow: "hidden", // Mantiene los bordes redondeados
    elevation: 5, // Sombras en Android
    borderColor: "#ccc",
    backgroundColor: "white", // Color de fondo para la tarjeta
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  imageBorder: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio disponible
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)", // Fondo semitransparente
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    height: 100,
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
  },
  rewardsContainer: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
