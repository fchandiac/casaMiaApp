import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Title from "../../components/commons/Title";
import UserMissionminiCard from "../../components/missions/UserMissionminiCard";
import { useAuth0 } from "react-native-auth0";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../globalContext";

export default function Index() {
  const { user } = useAuth0();
  const router = useRouter();
  const { account, mission } = useGlobalContext();
  const { findAccountByEmail, isProfileComplete } = account;
  const { getUserMissions } = mission;
  const [missionsList, setMissionsList] = useState([]);

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const userAccount = await findAccountByEmail(user.email);
        const missions = await getUserMissions(userAccount.id);

        if (missions.length === 0) {
          console.log("No hay misiones");
          return;
        }

        // Ordenar según la prioridad de status: Pendiente (0), En progreso (1), Completada (2)
        missions.sort((a, b) => {
          // Si el status es igual, no se modifica el orden
          if (a.status === b.status) return 0;

          // Ordenar en el orden deseado (menor a mayor)
          return a.status - b.status;
        });

        setMissionsList(missions);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();

    const checkProfile = async () => {
      const result = await isProfileComplete(user.email);
      setIsComplete(result);
    };

    if (user) {
      checkProfile();
    }
  }, []);
  return (
    <>
      <View>
        <Title title="Misiones" />
        {!isComplete && (
          <View style={styles.alert}>
            <Text style={styles.alertText}>
              ¡Personaliza tu experiencia en CasaMia! Completa tu perfil ahora,
              comienza a ganar puntos, participa en la Liga CasaMia, obtén
              dinero para tus compras y exclusivos cupones. ¡Tu próxima
              recompensa te espera!
            </Text>
            <Pressable
              style={styles.button}
              onPress={() => router.push("/userApp/profile")}
            >
              <Text style={styles.buttonText}>Completar perfil</Text>
            </Pressable>
          </View>
        )}
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
                clp={mission.money}
                imageUrl={mission.imageUrl}
                status={mission.status}
              />
            </Pressable>
          ))}
        </ScrollView>
        <Title title="" />
        <Title title="Liga CasaMia" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    marginBottom: 600,
  },
  title: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginBottom: 20,
  },
  alert: {
    marginHorizontal: 40,
    backgroundColor: "#ffcdd2",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  alertText: {
    color: "black",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
