import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native'; // Importar Pressable

import UserSideBar from './UserSideBar';

export default function UserFooter() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
       // console.log("Sidebar is now", isSidebarOpen ? 'open' : 'closed'); // Puedes reemplazar esta lógica por lo que necesites hacer
    };

    return (
       <>
        <View style={styles.footer}>
            <Pressable onPress={toggleSidebar}>
                <Ionicons name='menu' size={34} color='white' style={styles.icon} />
            </Pressable>
            <Pressable onPress={() => console.log('Home pressed')}>
                <Ionicons name="home" size={24} color="white" style={styles.icon} />
            </Pressable>
        </View>
        
        <UserSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
       </>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        backgroundColor: '#1D1D1D',
        flexDirection: 'row', // Distribuir los iconos en fila
        justifyContent: 'space-around', // Espacio entre los iconos
        alignItems: 'center', // Alineación vertical de los iconos
        position: 'absolute', // Asegura que el footer esté en la parte inferior
        bottom: 0, // Ubicado en la parte inferior
        paddingBottom: 340, // Espaciado inferior ajustado
        paddingHorizontal: 10, // Espaciado horizontal
    },
    icon: {
        padding: 10, // Agregar algo de padding alrededor del icono
    },
});
