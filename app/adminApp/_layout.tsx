import React from 'react';
import { Slot } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import AdminHeader from '../../components/headers/AdminHeader';
import AdminFooter from '../../components/footers/AdminFooter';

export default function _Layout() {
  return (
    <View>
      <AdminHeader userName="TestUser" accountId="1563738765sl" />
      <View style={styles.container}>
        <Slot />
       
      </View>
      <AdminFooter />
       

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',

  },
  content: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 300,
  },
});
