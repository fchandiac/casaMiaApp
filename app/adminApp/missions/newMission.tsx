import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import TextField from "../../../components/commons/Texfield";
import MultiRowTextField from "../../../components/commons/MultiRowTextField";
import MoneyTextField from "../../../components/commons/MoneyTextField";
import NumberField from "../../../components/commons/NumberField";
import Title from "../../../components/commons/Title";
import { useGlobalContext } from "../../../globalContext";
import { useRouter } from "expo-router";

interface CreateMission {
  code: string;
  name: string;
  description: string;
  points: number;
  money: number;
  imageUrl: string;
}

export default function newMission() {
  const { mission } = useGlobalContext();
  const { createMission } = mission;
  const router = useRouter();
  const [missionData, setMissionData] = useState<CreateMission>({
    code: "",
    name: "",
    description: "",
    points: 0,
    money: 0,
    imageUrl: "https://www.somoselcafe.com.ar/img/novedades/9.webp",
  });

  const saveMission = async () => {

    await createMission(missionData);
  

    router.push("/adminApp/missions");
  };
  return (
    <View>
      <Title title="Nueva Misión Simple" />

      <ScrollView>
        <TextField
          label="Nombre"
          value={missionData.name}
          onChangeText={(text) =>
            setMissionData({ ...missionData, name: text })
          }
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />

        <TextField
          label="Código"
          value={missionData.code}
          onChangeText={(text) =>
            setMissionData({ ...missionData, code: text })
          }
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
        />

        <MultiRowTextField
          label="Descripción"
          value={missionData.description}
          onChangeText={(text) =>
            setMissionData({ ...missionData, description: text })
          }
          onChange={function (e: any): void {
            throw new Error("Function not implemented.");
          }}
          rows={4}
        />

        <MoneyTextField
          label="Clp"
          value={missionData.money}
          onChange={(e) => {
            setMissionData({ ...missionData, money: Number(e) });
          }}
        />

        <NumberField
          label="Puntos"
          value={missionData.points}
          onChange={(e) => {
            setMissionData({ ...missionData, points: e });
          }}
        />
        <Pressable
          style={styles.Button}
          onPress={() => {
            saveMission();
          }}
        >
          <Text style={styles.buttonText}>Crear Misión</Text>
        </Pressable>
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
