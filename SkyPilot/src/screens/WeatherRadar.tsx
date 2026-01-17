import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const airports = [
    { code: 'DEL', name: 'Delhi (DEL)', temp: 28, wind: 12, clouds: 'Partly Cloudy' },
    { code: 'BOM', name: 'Mumbai (BOM)', temp: 32, wind: 8, clouds: 'Clear' },
    { code: 'BLR', name: 'Bangalore (BLR)', temp: 25, wind: 15, clouds: 'Rain' },
];

const WeatherRadar: React.FC = () => {
    const [selectedAirport, setSelectedAirport] = useState(airports[0]);

    const handleSelect = (code: string) => {
        const airport = airports.find((a) => a.code === code) || airports[0];
        setSelectedAirport(airport);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Weather Radar</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedAirport.code}
                    onValueChange={handleSelect}
                    style={styles.picker}
                >
                    {airports.map((airport) => (
                        <Picker.Item key={airport.code} label={airport.name} value={airport.code} />
                    ))}
                </Picker>
            </View>

            <View style={styles.weatherCard}>
                <Text style={styles.airportName}>{selectedAirport.name}</Text>
                <Text style={styles.temp}>{selectedAirport.temp}°C</Text>
                <Text style={styles.detail}>Wind: {selectedAirport.wind} km/h</Text>
                <Text style={styles.detail}>Conditions: {selectedAirport.clouds}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        padding: width * 0.05,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0A2463',
        textAlign: 'center',
        marginBottom: 24,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#CBD5E0',
        borderRadius: 8,
        marginBottom: 24,
        color: '#000'
    },
    picker: {
        width: '100%',
        height: 50,
        color: '#000'
    },
    weatherCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    airportName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0A2463',
        marginBottom: 8,
    },
    temp: {
        fontSize: 32,
        fontWeight: '800',
        color: '#4ECDC4',
        marginBottom: 12,
    },
    detail: {
        fontSize: 16,
        color: '#4A5568',
        marginBottom: 4,
    },
});

export default WeatherRadar;