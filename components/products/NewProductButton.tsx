import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface NewProductButtonProps {
  onPress: () => void;
}

export default function NewProductButton({ onPress }: NewProductButtonProps) {
  return (
    <Pressable style={styles.menuButton} onPress={onPress}>
      <Text style={styles.buttonText}>Nuevo Producto</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1D1D1D', // Color de fondo azul
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
