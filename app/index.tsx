import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
const logo = require('../assets/logo.png');
import { StatusBar } from 'expo-status-bar';
import { useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../globalContext';

export default function Index() {
  const { authorize, user } = useAuth0();
  const { account } = useGlobalContext();
  const { findAccountByEmail, createAccount } = account;
  const router = useRouter();


  useEffect(() => {
    // Verifica si el usuario está autenticado
    if (user) {
      const fetchUserAccount = async () => {
        try {
          const fetchedAccount = await findAccountByEmail(user.email);
          if (fetchedAccount.message === 'Account not found') {
            console.log('Account not found');
            const newAccount = await createAccount(user.email);
            if (newAccount.message === 'Account already exists') {
              console.log(newAccount);
            }
            router.push('/userApp');
          }
          if (fetchedAccount.role === 0) {
            router.push('/userApp');
          } else if (fetchedAccount.role === 1) {
            router.push('/adminApp');
          }

        } catch (error) {
          console.error("Error fetching user account:", error);
        }
      };

      fetchUserAccount();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Pressable style={styles.button} onPress={() => authorize()}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%', // Tamaño completo de la pantalla
    justifyContent: 'center', // Centra los elementos verticalmente
    alignItems: 'center', // Centra los elementos horizontalmente
    backgroundColor: '#1D1D1D',
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 20, // Espaciado entre el logo y el botón
  },
  button: {
    width: 200, // Tamaño fijo para el botón
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10, // Ajuste de altura del botón
    alignItems: 'center', // Centra el texto horizontalmente dentro del botón
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
