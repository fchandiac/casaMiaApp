import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function ProfileButton() {
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
            width: 45,
            height: 45,
            borderRadius: 25,
            backgroundColor: "#1D1D1D",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="person" size={28} color="#fff" />
        </View>
      </View>
  );
}
