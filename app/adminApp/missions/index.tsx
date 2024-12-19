import React, {useEffect, useState} from "react";
import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { useGlobalContext } from "../../../globalContext";
import { useRouter } from "expo-router";
import AdminMissionminiCard from "../../../components/missions/AdminMissionminiCard";


export default function index() {
  const { mission } = useGlobalContext();
  const { getAdminMissions } = mission;
  const router = useRouter();
  const [missionsList, setMissionsList] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const missions = await getAdminMissions();
        setMissionsList(missions);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchMissions();
  }, []);


  return (
    <View>
      <Text style={styles.title}>Misiones</Text>
      <Pressable
        style={styles.Button}
        onPress={() => {
          router.push("/adminApp/missions/newMission");
        }}
      >
        <Text style={styles.buttonText}>Nueva Misión</Text>
      
      </Pressable>
      <ScrollView>
        {missionsList.map((mission, index) => (
          <AdminMissionminiCard
            key={index}
            id={mission.id}
            name={mission.name}
            description={mission.description}
            points={mission.points}
            clp={mission.clp}
            imageUrl={mission.imageUrl}
          />
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#1D1D1D",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: "#ffebee",
    borderColor: "#f44336",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
  },
});
