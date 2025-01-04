import { backendUrl } from "../casamia.config";
import { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import { UserAccount } from "./useAccount";
import { useRouter } from "expo-router";

const url = backendUrl;

export default function useWebSocket(account: UserAccount | null) {
    const router = useRouter()
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  // Conectar al WebSocket solo si el correo está disponible
  useEffect(() => {
    if (!account?.email) {
      console.log("No email available, skipping WebSocket connection");
      return; // No realizar la conexión si no hay correo
    }

    const socketInstance = io(url, {
      query: { email: account?.email || "guest" }, // Enviar el email como parámetro de conexión
    });

    // Configurar eventos
    socketInstance.on("connect", () => {
      setConnected(true);
      console.log("Conectado al WebSocket");
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
      console.log("Desconectado del WebSocket");
    });

    // Escuchar el evento `updateAccount` para cambiar el estado
    socketInstance.on("updateAccount", (data: any) => {
      console.log("Cuenta actualizada:", data);
      router.push('/userApp')
    });

    // Guardar la instancia del socket
    setSocket(socketInstance);

    // Desconectar al desmontar el componente
    return () => {
      socketInstance.disconnect();
      setConnected(false);
    };
  }, [account?.email]); // Solo volver a ejecutarse si el correo cambia

  const validateMission = useCallback((clientId) => {
    console.log(clientId)
    if (socket && connected) {
      socket.emit("Validate mission", {
        clientId: clientId, // Usamos el clientId proporcionado dinámicamente
      });
    } else {
      console.log("No se pudo emitir la misión, socket desconectado");
    }
  }, [socket, connected]); 



  return {
    connected,
    messages,
    validateMission,
    socket,
  };
}
