import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";


interface MissionCardProps {
  id?: string;
  name?: string;
  description?: string;
  points?: number;
  clp?: number;
  imageUrl?: string;
}

export default function FullUserMissionminiCard({
  id = "mission-123",
  name = "Mission Title",
  points = 0,
  clp = 0,
  description = "Mission description",
  imageUrl = "https://www.somoselcafe.com.ar/img/novedades/9.webp",
}: MissionCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={[styles.image, styles.imageBorder]}
        onLoad={() => setIsLoading(false)} // Detecta cuando la imagen ha terminado de cargar
      >
        {isLoading && (
          // Suspense mientras carga
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6347" />
          </View>
        )}

        {!isLoading && (
          <>
             <View style={styles.textContainer}>
       
           
            </View>

            {/* Contenido principal */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            {/* Premios al final */}
            <View style={styles.rewardsContainer}>
              <Text style={styles.rewardText}>Premio: ${clp} CLP</Text>
              <Text style={styles.rewardText}>Puntos: {points}</Text>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 580,
    borderRadius: 15,
    overflow: "hidden", // Mantiene los bordes redondeados
    marginTop: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombras en Android
    borderColor: "#ccc",
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
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo semitransparente
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    height: 100,
    width: '100%',
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

