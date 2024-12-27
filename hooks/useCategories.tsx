//useCategories.tsx
import { useState } from "react";
const backendUrl = "http://192.168.0.110:3001/";

export interface Category {
  id: string;
  name: string;
  description: string;
}

export default function useCategories() {
  const [loading, setLoading] = useState<boolean>(true);

  const getCategories = async () => {
    const response = await fetch(backendUrl + "cart/findAllCategories");
    const data = await response.json();
    setLoading(false);
    return data;
  };

  //createCategory

  const createCategory = async (name: string, description: string) => {
    const url = backendUrl + "cart/createCategory";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    const data = await response.json();
    return data;
  };

  return {
    getCategories,
    loading,
    createCategory,
  };
}
