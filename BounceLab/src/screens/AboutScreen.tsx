import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const AboutScreen: React.FC = () => {
    const { theme } = useAppContext();
    const bg = theme === 'dark' ? '#121212' : '#f9f9f9';
    const text = theme === 'dark' ? '#ffffff' : '#333333';

    const openGitHub = () => {
        Linking.openURL('https://github.com/Kdzefuf/games-utils/tree/main/BounceLab').catch(() =>
            Alert.alert('Failed to open GitHub')
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Text style={[styles.title, { color: text }]}>BounceLab</Text>
            <Text style={[styles.text, { color: text }]}>Version 1.0.0</Text>
            <Text style={[styles.text, { color: text }]}>React Native Test Project</Text>
            <Text style={[styles.text, { color: text }]}>© 2026</Text>

            <TouchableOpacity style={styles.button} onPress={openGitHub}>
                <Text style={styles.buttonText}>Source Code</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 4
    },
    button: {
        backgroundColor: '#9C27B0',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
});

export default AboutScreen;