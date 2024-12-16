
import React, { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';


function LayoutWrapper() {
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

