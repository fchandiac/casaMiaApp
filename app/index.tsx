import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
const logo = require('../assets/logo.png')

export default function Index() {
  const dotOpacity = useRef([...Array(5)].map(() => new Animated.Value(0))).current;

  // Función para iniciar la animación de los puntos
  const startAnimation = () => {
    const animations = dotOpacity.map((opacity, index) =>
      Animated.sequence([
        Animated.delay(index * 200), // Retraso para cada punto
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.loop(Animated.stagger(200, animations)).start(); // Animar en bucle
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={logo}
         style={{
          height: 200,
          width:200,
          marginBottom: 20,
          resizeMode: 'contain'
         }}

         />
        <View style={styles.dotsContainer}>
          {dotOpacity.map((opacity, index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { opacity: opacity }, // Aplicar la animación de opacidad
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Esto asegura que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#1d1d1d',
    justifyContent: 'center', // Asegura que todo esté centrado verticalmente
    alignItems: 'center', // Asegura que todo esté centrado horizontalmente
  },
  innerContainer: {
    //@ts-ignore
    height:'100vh',
    justifyContent: 'center', // Centra el logo y los puntos verticalmente
    alignItems: 'center', // Centra el logo y los puntos horizontalmente
    flexDirection: 'column', // Asegura que el logo y los puntos estén en una columna
  },
  logo: {
    width: 200, // Aumentamos el tamaño del logo
    height: 200, // Aumentamos el tamaño del logo
    marginBottom: 30, // Aumentamos el espacio entre el logo y los puntos
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 20, // Aumentamos el tamaño de los puntos
    height: 20, // Aumentamos el tamaño de los puntos
    borderRadius: 10, // Hace que el punto sea circular
    backgroundColor: '#fff',
    marginHorizontal: 10, // Aumentamos el espacio entre los puntos
  },
});
