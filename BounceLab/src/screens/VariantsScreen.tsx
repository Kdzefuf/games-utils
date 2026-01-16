import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const VariantsScreen: React.FC = () => {
    const { gameMode, setGameMode, theme } = useAppContext();
    const bg = theme === 'dark' ? '#121212' : '#f9f9f9';
    const text = theme === 'dark' ? '#ffffff' : '#333333';

    const handlePlay = () => {
        Alert.alert('Mode Selected', `Current mode: ${gameMode}`);
    };

    const getModeLabel = (mode: string) => {
        switch (mode) {
            case 'classic': return 'Classic (gravity)';
            case 'zero-g': return 'Zero-G (touch only)';
            case 'multi': return 'Multi-ball (5 balls)';
            default: return mode;
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Text style={[styles.title, { color: text }]}>Select Game Mode</Text>

            {(['classic', 'zero-g', 'multi'] as const).map((mode) => (
                <TouchableOpacity
                    key={mode}
                    style={[styles.modeButton, gameMode === mode && styles.activeMode]}
                    onPress={() => setGameMode(mode)}
                >
                    <Text style={[styles.modeText, { color: gameMode === mode ? '#4A90E2' : text }]}>
                        {getModeLabel(mode)}
                    </Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
                <Text style={styles.playButtonText}>Start Game</Text>
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
    modeButton: {
        padding: 16,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 12,
        marginVertical: 8,
        alignItems: 'center',
    },
    activeMode: {
        borderColor: '#4A90E2',
        backgroundColor: '#eaf4ff',
    },
    modeText: { fontSize: 16 },
    playButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 12,
        marginTop: 30,
        alignItems: 'center',
    },
    playButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
});

export default VariantsScreen;