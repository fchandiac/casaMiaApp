import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useGlobalContext } from "../../../globalContext";
import moment from "moment";

export default function Transactions() {
  const { account } = useGlobalContext();
  const [moneyTransactionsList, setMoneyTransactionsList] = useState([]);
  const [pointsTransactionsList, setPointsTransactionsList] = useState([]);
  const [activeTab, setActiveTab] = useState("money"); // Tab activa

  //@IsIn(['mission', 'purchase', 'transfer', 'deposit', 'withdraw', 'create-account']) // Tipos permitidos

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const moneyTransactions =
          await account.findAllMoneyTransactionsByAccountId();

        const pointsTransactions =
          await account.findAllPointsTransactionsByAccountId();

        setMoneyTransactionsList(moneyTransactions);
        setPointsTransactionsList(pointsTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <View>
      <View style={styles.tabGroup}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "money" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("money")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "money"
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            Dinero
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "points" ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab("points")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "points"
                ? styles.activeTabText
                : styles.inactiveTabText,
            ]}
          >
            Puntos
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "money" ? (
        <View>
          <View style={styles.container}>
            {/* Encabezados de la tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Tipo</Text>
              <Text style={styles.headerText}>Monto</Text>
              <Text style={styles.headerText}>Saldo</Text>
              <Text style={styles.headerText}>Fecha</Text>
            </View>

            {/* Datos de la tabla */}
            <FlatList
              data={moneyTransactionsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.cellText}>
                    {getSpanishTransactionType(item.type)}
                  </Text>
                  <Text style={styles.cellText}>
                    {item.amount.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Text>
                  <Text style={styles.cellText}>
                    {item.balance.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </Text>
                  <Text style={styles.cellText}>
                    {moment(item.createdAt).format("DD-MM-YYYY HH:mm")}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.container}>
            {/* Encabezados de la tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Tipo</Text>
              <Text style={styles.headerText}>Monto</Text>
              <Text style={styles.headerText}>Saldo</Text>
              <Text style={styles.headerText}>Fecha</Text>
            </View>

            {/* Datos de la tabla */}
            <FlatList
              data={pointsTransactionsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.cellText}>
                    {getSpanishTransactionType(item.type)}
                  </Text>
                  <Text style={styles.cellText}>
                    {item.amount}
                  </Text>
                  <Text style={styles.cellText}>
                    {item.balance}
                  </Text>
                  <Text style={styles.cellText}>
                    {moment(item.createdAt).format("DD-MM-YYYY HH:mm")}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const getSpanishTransactionType = (transactionType: string) => {
  switch (transactionType) {
    case "mission":
      return "Misión";
    case "purchase":
      return "Compra";
    case "transfer":
      return "Transferencia";
    case "deposit":
      return "Depósito";
    case "withdraw":
      return "Retiro";
    case "create-account":
      return "Creación de cuenta";
    default:
      return "Desconocido";
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  cellText: {
    flex: 1,
    textAlign: "center",
  },
  tabGroup: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "#1d1d1d",
  },
  inactiveTab: {
    borderWidth: 1,
    borderColor: "#1d1d1d",
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveTabText: {
    color: "#1d1d1d",
  },
});
