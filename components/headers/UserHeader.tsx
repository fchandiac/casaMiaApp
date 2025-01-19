import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useNotifications from "../../hooks/useNotifications";

interface UserHeaderProps {
  userName?: string;
  points?: number;
  money?: number;
  accountId?: string;
}

export default function UserHeader({
  userName = "TestUser",
  points = 0,
  money = 0,
  accountId = "",
}: UserHeaderProps) {
  const router = useRouter();
  const { getNoReadNotifications } = useNotifications();
  const [notificationsCount, setNotificationsCount] = useState(0); // Cambia este valor para probar

  useEffect(() => {
    const fetchNotifications = async () => {
      const count = await getNoReadNotifications(accountId);
      setNotificationsCount(count.length);
    };

    fetchNotifications();
  }, []);

  return (
    <View style={styles.header}>
      {/* Icono de notificaciones con badge */}
      <View style={styles.iconWrapper}>
        <Pressable onPress={() => router.push("/userApp/notifications")}>
          <Ionicons name="notifications" size={24} color="#fff" />
          {notificationsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationsCount}</Text>
            </View>
          )}
        </Pressable>
      </View>

   

      {/* Información del usuario */}
      <View style={styles.userInfo}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.userText}>{"@" + userName}</Text>
        <Text style={styles.infoText}>
          Pts: {points} -{" "}
          {money.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </Text>
      </View>

      {/* Icono de perfil */}
      <View style={styles.iconWrapper}>
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
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -15,
    right: -15,
    backgroundColor: "white",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  logo: {
    width: 100, // Ajustar el ancho según sea necesario
    height: 30, // Ajustar la altura según sea necesario
    resizeMode: "contain",
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
