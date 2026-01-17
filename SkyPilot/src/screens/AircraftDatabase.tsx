import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native';
import aircraftData, { Aircraft } from '../utils/aircraftData';

const { width } = Dimensions.get('window');

const AircraftDatabase: React.FC = () => {
    const renderAircraft = ({ item }: { item: Aircraft }) => {
        return (
            <View style={styles.card}>
                <Image source={item.imageSource} style={styles.image} resizeMode="contain" />
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>Wingspan: {item.wingspan} m</Text>
                <Text style={styles.detail}>Max Speed: {item.maxSpeed} km/h</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={aircraftData}
                renderItem={renderAircraft}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    list: {
        padding: width * 0.04,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 120,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0A2463',
        marginBottom: 8,
    },
    detail: {
        fontSize: 14,
        color: '#4A5568',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#718096',
        marginTop: 8,
    },
});

export default AircraftDatabase;