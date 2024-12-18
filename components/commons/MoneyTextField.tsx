// MoneyTextField.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface MoneyTextFieldProps {
  value: number | string; // Valor del campo de texto.
  onChange: (value: number | string) => void;
  label?: string; // Etiqueta opcional.
}

const MoneyTextField: React.FC<MoneyTextFieldProps> = ({ value, onChange, label }) => {
  const [internalValue, setInternalValue] = useState(value);

  // Función para formatear la entrada como moneda CLP usando toLocaleString
  const formatToCLP = (numberString: string): string => {
    const numericValue = Number(numberString.replace(/[^0-9]/g, '')); // Convierte el string a número
    if (isNaN(numericValue)) return ''; // Retorna vacío si el número no es válido
    return numericValue.toLocaleString('es-CL'); // Formatea como moneda CLP
  };

  const handleTextChange = (text: string) => {
    // Elimina caracteres no numéricos y convierte a número entero
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10) || 0;
    // Actualiza el estado interno formateado como CLP
    const formattedValue = formatToCLP(text);
  
    // Llama a la función onChange con el número entero
    onChange(numericValue);
  
    // Opcionalmente, puedes manejar un estado local para el formato visual
    setInternalValue(formattedValue);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={`$${internalValue}`} // Muestra el valor con el símbolo de peso
        onChangeText={handleTextChange}
        keyboardType="numeric" // Activa el teclado numérico
        style={styles.input}
        placeholder="Ingresa un monto"
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#1d1d1d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
  },
});

export default MoneyTextField;
