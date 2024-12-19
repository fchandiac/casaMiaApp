// interface Mission {
//     accountId: string;
//     code: string;
//     id: string;
//     name: string;
//     description: string;
//     points: number;
//     status: string;
//     metaData: JSON;
//     image: string;
// }

interface AdminMission {
  code: string;
  name: string;
  description: string;
  points: number;
  image: string;
}

import React, { useState } from "react";
const backendUrl = "http://192.168.0.110:3001";

interface CreateMission {
  code: string;
  name: string;
  description: string;
  points: number;
  money: number;
  imageUrl: string;
}

export default function useMission() {
  const [loading, setLoading] = useState<boolean>(true);

  const getAdminMissions = async () => {
    const response = await fetch(
      backendUrl + "/missions/findAllMissionsGroupByCode",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    return data;
  };

  const createMission = async (mission: CreateMission) => {
    const response = await fetch(backendUrl + "/missions/createMission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      cache: "no-cache",
      body: JSON.stringify(mission),
    });

    console.log("response", response);
    const data = await response.json();
    return data;
  };

  const getUserMissions = async (accountId: string) => {
    const response = await fetch(
      backendUrl + "/missions/findMissionsByAccountId?accountId=" + accountId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    return data;
  };

  const findOneById = async (id: string) => {
    const response = await fetch(
      backendUrl + "/missions/findOneById?id=" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    const data = await response.json();
    return data;
  };

  return {
    getAdminMissions,
    loading,
    createMission,
    getUserMissions,
    findOneById,
  };
}
