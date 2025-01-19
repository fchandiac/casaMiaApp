import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NotificationCardProps {
  id: string;
  type: number; // 1: misión, 2: moneyTransaction, 3: pointsTransaction
  message: string;
  status: number;
  createdAt: string;
}

export default function NotificationCard({
  type,
  message,
  status,
  createdAt,
}: NotificationCardProps) {
  // Determinar ícono y color basados en el tipo
  const getTypeDetails = () => {
    switch (type) {
      case 1:
        return { icon: "flag", color: "#4CAF50", label: "Misión" }; // Misión
      case 2:
        return { icon: "cash", color: "#FFC107", label: "Transacción de Dinero" }; // Transacción de dinero
      case 3:
        return { icon: "star", color: "#2196F3", label: "Transacción de Puntos" }; // Transacción de puntos
      default:
        return { icon: "notifications", color: "#9E9E9E", label: "General" }; // Default
    }
  };

  const { icon, color, label } = getTypeDetails();

  return (
    <View style={styles.card}>
      {/* Ícono */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
         <Ionicons name="notifications" size={24} color="#fff" />
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.timestamp}>{new Date(createdAt).toLocaleString()}</Text>
      </View>

      {/* Estado */}
      {status === 0 && <View style={styles.unreadIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    overflow: "hidden",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3D00",
  },
});
