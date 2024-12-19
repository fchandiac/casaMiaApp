import React, { createContext, ReactNode, useContext } from "react";
import useAccount from "./hooks/useAccount";
import useCategories from "./hooks/useCategories";
import useProducts from "./hooks/useProducts";
import useMission from "./hooks/useMission";



// Tipo del contexto
type GlobalContextType = {
  account: ReturnType<typeof useAccount>;
  categories: ReturnType<typeof useCategories>;
  products: ReturnType<typeof useProducts>;
  mission: ReturnType<typeof useMission>;


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
  const mission = useMission();


  return (
    <GlobalContext.Provider value={{ account, categories, products, mission }}>
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
