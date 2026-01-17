import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
    Dimensions,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { saveLogEntry, getLogEntries, LogEntry } from '../utils/logbookStorage';

const { width } = Dimensions.get('window');

const PilotLogbook: React.FC = () => {
    const [aircraft, setAircraft] = useState('');
    const [hours, setHours] = useState('');
    const [route, setRoute] = useState('');
    const [logs, setLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        const entries = await getLogEntries();
        setLogs(entries);
    };

    const handleAddLog = async () => {
        if (!aircraft.trim() || !hours.trim() || !route.trim()) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        const hoursNum = parseFloat(hours);
        if (isNaN(hoursNum) || hoursNum <= 0) {
            Alert.alert('Error', 'Hours must be a positive number');
            return;
        }

        await saveLogEntry({
            date: new Date().toISOString().split('T')[0],
            aircraft: aircraft.trim(),
            hours: hoursNum,
            route: route.trim(),
        });

        setAircraft('');
        setHours('');
        setRoute('');
        loadLogs();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pilot Logbook</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Aircraft Type"
                    placeholderTextColor="#000000"
                    value={aircraft}
                    onChangeText={setAircraft}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Flight Hours"
                    placeholderTextColor="#000000"
                    value={hours}
                    onChangeText={setHours}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Route (e.g., DEL → BOM)"
                    placeholderTextColor="#000000"
                    value={route}
                    onChangeText={setRoute}
                />
                <CustomButton title="Add Flight" onPress={handleAddLog} />
            </View>

            <ScrollView style={styles.logsContainer}>
                {logs.length === 0 ? (
                    <Text style={styles.emptyText}>No flights logged yet.</Text>
                ) : (
                    logs.map((log) => (
                        <View key={log.id} style={styles.logItem}>
                            <Text style={styles.logDate}>{log.date}</Text>
                            <Text style={styles.logDetail}>{log.aircraft}</Text>
                            <Text style={styles.logDetail}>{log.route}</Text>
                            <Text style={styles.logHours}>{log.hours} hours</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
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
        marginBottom: 20,
    },
    form: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CBD5E0',
        marginBottom: 12,
        fontSize: 16,
        color: '#000'
    },
    logsContainer: {
        flex: 1,
    },
    emptyText: {
        textAlign: 'center',
        color: '#A0AEC0',
        fontSize: 16,
    },
    logItem: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#EDF2F7',
    },
    logDate: {
        fontWeight: '600',
        color: '#0A2463',
    },
    logDetail: {
        color: '#4A5568',
        marginTop: 4,
    },
    logHours: {
        color: '#4ECDC4',
        fontWeight: '600',
        marginTop: 4,
    },
});

export default PilotLogbook;