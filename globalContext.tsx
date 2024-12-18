import React, { createContext, ReactNode, useContext } from "react";
import useAccount from "./hooks/useAccount";
import useCategories from "./hooks/useCategories";
import useProducts from "./hooks/useProducts";
import usePushNotifications from "./hooks/usePushNotifications";


// Tipo del contexto
type GlobalContextType = {
  account: ReturnType<typeof useAccount>;
  categories: ReturnType<typeof useCategories>;
  products: ReturnType<typeof useProducts>;
  pushNotifications: ReturnType<typeof usePushNotifications>;

};

// Crear el contexto
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Tipo de las props del Provider
type GlobalProviderProps = {
  children: ReactNode;
};

// Crear el Provider
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const account = useAccount();
  const categories = useCategories();
  const products = useProducts();
  const pushNotifications = usePushNotifications();

  return (
    <GlobalContext.Provider value={{ account, categories, products, pushNotifications }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para consumir el contexto de forma segura
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext debe usarse dentro de GlobalProvider");
  }
  return context;
};
