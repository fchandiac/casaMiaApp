import React from "react";
import { Text, StyleSheet } from "react-native";

interface TitleProps {
  title: string; // Prop para recibir el texto del título
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Title;
