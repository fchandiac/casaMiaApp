//Texfield.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';

interface TextFieldProps extends TextInputProps {
  value: string;
  onChange: (e) => void;
  label?: string; // Opcional, por si quieres agregar un label.
}

const TextField: React.FC<TextFieldProps> = ({ value, onChange, label, style, ...rest }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={(text) => onChange({ nativeEvent: { text } })}
        style={[styles.input, style]}
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
    height: 50,
    borderColor: '#1d1d1d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default TextField;
