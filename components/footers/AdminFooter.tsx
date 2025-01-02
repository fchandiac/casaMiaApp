import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';
import AdminSideBar from './AdminSideBar';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window'); // Obtener el ancho del dispositivo

export default function AdminFooter() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
        console.log("Sidebar is now", isSidebarOpen ? 'open' : 'closed');
    };

    // Estilo dinámico según el ancho del dispositivo
    const dynamicStyles = {
        paddingBottom: width <= 320 ? 155 : 310, // Reducir paddingBottom en dispositivos estrechos
    };

    return (
       <>
        <View style={[styles.footer, dynamicStyles]}>
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 20, // Espaciado horizontal fijo
    },
    icon: {
        padding: 10, // Agregar algo de padding alrededor del icono
    },
});
