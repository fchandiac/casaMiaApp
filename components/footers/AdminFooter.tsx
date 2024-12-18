import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native'; // Importar Pressable
import AdminSideBar from './AdminSideBar';
import { useRouter } from 'expo-router';

export default function AdminFooter() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        console.log("Sidebar is now", isSidebarOpen ? 'open' : 'closed'); // Puedes reemplazar esta lógica por lo que necesites hacer
    };

    return (
       <>
        <View style={styles.footer}>
            <Pressable onPress={toggleSidebar}>
                <Ionicons name='menu' size={30} color='white' style={styles.icon} />
            </Pressable>
            <Pressable onPress={() => router.push('/adminApp')}>
                <Ionicons name="home" size={24} color="white" style={styles.icon} />
            </Pressable>
            <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle" size={24} color="white" style={styles.icon} />
            </Pressable>

        </View>
        
        <AdminSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
        paddingBottom: 320, // Espaciado inferior ajustado
        paddingHorizontal: 10, // Espaciado horizontal
    },
    icon: {
        padding: 10, // Agregar algo de padding alrededor del icono
    },
});
