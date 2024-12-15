import React from 'react'
import { Slot } from 'expo-router'
import { View, Text } from 'react-native'

export default function _Layout() {
  return (
    <>
    <View>
        <Text>Logged in as </Text>
        <Slot />
    </View>
    </>
  )
}
