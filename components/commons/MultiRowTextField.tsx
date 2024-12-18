// MultiRowTextField.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';

interface MultiRowTextFieldProps extends TextInputProps {
  value: string;
  onChange: (e: { nativeEvent: { text: string } }) => void;
  label?: string; // Opcional, por si quieres agregar un label.
  rows?: number; // Número de filas deseadas.
}

const MultiRowTextField: React.FC<MultiRowTextFieldProps> = ({
  value,
  onChange,
  label,
  rows = 3, // Valor predeterminado de 3 filas.
  style,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={(text) => onChange({ nativeEvent: { text } })}
        multiline={true} // Permite escribir en varias líneas.
        numberOfLines={rows} // Define cuántas filas se mostrarán por defecto.
        style={[styles.input, style, { height: rows * 20 + 30 }]} // Ajusta la altura automáticamente.
        {...rest} // Permite pasar otras props como placeholder, keyboardType, etc.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333',
  },
  input: {
    borderColor: '#1d1d1d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top', // Asegura que el texto comience en la parte superior.
  },
});

export default MultiRowTextField;
