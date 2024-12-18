import { Slot } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import UserHeader from "../../components/headers/UserHeader";
import UserFooter from "../../components/footers/UserFooter";
const logo = require("../../assets/logo.png");
import { useAuth0 } from "react-native-auth0";
import { useGlobalContext } from "../../globalContext";

export default function _Layout() {
  const { user } = useAuth0();
  const { account } = useGlobalContext();
  const { userAccount, findAccountByEmail } = account;
  useEffect(() => {
    if (user) {
      findAccountByEmail(user.email);
    }
  }, [user]);
  return (
    <View>
      <UserHeader 
        userName={userAccount.userName} 
        points={userAccount.points}
        money={userAccount.money}

      />
      <View style={styles.container}>
        <Slot />
      </View>
      <UserFooter />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
