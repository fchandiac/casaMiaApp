import React, { useEffect, useState } from "react";
import { Slot } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import AdminHeader from "../../components/headers/AdminHeader";
import AdminFooter from "../../components/footers/AdminFooter";
import { useGlobalContext } from "../../globalContext";
import { useAuth0 } from "react-native-auth0";

import { useRouter } from "expo-router";
import { WebSocketProvider } from "../../context/webSocketContext";

export default function _Layout() {
  const { account } = useGlobalContext();
  const { userAccount, findAccountByEmail } = account;
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      findAccountByEmail(user.email);
    }
  }, [user]);

  return (
    <View>
      <AdminHeader userName={userAccount.name} email={userAccount.email} />
      <View style={styles.container}>
        <WebSocketProvider email={user.email}>
          <Slot />
        </WebSocketProvider>
      </View>
      <AdminFooter />
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
