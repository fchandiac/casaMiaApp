import { Slot } from 'expo-router'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import UserHeader from '../../components/headers/UserHeader'
import UserFooter from '../../components/footers/UserFooter'
const logo = require('../../assets/logo.png')

export default function _Layout() {
  return (
    <View>
      <UserHeader />
      <View style={styles.container}>
        <Slot />
      </View>
      <UserFooter />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,


  },

});
