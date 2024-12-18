import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";

interface AdminProductMiniCardProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
}

export default function AdminProductMiniCard({
  id = "1a2b3c4d-5678-9abc-def0-1234567890ab",
  name = "Product Name",
  description = "Product description",
  price = 0,
  imageUrl = "https://imag.bonviveur.com/pastel-de-angel-angel-food-cake.webp",
  category = "category",
}: AdminProductMiniCardProps) {
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
            {/* Badge de categoría flotante */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{category}</Text>
            </View>

            <View style={{ backgroundColor: "rgba(0,0,0,0.4)", flex: 0.3, padding: 10 }}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                {name}
              </Text>
              <Text style={{ color: "white", fontSize: 16 }}>{description}</Text>
              <Text style={{ color: "white", fontSize: 16 }}>${price}</Text>
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 250,
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
  badgeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF6347", // Color de fondo del badge
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio disponible
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo semitransparente
  },
});
