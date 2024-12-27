import React from "react";
import { TextInput, StyleSheet, TextInputProps, View, Text } from "react-native";

interface NumberFieldProps {
  value: number; // Valor numérico que manejará el componente
  onChange: (value: number) => void; // Callback que recibe un número
  label?: string; // Etiqueta opcional
}

const NumberField: React.FC<NumberFieldProps> = ({
  value,
  onChange,
  label,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={String(value)} // Convertimos el número a string para mostrarlo en el campo de texto
        onChangeText={(text) => {
          // Convertimos el texto a número y lo enviamos al onChange
          const numericValue = parseFloat(text);
          if (!isNaN(numericValue)) {
            onChange(numericValue);
          } else {
            onChange(0); // En caso de error, establecemos 0
          }
        }}
        style={styles.input}
        keyboardType="numeric" // Configuramos el teclado numérico
        {...rest} // Pasamos otras propiedades como placeholder, etc.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#1d1d1d",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default NumberField;
