import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import NotificationButton from "./NotificationButton";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface UserHeaderProps {
  userName?: string;
  points?: number;
  money?: number;
}

export default function UserHeader({
  userName = "TestUser",
  points = 0,
  money = 0,
}: UserHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "white",
          borderRadius: 50,
          padding: 5,
          borderWidth: 2,
        }}
      >
        <Pressable onPress={() => router.push("/userApp/notifications")}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 100, // Adjust width as needed
            height: 30, // Adjust height as needed
            resizeMode: "contain",
          }}
        />
        <Text style={styles.userText}>{"@" + userName}</Text>
        <Text style={styles.infoText}>
          Pts: {points} -{" "}
          {money.toLocaleString("es-CL0", {
            style: "currency",
            currency: "CLP",
          })}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "white",
          borderRadius: 50,
          padding: 5,
          borderWidth: 2,
        }}
      >
        <Pressable onPress={() => router.push("/userApp/profile")}>
          <Ionicons name="person" size={24} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingHorizontal: 40,
    flexDirection: "row",
    backgroundColor: "#1D1D1D",
    justifyContent: "space-between",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  userText: {
    color: "#fff",
    fontSize: 23,
  },
  infoText: {
    color: "#fff",
    fontSize: 15,
  },
});
