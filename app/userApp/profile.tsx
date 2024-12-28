import React, { useEffect, useState, useRef } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth0 } from "react-native-auth0";
import { useGlobalContext } from "../../globalContext";
import TextField from "../../components/commons/Texfield";
import Select from "../../components/commons/Select";
import DatePicker from "../../components/commons/DatePicker";

interface Profile {
  userName: string;
  name: string;
  gender: number; // Agrega el tipo de dato para el género
}

export default function Profile() {
  const { user } = useAuth0();
  const { account } = useGlobalContext();
  const { userAccount, findAccountByEmail, isProfileComplete, updateUserName } =
    account;
  const [isComplete, setIsComplete] = useState(false);
  const [userAccountData, setUserAccountData] = useState({
    userName: "",
    name: "",
    gender: null, // Aquí se agrega el estado para el género
  });

  useEffect(() => {
    const checkProfile = async () => {
      const result = await isProfileComplete(user.email);
      setIsComplete(result);
    };
    if (user) {
      findAccountByEmail(user.email);
      checkProfile();
      setUserAccountData({
        userName: userAccount.userName,
        name: userAccount.name,
        gender: userAccount.gender || 0, // Inicializa el género si está disponible
      });
    }
  }, [user]);

  const saveUserName = async () => {
    await updateUserName(user.email, userAccountData.userName);
    console.log("Nombre de usuario guardado");
  };

  const saveGender = async () => {
    console.log("Género guardado:", userAccountData.gender);
    // Aquí puedes implementar la lógica para guardar el género en tu backend
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: "black",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Mi Perfil
      </Text>
      {isComplete ? (
        <></>
      ) : (
        <View
          style={{
            backgroundColor: "#ffcdd2",
            padding: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
            }}
          >
            Por favor completa tu perfil. Es necesario para poder acceder a
            todas las funcionalidades de la aplicación.
          </Text>
        </View>
      )}

      <TextField
        value={userAccountData.userName}
        onChange={(e) =>
          setUserAccountData({
            ...userAccountData,
            userName: e.nativeEvent.text,
          })
        }
        label="Nombre de usuario"
      />
      <TextField
        value={userAccountData.name}
        onChange={(e) =>
          setUserAccountData({ ...userAccountData, name: e.nativeEvent.text })
        }
        label="Nombre"
      />
      <Select
        value={userAccountData.gender}
        onChange={(e) => {
          setUserAccountData({ ...userAccountData, gender: e });
        }}
        label="Genero"
        items={[
          {
            label: "Masculino",
            value: 0,
          },
          {
            label: "Femenino",
            value: 1,
          },
          {
            label: "Otro",
            value: 2,
          },
        ]}
      />
      <DatePicker
        label="Fecha de nacimiento"
        value={new Date()}
        onChange={(date) => console.log(date)}
      />

      <Pressable
        style={{
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
        onPress={()=> {console.log('save: ', userAccountData)}}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    width: "80%",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  selected: {
    marginTop: 16,
    fontSize: 16,
    color: "#555",
  },
});
