// useProducts.tsx
import { backendUrl } from "../casamia.config";
import { useState } from 'react';
import { Category } from './useCategories';

export interface Product {
    id: string,
    name: string, 
    description: string; 
    price: number,
    imageUrl: string,
    category?: Category;
}

export default function useProducts() {
    const [loading, setLoading] = useState<boolean>(true);

    // Obtener todos los productos
    const getProducts = async () => {
        const response = await fetch(backendUrl + "cart/findAllProducts");
        const data = await response.json();
        setLoading(false);
        return data;
    };

    // Crear un nuevo producto
    const createProduct = async (name: string, description: string, price: number, categoryId?: string) => {
        const url = backendUrl + "cart/createProduct";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description, price, categoryId }),
        });

        const data = await response.json();
        return data;
    };

    return {
        getProducts,
        createProduct,
        loading,
    };
}
