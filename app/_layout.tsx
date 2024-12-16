
import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';
import { useRouter } from 'expo-router';

function LayoutWrapper() {
    const { user, error, authorize } = useAuth0();
    const router = useRouter();
    const [isAuthorizing, setIsAuthorizing] = useState(false);
    useEffect(() => {
        const authenticate = async () => {
            try {
                setIsAuthorizing(true);
                await authorize();
            } catch (e) {
                console.log(e);
            } finally {
                setIsAuthorizing(false);
            }
        };

        if (user !== null) {

            router.push('/adminApp'); // Redirige al usuario si ya está autenticado

        } else if (!isAuthorizing) {
            // Solo autentica si no está en proceso
            authenticate();
        }
    }, [isAuthorizing]);


    return (
        <View
        >
            <Slot />
        </View>
    );
}

export default function _Layout() {
    return (
        <Auth0Provider
            domain="dev-rk0fl88jinxofajt.us.auth0.com"
            clientId="FylS8wC7JHGPyfeCYaSeXhEp5q1HRzaI"
        >
            <LayoutWrapper />
        </Auth0Provider>
    );
}

