import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useGlobalContext } from "../../globalContext";
import TextField from "../../components/commons/Texfield";
import Select from "../../components/commons/Select";
import { useRouter } from "expo-router";



interface Profile {
  userName: string;
  name: string;
  gender: number; // Agrega el tipo de dato para el género
}

export default function Profile() {
  const { user } = useAuth0();
  const { account } = useGlobalContext();
  const { userAccount, findAccountByEmail, isProfileComplete,updateProfile } =
    account;
  const [isComplete, setIsComplete] = useState(false);
  const [userAccountData, setUserAccountData] = useState({
    userName: "",
    name: "",
    gender: null, // Aquí se agrega el estado para el género
  });
  const router = useRouter();



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


  const saveProfile = async () => {
    try {
      await updateProfile(userAccount.accountId, userAccountData.userName, userAccountData.name, userAccountData.gender);
      router.push("/userApp");

    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }
  



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
          <Text style={styles.title}>Mi Perfil</Text>
          {isComplete ? (
            <></>
          ) : (
            <View style={styles.alert}>
              <Text style={styles.alertText}>
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
   

          <Pressable
            style={styles.button}
            onPress={() => {
              saveProfile();
            }}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
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

