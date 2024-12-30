import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
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
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const userAccount = await findAccountByEmail(user.email);
        const missions = await getUserMissions(userAccount.id);
        setMissionsList(missions);
        setIsLoading(false); // Datos cargados, desactivar el loading
      } catch (error) {
        console.error("Error fetching missions:", error);
        setIsLoading(false); // Si hay un error, también desactivar el loading
      }
    };

    fetchMissions();
  }, [user]);

  return (
    <View>
      <Title title="Misiones" />

      {/* Si los datos aún se están cargando, mostrar un indicador de carga */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 50 }}
        />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
      )}
    </View>
  );
}
