import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileButton() {
  const router = useRouter();

  return (
    <View style={styles.outerCircle}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        onPress={() => router.push("/userApp/profile")}
      >
        <View style={styles.innerCircle}>
          <Ionicons name="person" size={24} color="#fff" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff", // Fondo blanco del borde
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",

  },
  innerCircle: {
    width: 46,
    height: 46,
    borderRadius: 25,
    backgroundColor: "#1D1D1D", // Color de fondo del círculo interior
    justifyContent: "center",
    alignItems: "center",
  },
});
