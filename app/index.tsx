import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
const logo = require('../assets/logo.png');
import { StatusBar } from 'expo-status-bar';
import { useAuth0 } from 'react-native-auth0';
import { useRouter } from 'expo-router';


export default function Index() {
  const { user, authorize  } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      authorize();
    } else {
      console.log('user', user);
      router.push('/adminApp');

    }
  }, [user]);


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
      <StatusBar style="light" />
    </View>
  );
}



