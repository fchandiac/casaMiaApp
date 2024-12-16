import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
const logo = require('../assets/logo.png');
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';




export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // setTimeout(() => {
    //   router.push('/adminApp');
    // }, 4000);
  }, []);
  
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D1D1D',
      }}
    >
      <View>
        <Image
          source={logo}
          style={{
            height: 200,
            width: 200,
            resizeMode: 'contain',
          }}
        />
      </View>
      <StatusBar style="dark" />
    </View>
  );
}



