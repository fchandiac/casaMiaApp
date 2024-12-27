import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { useGlobalContext } from "../../../globalContext";
import { useRouter } from "expo-router";
import TextField from "../../../components/commons/Texfield";

// Definir la interfaz Category fuera del componente
interface Category {
  name: string;
  description: string;
}

export default function NewCategory() {
  const { categories } = useGlobalContext();
  const router = useRouter();


  const [categoryData, setCategoryData] = useState<Category>({
    name: "",
    description: "",
  });



  const handleSubmit = async () => {

    const { name, description } = categoryData;
    const saveCategory = await categories.createCategory(name, description);
    console.log(saveCategory);
    router.push("/adminApp/products");
  };

  return (
    <View>
      <Text style={styles.title}>Nueva Categoría</Text>
      <TextField
        label="Nombre"
        value={categoryData.name}
        onChange={(e) => {
          setCategoryData({ ...categoryData, name: e.nativeEvent.text });
        }}
      />
      <TextField
        label="Descripción"
        value={categoryData.description}
        onChange={(e) => {
          console.log(e);
          setCategoryData({ ...categoryData, description: e.nativeEvent.text });
        }}
      />

      <Pressable style={styles.Button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#1D1D1D", // Color de fondo azul
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
