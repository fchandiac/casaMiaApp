import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { usePathname } from "expo-router";
import { useGlobalContext } from "../../../globalContext";
import FullUserMissionminiCard from "../../../components/missions/FullUserMissionminiCard";




export default function MissionDetail() {
  const { mission } = useGlobalContext();
  const { findOneById } = mission;
  const path = usePathname();
  const missionId = path.split("/").filter(Boolean).pop();
  const [missionData, setMissionData] = useState({
    id: "",
    name: "",
    description: "",
    points: 0,
    clp: 0,
    imageUrl: "",
  });

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const mission = await findOneById(missionId);
        setMissionData({
          id: mission.id,
          name: mission.name,
          description: mission.description,
          points: mission.points,
          clp: mission.clp,
          imageUrl: mission.imageUrl,
        });
      } catch (error) {
        console.error("Error fetching mission:", error);
      }
    };

    fetchMission();
  }, []);

  return (
    <View>
        <FullUserMissionminiCard 
            id={missionData.id}
            name={missionData.name}
            description={missionData.description}
            points={missionData.points}
            clp={missionData.clp}
            imageUrl={missionData.imageUrl}
        />
   
    </View>
  );
}
