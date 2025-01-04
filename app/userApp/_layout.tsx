import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import UserHeader from "../../components/headers/UserHeader";
import UserFooter from "../../components/footers/UserFooter";
const logo = require("../../assets/logo.png");
import { useAuth0 } from "react-native-auth0";
import { useGlobalContext } from "../../globalContext";
import { useRouter } from "expo-router";
import { WebSocketProvider } from "../../context/webSocketContext";

export default function _Layout() {
  const { user } = useAuth0();
  const { account } = useGlobalContext();
  const router = useRouter();

  const { userAccount, findAccountByEmail } = account;
  useEffect(() => {
    if (user) {
      findAccountByEmail(user.email);
    }
  }, []);

  return (
    <View>
      <UserHeader
        userName={userAccount.userName}
        points={userAccount.points}
        money={userAccount.money}
      />
      <View style={styles.container}>
        <WebSocketProvider email={user.email}>
          <Slot />
        </WebSocketProvider>
      </View>
      <UserFooter />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 0,
    paddingTop: 10,
  },
});
