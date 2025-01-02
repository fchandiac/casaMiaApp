//useCategories.tsx
import { useState } from "react";
import { backendUrl } from "../casamia.config";

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
