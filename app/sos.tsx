import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import logo from '../assets/images/Logo3.png';
import backgroundImage from "../assets/images/defaultBGclipped.png";
import { useRouter } from 'expo-router';

const Sos: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // Any side effects go here
    }, []);

    const sosNumbers = [
        { id: 1, icon: 'ambulance', number: '110', description: 'Fire & Rescue' },
        { id: 2, icon: 'ambulance', number: '1990', description: 'Suwa Seriya Ambulance Service' },
        { id: 3, icon: 'hospital', number: '0112691111', description: 'Accident Service-General Hospital-Colombo' },
        { id: 4, icon: 'info-circle', number: '0112136222', description: 'Disaster Managment Centre Emergency Operations Hotline' },
        { id: 5, icon: 'phone', number: '118', description: 'Police Emergency Hotline' },
        { id: 6, icon: 'phone', number: '119', description: 'Police Emergency Hotline' },
        { id: 7, icon: 'phone', number: '0112433333', description: 'Police Emergency' },
        { id: 8, icon: 'fire-extinguisher', number: '0112422222', description: 'Fire & Ambulance Service' }
    ];

    const dialNumber = (number: string) => {
        Linking.openURL(`tel:${number}`);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.headerBackgroundImage}>
                <View style={styles.headerContent}>
                    <Image source={logo} style={styles.logo} />
                </View>
            </ImageBackground>

            <ScrollView contentContainerStyle={styles.content}>
                {sosNumbers.map(sos => (
                    <TouchableOpacity key={sos.id} style={styles.sosContainer} onPress={() => dialNumber(sos.number)}>
                        <FontAwesome5 name={sos.icon} size={24} color="#000" style={styles.sosIcon} />
                        <View style={styles.sosTextContainer}>
                            <Text style={styles.sosNumber}>{sos.number}</Text>
                            <Text style={styles.sosDescription}>{sos.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/dashboard')}>
                    <FontAwesome5 name="home" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/map')}>
                    <FontAwesome5 name="map" size={24} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/comments')}>
                    <FontAwesome5 name="comments" size={24} color="#ccc" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/notifications')}>
                    <FontAwesome5 name="bell" size={24} color="#ccc" />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationText}>6</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
                    <FontAwesome5 name="user" size={24} color="#ccc" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerBackgroundImage: {
        width: '100%',
        height: 150,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    logo: {
        width: 350,
        height: 50,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    content: {
        padding: 20,
        paddingBottom: 50,
    },
    sosContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
    },
    sosIcon: {
        marginRight: 15,
    },
    sosTextContainer: {
        flex: 1,
    },
    sosNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sosDescription: {
        fontSize: 14,
        color: '#777',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        marginBottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    navItem: {
        alignItems: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        right: -6,
        top: -5,
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 2,
        paddingHorizontal: 5,
    },
    notificationText: {
        color: '#fff',
        fontSize: 10,
    },
});

export default Sos;
