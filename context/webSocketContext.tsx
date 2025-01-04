import React, { createContext, ReactNode, useContext } from "react";
import useWebSocket from "../hooks/useWebSocket";

// Tipo del contexto
type WebSocketContextType = ReturnType<typeof useWebSocket>;

// Crear el contexto
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// Tipo de las props del Provider
type WebSocketProviderProps = {
  children: ReactNode;
  email: string; // Parámetro requerido para inicializar el WebSocket
};

// Crear el Provider
export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children, email }) => {
  const webSocket = useWebSocket(email);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook para consumir el contexto de forma segura
export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext debe usarse dentro de WebSocketProvider");
  }
  return context;
};
