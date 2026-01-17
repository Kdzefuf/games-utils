// src/screens/FlightSimulator.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const AIRPLANE_IMAGE = require('../../assets/images/airplane.png');
const GROUND_IMAGE = require('../../assets/images/ground.png');

const MIN_ALTITUDE = 100;
const MAX_ALTITUDE = 12000;

const FlightSimulator: React.FC = () => {
    const [altitude, setAltitude] = useState(3000);
    const [speed, setSpeed] = useState(400);
    const [bankAngle, setBankAngle] = useState(0);

    const groundOffsetY = (() => {
        const normalized = (altitude - MIN_ALTITUDE) / (MAX_ALTITUDE - MIN_ALTITUDE);
        return -50 + normalized * 300;
    })();

    const isStall = speed < 150;

    const climb = () => setAltitude((prev) => Math.min(prev + 300, MAX_ALTITUDE));
    const descend = () => setAltitude((prev) => Math.max(prev - 300, MIN_ALTITUDE));
    const accelerate = () => setSpeed((prev) => Math.min(prev + 50, 900));
    const decelerate = () => setSpeed((prev) => Math.max(prev - 50, 50));
    const bankLeft = () => setBankAngle((prev) => Math.max(prev - 8, -45));
    const bankRight = () => setBankAngle((prev) => Math.min(prev + 8, 45));

    return (
        <View style={styles.container}>
            <View style={styles.sky} />

            <View
                style={[
                    styles.groundContainer,
                    {
                        transform: [{ translateY: groundOffsetY }],
                    },
                ]}
            >
                <Image source={GROUND_IMAGE} style={styles.ground} resizeMode="stretch" />
            </View>

            <View
                style={[
                    styles.airplaneContainer,
                    {
                        transform: [{ rotate: `${bankAngle}deg` }],
                    },
                ]}
            >
                <Image source={AIRPLANE_IMAGE} style={styles.airplane} resizeMode="contain" />
            </View>

            <View style={styles.indicators}>
                <Text style={styles.altitudeText}>Alt: {altitude} m</Text>
                <Text style={[styles.speedText, isStall && styles.stallWarning]}>
                    Speed: {speed} km/h
                </Text>
                <Text style={styles.bankText}>Bank: {bankAngle}°</Text>
            </View>

            {isStall && (
                <View style={styles.stallAlert}>
                    <Text style={styles.stallAlertText}>STALL! INCREASE SPEED!</Text>
                </View>
            )}

            <View style={styles.controls}>
                <View style={styles.row}>
                    <ControlButton title="↑ Climb" onPress={climb} />
                    <ControlButton title="↓ Descend" onPress={descend} />
                </View>
                <View style={styles.row}>
                    <ControlButton title="← Bank L" onPress={bankLeft} />
                    <ControlButton title="→ Bank R" onPress={bankRight} />
                </View>
                <View style={styles.row}>
                    <ControlButton title="+" onPress={accelerate} />
                    <ControlButton title="–" onPress={decelerate} />
                </View>
            </View>
        </View>
    );
};

const ControlButton: React.FC<{ title: string; onPress: () => void }> = ({ title, onPress }) => (
    <View style={styles.controlButtonWrapper}>
        <Text style={styles.controlButtonText} onPress={onPress}>
            {title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87CEEB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sky: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#87CEEB',
    },
    groundContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ground: {
        width: '100%',
        height: '100%',
    },
    airplaneContainer: {
        position: 'absolute',
        top: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    airplane: {
        width: width,
        height: width,
    },
    indicators: {
        position: 'absolute',
        top: 20,
        left: '20%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        padding: 10,
        borderRadius: 8,
    },
    altitudeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A2463',
    },
    speedText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A2463',
        marginTop: 4,
    },
    bankText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A2463',
        marginTop: 4,
    },
    stallWarning: {
        color: '#E53E3E',
        fontWeight: '800',
    },
    stallAlert: {
        position: 'absolute',
        top: height * 0.2,
        backgroundColor: '#E53E3E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        zIndex: 20,
    },
    stallAlertText: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 18,
    },
    controls: {
        position: 'absolute',
        bottom: 30,
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 10,
        width: '90%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
    },
    controlButtonWrapper: {
        backgroundColor: '#4ECDC4',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        margin: 4,
    },
    controlButtonText: {
        color: '#0A2463',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default FlightSimulator;