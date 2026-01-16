import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const SettingsScreen: React.FC = () => {
    const { theme, toggleTheme, sensitivity, setSensitivity } = useAppContext();
    const bg = theme === 'dark' ? '#121212' : '#f9f9f9';
    const text = theme === 'dark' ? '#ffffff' : '#333333';

    const resetSettings = () => {
        setSensitivity(1.0);
    };

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Text style={[styles.title, { color: text }]}>Settings</Text>

            <View style={styles.settingRow}>
                <Text style={[styles.label, { color: text }]}>Dark Theme</Text>
                <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
            </View>

            <View style={styles.settingRow}>
                <Text style={[styles.label, { color: text }]}>Sensitivity: {sensitivity.toFixed(1)}x</Text>
                <TouchableOpacity onPress={() => setSensitivity(Math.min(2.0, sensitivity + 0.1))}>
                    <Text style={styles.btn}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSensitivity(Math.max(0.5, sensitivity - 0.1))}>
                    <Text style={styles.btn}>−</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
                <Text style={styles.resetText}>Reset Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12,
    },
    label: { fontSize: 16 },
    btn: {
        fontSize: 24,
        paddingHorizontal: 12,
        color: '#4A90E2',
    },
    resetButton: {
        marginTop: 40,
        padding: 14,
        backgroundColor: '#f44336',
        borderRadius: 10,
        alignItems: 'center',
    },
    resetText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
});

export default SettingsScreen;