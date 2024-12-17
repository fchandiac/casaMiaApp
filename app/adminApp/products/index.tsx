import React from 'react'
import { View, Text } from 'react-native'
import NewProductButton from '../../../components/products/NewProductButton'
import ProductMiniCard from '../../../components/products/AdminProductMiniCard'
import NewCategoryButton from '../../../components/products/NewCategoryButton'
import { useRouter } from 'expo-router'

export default function index() {
  const router = useRouter()
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
        <NewProductButton onPress={() => router.push('/adminApp/products/newProduct')} />
        <NewCategoryButton onPress={() => router.push('/adminApp/products/newCategory')} />
      </View>
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />
      <ProductMiniCard />

    </View>
  )
}
