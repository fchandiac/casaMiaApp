import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

interface SelectProps {
  value: string | number;
  onChange: (itemValue: string | number) => void;
  label: string;
  items: { label: string, value: string | number }[]; // Lista con valores numéricos
}

const Select: React.FC<SelectProps> = ({ value, onChange, label, items }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const getRenderText = (value: string | number) => {
    const item = items.find((item) => item.value === value);
    return item ? item.label : '';
  };

  const handleItemPress = (itemValue: string | number) => {
    onChange(itemValue);
    setModalVisible(false);  // Cerrar el modal al seleccionar
  };

  return (
    <View style={styles.container}>
      {/* Etiqueta */}
      <Text style={styles.label}>{label}</Text>

      {/* Campo de selección */}
      <TouchableOpacity
        style={styles.selectBox}
        onPress={() => setModalVisible(true)}  // Abrir el modal al hacer clic
      >
        <Text style={styles.selectedValue}>
          {value !== null ? getRenderText(value) : 'Selecciona una opción'}
        </Text>
      </TouchableOpacity>

      {/* Modal con la lista de opciones */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleItemPress(item.value)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value.toString()}
            />
          </View>
        </View>
      </Modal>
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
  selectBox: {
    height: 50,
    borderColor: '#1d1d1d',  // El mismo color del borde que un TextInput
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  selectedValue: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Select;
