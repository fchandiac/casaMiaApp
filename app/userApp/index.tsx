import React from 'react'
import { View, Text } from 'react-native'
import TextField from '../../components/commons/Texfield'

export default function Index() {
  return (
    <View>
        <Text>UserApp</Text>
        <TextField value="value" onChange={(e) => console.log(e)} label="label" />
    </View>
  )
}
