import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../globalContext";
import Select from "../../../components/commons/Select";
import TextField from "../../../components/commons/Texfield";
import MultiRowTextField from "../../../components/commons/MultiRowTextField";
import MoneyTextField from "../../../components/commons/MoneyTextField";
import { useRouter } from "expo-router";

const defaultProduct = {
  name: "",
  price: 0,
  description: "",
  categoryId: "",
};

export default function NewProduct() {
  const router = useRouter();
  const { products, categories } = useGlobalContext();
  const { createProduct } = products;
  const { getCategories } = categories;

  const [categoriesList, setCategoriesList] = useState([]);
  const [productData, setProductData] = useState(defaultProduct);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      const listToSelect = categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }));
      setCategoriesList(listToSelect);
    };
    fetchCategories();
  }, []);

  // Función para validar el producto antes de guardarlo
  const validateProduct = (): boolean => {
    if (!productData.name.trim()) {
      setValidationErrorMessage("El nombre del producto es obligatorio.");
      return false;
    }
    if (!productData.description.trim()) {
      setValidationErrorMessage("La descripción del producto es obligatoria.");
      return false;
    }
    if (productData.price <= 0) {
      setValidationErrorMessage("El precio debe ser mayor a 0.");
      return false;
    }
    if (!productData.categoryId) {
      setValidationErrorMessage("Debes seleccionar una categoría.");
      return false;
    }
    setValidationErrorMessage(""); // Limpia el mensaje de error si todo es válido
    return true;
  };

  const saveProduct = async () => {
    if (validateProduct()) {
      console.log("Producto válido:", productData);
      try {
        const response = await createProduct(
          productData.name,
          productData.description,
          productData.price,
          productData.categoryId
        );
        console.log("Producto guardado:", response);
       
        setProductData(defaultProduct); // Reinicia el formulario
        router.push("/adminApp/products");
      } catch (error) {
        setValidationErrorMessage(
          "No se pudo guardar el producto. Intenta nuevamente."
        );
      }
    }
  };

  return (
    <View>
      <Text style={styles.title}>Nuevo Producto</Text>

      <TextField
        label="Nombre"
        value={productData.name}
        onChange={(e) => {
          setProductData({ ...productData, name: e.nativeEvent.text });
        }}
      />

      <MultiRowTextField
        label="Descripción"
        value={productData.description}
        onChange={(e) => {
          setProductData({ ...productData, description: e.nativeEvent.text });
        }}
        rows={4}
      />

      <MoneyTextField
        label="Precio"
        value={productData.price}
        onChange={(e) => {
          setProductData({ ...productData, price: Number(e) });
        }}
      />

      <Select
        value={productData.categoryId}
        label="Categoría"
        items={categoriesList}
        onChange={(e) => {
          setProductData({ ...productData, categoryId: String(e) });
        }}
      />

      {/* Mensaje de validación */}
      {validationErrorMessage ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{validationErrorMessage}</Text>
        </View>
      ) : null}

      <Pressable style={styles.Button} onPress={saveProduct}>
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
    backgroundColor: "#1D1D1D",
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
  errorBox: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
  },
});
