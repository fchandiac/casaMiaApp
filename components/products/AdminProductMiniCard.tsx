import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

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

  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={[styles.image, styles.imageBorder]}
      >
        <View style={{ backgroundColor: "rgba(0,0,0,0.4)", flex: .3, padding: 10 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {name}
          </Text>
          <Text style={{ color: "white", fontSize: 16 }}>{description}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>${price}</Text>
        </View>
      </ImageBackground>
  
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
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
    // Asegura que el texto esté en la parte inferior
  },
  imageBorder: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },



});