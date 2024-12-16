// AdminFooter.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AdminFooter() {
  return (
    <View style={styles.footer}>
        <Ionicons name='menu' size={34} color='white' style={styles.icon} />
      <Ionicons name="home" size={24} color="white" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#1D1D1D',
    flexDirection: 'row', // Distribuir los iconos en fila
    justifyContent: 'space-around', // Espacio entre los iconos
    alignItems: 'center', // Alineación vertical de los iconos
    position: 'absolute', // Asegura que el footer esté en la parte inferior
    bottom: 0, // Ubicado en la parte inferior
    paddingBottom: 300, // Espaciado inferior
    paddingHorizontal: 10, // Espaciado horizontal

  },
  icon: {
    padding: 10, // Agregar algo de padding alrededor del icono
  },
});
