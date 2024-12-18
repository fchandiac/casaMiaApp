import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import NewProductButton from "../../../components/products/NewProductButton";
import ProductMiniCard from "../../../components/products/AdminProductMiniCard";
import NewCategoryButton from "../../../components/products/NewCategoryButton";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../../globalContext";
import { Product } from "../../../hooks/useProducts";

export default function index() {
  const { products } = useGlobalContext();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const router = useRouter();
  const { getProducts } = products;

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProductsList(products);
    };
    fetchProducts();
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <NewProductButton
          onPress={() => router.push("/adminApp/products/newProduct")}
        />
        <NewCategoryButton
          onPress={() => router.push("/adminApp/products/newCategory")}
        />
      </View>

      <ScrollView >
        {productsList.map((product) => (
          <ProductMiniCard
            key={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            category={product.category?.name}
          />
        ))}
      </ScrollView>
    </View>
  );
}
