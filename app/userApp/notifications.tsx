import React, { useState, useEffect } from "react";
import { Text, View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { useGlobalContext } from "../../globalContext";
import useNotifications from "../../hooks/useNotifications";
import NotificationCard from "../../components/notifications/NotificationCard";

export default function Notifications() {
  const { account } = useGlobalContext();
  const { getNotifications } = useNotifications();
  const [screenSize, setScreenSize] = useState({
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  });

  const [notificationsList, setNotificationsList] = useState([]);

  // Escucha los cambios en el tamaño de la pantalla
  useEffect(() => {
    const onChange = ({ window }) => {
      setScreenSize({
        width: window.width,
        height: window.height,
      });
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await getNotifications(account.userAccount.accountId);

        if (notifications.length === 0) {
          console.log("No hay notificaciones");
          return;
        }

        setNotificationsList(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Notificaciones</Text>
        {notificationsList.map((notification, index) => (
          <NotificationCard
            key={index}
            id={notification.id}
            message={notification.message}
            status={notification.status}
            type={notification.type}
            createdAt={notification.createdAt}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, // Asegura que el contenido ocupe el espacio disponible
    paddingBottom: 20, // Agrega espacio al final del contenido
    paddingHorizontal: 20, // Agrega espacio horizontal
  },
  innerContainer: {
    alignItems: "center", // Centra horizontalmente el contenido
   
  },
  notificationContainer: {
    marginBottom: 20, // Espacio entre cada notificación
    width: "100%",
    alignItems: "center",

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "black",
    marginVertical: 5,
  },
});
