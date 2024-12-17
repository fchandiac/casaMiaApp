import React, { createContext, ReactNode, useContext } from "react";
import useAccount from "./hooks/useAccount";


// Tipo del contexto
type GlobalContextType = {
  account: ReturnType<typeof useAccount>;

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

  return (
    <GlobalContext.Provider value={{ account }}>
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
