import React, { createContext, ReactNode, useContext } from "react";
import useAccount from "./hooks/useAccount";
import useCategories from "./hooks/useCategories";
import useProducts from "./hooks/useProducts";
import useMission from "./hooks/useMission";
import useWebSocket from "./hooks/useWebSocket";



// Tipo del contexto
type GlobalContextType = {
  account: ReturnType<typeof useAccount>;
  categories: ReturnType<typeof useCategories>;
  products: ReturnType<typeof useProducts>;
  mission: ReturnType<typeof useMission>;
  webSocket: ReturnType<typeof useWebSocket>;


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

  const userAccount = account.userAccount;
  const webSocket = useWebSocket(userAccount);


  return (
    <GlobalContext.Provider value={{ account, categories, products, mission, webSocket }}>
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
