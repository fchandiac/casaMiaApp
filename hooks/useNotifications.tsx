import React, { useState } from "react";
import { backendUrl } from "../casamia.config";

export default function useNotifications() {
    const [loading, setLoading] = useState<boolean>(true);

    const getNotifications = async (accountId: string) => {
        const response = await fetch(backendUrl + "notifications/findAllByAccountId?accountId=" + accountId);
        const data = await response.json();
        return data;
    };

    const updateNotificationStatus = async (id: string, status: number) => {
        const url = backendUrl + "notifications/updateNotificationStatus";
        const data = { id, status };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const res = await response.json();
        return res;
    }

    const getNoReadNotifications = async (accountId: string) => {
        const response = await fetch(backendUrl + "notifications/findAllNoReadByAccountId?accountId=" + accountId);
        const data = await response.json();
        return data;
    }


  
  return {
    getNotifications,
    updateNotificationStatus,
    getNoReadNotifications
  }
}
