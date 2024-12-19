import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Title from "../../components/commons/Title";
import UserMissionminiCard from "../../components/missions/UserMissionminiCard";
import { useAuth0 } from "react-native-auth0";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../globalContext";

export default function Index() {
  const { user } = useAuth0();
  const router = useRouter();
  const { account, mission } = useGlobalContext();
  const { findAccountByEmail } = account;
  const { getUserMissions } = mission;
  const [missionsList, setMissionsList] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const userAccount = await findAccountByEmail(user.email);
        const missions = await getUserMissions(userAccount.id);
        setMissionsList(missions);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  }, [user]);
  return (
    <View>
      <Title title="Misiones" />
      <ScrollView horizontal={true}>
        {missionsList.map((mission, index) => (
          <Pressable
            key={index}
            onPress={() => router.push("/userApp/missions/" + mission.id)}
          >
            <UserMissionminiCard
              key={index}
              id={mission.id}
              name={mission.name}
              description={mission.description}
              points={mission.points}
              clp={mission.clp}
              imageUrl={mission.imageUrl}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
