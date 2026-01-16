import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useAppContext } from '../contexts/AppContext';

type HomeScreenProps = {
    navigation: StackNavigationProp<any, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { theme } = useAppContext();
    const bg = theme === 'dark' ? '#121212' : '#f5f7fa';
    const text = theme === 'dark' ? '#ffffff' : '#333333';

    const offset = useSharedValue(0);
    offset.value = withRepeat(withTiming(20, { duration: 1000 }), -1, true);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Text style={[styles.title, { color: text }]}>BounceLab</Text>

            <Animated.View style={[styles.previewBall, animatedStyle]} />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Variants')}>
                <Text style={styles.buttonText}>Game Modes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
                <Text style={styles.buttonText}>About</Text>
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
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 30
    },
    previewBall: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFA726',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        marginVertical: 8,
        width: '80%',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    }
});

export default HomeScreen;