import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import moment from "moment"; // Importamos moment.js

interface DatePickerProps {
  value: Date; // El valor debe ser de tipo Date
  onChange: (date: Date) => void; // Función para manejar el cambio de fecha
  label: string; // Etiqueta para el campo
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label }) => {
  const [show, setShow] = useState(false);

  // Función para manejar el cambio de fecha
  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value;
    setShow(false);
    onChange(currentDate); // Actualiza el valor del padre
  };

  // Formateamos la fecha en formato 'DD-MM-YYYY' usando moment.js
  const formattedDate = moment(value).format("DD-MM-YYYY");

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
  
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      backgroundColor: '#fff',
    },
    label: {
      marginBottom: 5,
      fontSize: 14,
      color: '#333',
    },
    input: {
      height: 50,
      borderColor: '#1d1d1d',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      fontSize: 16,
    },
  });

export default DatePicker;
