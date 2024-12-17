import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function NotificationButton() {
  return (
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#fff",
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderColor: "#fff",
            borderWidth: 2,
            backgroundColor: "#1D1D1D",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="notifications" size={28} color="#fff" />
        </View>
      </View>
  );
}
