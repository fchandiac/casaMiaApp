import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const logo = require('../../assets/logo.png');
const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla

interface AdminHeaderProps {
  userName: string;
  email: string;
}

export default function AdminHeader({
  userName = 'TestUserAdmin',
  email = 'maio@mail.com',
}: AdminHeaderProps) {
  const isSmallScreen = width <= 320; // Verificar si el ancho es igual o menor a 320

  return (
    <View style={[styles.header, isSmallScreen && styles.headerSmall]}>
      <Image source={logo} style={[styles.logo, isSmallScreen && styles.logoSmall]} />
      <View style={[styles.infoContainer, isSmallScreen && styles.infoContainerSmall]}>
        <Text style={[styles.userName, isSmallScreen && styles.userNameSmall]}>{userName}</Text>
        <Text style={[styles.accountId, isSmallScreen && styles.accountIdSmall]}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    width: '100%',
    backgroundColor: '#1D1D1D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerSmall: {
    paddingTop: 20, // Reducir el espaciado superior
    paddingHorizontal: 10, // Reducir el espaciado horizontal
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  logoSmall: {
    width: 60, // Reducir el tamaño del logo
    height: 60,
    marginRight: 8, // Reducir el margen
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  infoContainerSmall: {
    alignItems: 'flex-start', // Cambiar la alineación en pantallas pequeñas
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userNameSmall: {
    fontSize: 14, // Reducir el tamaño del texto
  },
  accountId: {
    color: '#888',
    fontSize: 14,
  },
  accountIdSmall: {
    fontSize: 12, // Reducir el tamaño del texto
  },
});
