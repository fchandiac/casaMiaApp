import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import NotificationButton from './NotificationButton';
import BackButton from './BackButton';
import ProfileButton from './ProfileButton';

interface UserHeaderProps {
    userName?: string;
    points?: number;
    money?: number;
}


export default function UserHeader({
    userName = 'TestUser',
    points = 0,
    money = 0,
}: UserHeaderProps) {


    return (
        <View style={styles.header}>
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 20,
                }}
            >
                <Image
                    source={require('../../assets/logo.png')}
                    style={{
                        width: 100, // Adjust width as needed
                        height: 30, // Adjust height as needed
                        resizeMode: "contain",
                    }}
                />
                <Text style={styles.userText}>{userName}</Text>
                <Text style={styles.infoText}>Pts: {points} - {money.toLocaleString('es-CL0', {
                    style: 'currency',
                    currency: 'CLP',

                })}</Text>
            </View>
            <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 40,
            }}>
                     <NotificationButton />
                     <BackButton />
                     <ProfileButton />

            </View>
       


        </View>

    )
}


const styles = StyleSheet.create({
    header: {

        height: 165,
        paddingTop: 80,
        backgroundColor: "#1D1D1D",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
        right: 0,
    },
    text: {
        color: "#fff",
        fontSize: 20,
    },
    userText: {
        color: "#fff",
        fontSize: 23,
    },
    infoText: {
        color: "#fff",
        fontSize: 15,
    },
});