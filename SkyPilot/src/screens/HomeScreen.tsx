import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>SkyPilot</Text>
                <Text style={styles.subtitle}>Your aviation companion in the sky</Text>
                <Text style={styles.description}>
                    Explore aircraft, simulate flights, check weather, and log your journeys.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0A2463',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: '#4A5568',
        textAlign: 'center',
        marginBottom: 24,
    },
    description: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default HomeScreen;