import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
const defaultImage = require("../../assets/default-image.png");
const logo = require("../../assets/logo.png");

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface UserSideBar {
  picture: string;
  email: string;
  name?: string;
}

export default function UserSideBar({ isOpen, toggleSidebar }: SidebarProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserSideBar>({
    picture: defaultImage,
    email: "",
    name: "",
  });
  const { clearSession, user } = useAuth0();

  useEffect(() => {
    if (user) {
      setUserData({
        picture: user.picture || defaultImage,
        email: user.email || "",
        name: user.name || "",
      });
    }
  }, [user]);

  // Función para manejar el click en los elementos del menú
  const handleNavigation = (route: string) => {
    router.push(route);
    toggleSidebar(); // Cerrar el sidebar al hacer clic en un menú
  };

  const logout = async () => {
    try {
      await clearSession();
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Animated.View
      style={[
        styles.sidebar,
        { transform: [{ translateX: isOpen ? 0 : -410 }] },
      ]}
    >
      <Pressable onPress={() => toggleSidebar()}>
        <View style={styles.sidBarContainer}>
          {/* Usar Image para mostrar la imagen desde la URL */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Image
              source={logo}
              style={{
                width: 160,
                height: 100,
                resizeMode: "contain",
              }}
            />
            <Image
              source={{ uri: userData.picture }}
              style={styles.profileImage}
            />
            <Text style={{ color: "white", fontSize: 16 }}>
              {userData.name}
            </Text>
            <Text style={{ color: "white", fontSize: 16 }}>
              {userData.email}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleNavigation("/userApp")}
          >
            <Ionicons name="home" size={24} color="white" />
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleNavigation("/userApp/missions")}
          >
            <Ionicons name="rocket" size={24} color="white" />
            <Text style={styles.menuItem}>mis Misiones</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleNavigation("/adminApp/products")}
          >
            <Ionicons name="pricetags-sharp" size={24} color="white" />
            <Text style={styles.menuItem}>mis Descuentos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleNavigation("/adminApp/products")}
          >
            <Ionicons name="cart" size={24} color="white" />
            <Text style={styles.menuItem}>Carrito</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handleNavigation("/adminApp/products")}
          >
            <Ionicons name="trophy" size={24} color="white" />
            <Text style={styles.menuItem}>Liga CasaMia</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={() => logout()}>
            <Ionicons name="log-out" size={24} color="white" />
            <Text style={styles.menuItem}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flexDirection: "column", // Cambio a columna para menú vertical
    paddingTop: 0, // Espaciado superior
  },

  sidBarContainer: {
    width: "70%",
    height: "100%",
    backgroundColor: "#1D1D1D",
    paddingTop: 70,
    padding: 20,
  },

  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48, // Hace que la imagen sea redonda
    marginBottom: 20, // Espacio debajo de la imagen
  },

  menuButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 15,
  },

  menuItem: {
    fontSize: 16,
    color: "white",
    marginLeft: 10, // Espacio entre el icono y el texto
  },

  touchableArea: {
    flex: 1, // Ocupa el resto del espacio a la derecha de la barra lateral
  },

  button: {
    backgroundColor: "#ff4c4c", // Color de fondo del botón
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
