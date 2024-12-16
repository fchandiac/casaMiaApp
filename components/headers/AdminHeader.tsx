import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const logo = require('../../assets/logo.png');

interface AdminHeaderProps {
  userName: string;
  accountId: string;
}

export default function AdminHeader({
  userName = 'TestUserAdmin',
  accountId = '123456',
}: AdminHeaderProps) {
  return (
    <View style={styles.header}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.accountId}>ID: {accountId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40, // Espaciado superior
    width: '100%',
    backgroundColor: '#1D1D1D',
    flexDirection: 'row', // Para colocar los elementos en fila
    alignItems: 'center', // Centrar verticalmente
    paddingHorizontal: 20, // Espaciado horizontal
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // Ajusta la imagen sin distorsionarla
    marginRight: 16, // Espaciado entre el logo y la información
  },
  infoContainer: {
    flex: 1, // Ocupa el espacio restante
    alignItems: 'flex-end'
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4, // Espaciado entre el nombre y el ID
  },
  accountId: {
    color: '#888', // Color gris claro para diferenciar
    fontSize: 14,
  },
});
